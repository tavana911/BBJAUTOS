import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Car, CheckCircle, ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { formatPrice } from "@/lib/format";
import { img } from "@/lib/images";

type SaleVehicle = {
  id: string;
  name: string;
  make: string;
  model: string;
  price: number;
  category: string;
  hero_image: string;
};

type RentalVehicle = {
  id: string;
  name: string;
  category: string;
  daily_rate: number;
  hero_image: string;
};

type TransmissionOption = "Automatic" | "Manual";
type FuelTypeOption = "Petrol" | "Electric" | "Hybrid";
type ListingCategory = "Supercar" | "Chauffeur" | "Self-Drive";

type AdminFormState = {
  name: string;
  make: string;
  model: string;
  year: string;
  category: ListingCategory;
  price: string;
  daily_rate: string;
  transmission: TransmissionOption;
  fuel_type: FuelTypeOption;
  zero_to_sixty: string;
  engine: string;
  vin: string;
  description: string;
  featured: boolean;
};

const initialFormState: AdminFormState = {
  name: "",
  make: "",
  model: "",
  year: "2026",
  category: "Supercar",
  price: "",
  daily_rate: "",
  transmission: "Automatic",
  fuel_type: "Petrol",
  zero_to_sixty: "",
  engine: "",
  vin: "",
  description: "",
  featured: false,
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [listingType, setListingType] = useState<"sale" | "rental">("sale");
  const [salesCars, setSalesCars] = useState<SaleVehicle[]>([]);
  const [rentalCars, setRentalCars] = useState<RentalVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [form, setForm] = useState<AdminFormState>(initialFormState);

  async function fetchInventory() {
    setLoading(true);

    const { data: salesData } = await supabase
      .from("cars")
      .select("id, name, make, model, price, category, hero_image")
      .order("created_at", { ascending: false });

    const { data: rentalsData } = await supabase
      .from("rentals")
      .select("id, name, category, daily_rate, hero_image")
      .order("created_at", { ascending: false });

    setSalesCars(salesData || []);
    setRentalCars(rentalsData || []);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Unauthorized entry detector. Please log in.");
        navigate({ to: "/admin/login" });
      } else {
        fetchInventory();
      }
    });
  }, [navigate]);

  async function handleDelete(id: string, type: "sale" | "rental") {
    if (!confirm("Permanently delete this vehicle record?")) return;

    const table = type === "sale" ? "cars" : "rentals";
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      toast.error("Could not delete record.");
      return;
    }

    toast.success("Asset deleted successfully.");

    if (type === "sale") {
      setSalesCars((current) => current.filter((car) => car.id !== id));
    } else {
      setRentalCars((current) => current.filter((car) => car.id !== id));
      await queryClient.invalidateQueries({ queryKey: ["rentals"] });
    }

    await fetchInventory();
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (imageFiles.length === 0) {
      toast.error("Please add at least one presentation image.");
      return;
    }

    setSubmitting(true);
    try {
      const uploadedUrls: string[] = [];

      for (const file of imageFiles) {
        const fileExt = file.name.split(".").pop() ?? "jpg";
        const fileName = `${crypto.randomUUID()}.${fileExt.toLowerCase()}`;
        const { error: uploadError } = await supabase.storage
          .from("car-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = await supabase.storage
          .from("car-images")
          .getPublicUrl(fileName);

        if (!publicUrlData?.publicUrl) {
          throw new Error("Unable to generate public image URL.");
        }

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      const heroImageUrl = uploadedUrls[0];
      const galleryUrls = uploadedUrls.slice(1);

      const parsedPrice = Number(form.price);
      const parsedYear = Number(form.year);
      const parsedDailyRate = Number(form.daily_rate);

      const makeValue = form.make.trim() || form.name.split(" ")[0] || "Unknown";
      const modelValue = form.model.trim() || form.name.split(" ").slice(1).join(" ") || form.name || "Vehicle";

      if (listingType === "sale") {
        const salePayload: Database["public"]["Tables"]["cars"]["Insert"] = {
          name: form.name || "Untitled Vehicle",
          make: makeValue,
          model: modelValue,
          year: Number.isFinite(parsedYear) && parsedYear > 1900 ? parsedYear : 2026,
          category: form.category,
          price: Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : 0,
          currency: "AED",
          hero_image: heroImageUrl,
          gallery: galleryUrls,
          zero_to_sixty: form.zero_to_sixty || "—",
          engine: form.engine || "—",
          transmission: form.transmission as Database["public"]["Tables"]["cars"]["Insert"]["transmission"],
          fuel_type: (form.fuel_type || null) as Database["public"]["Tables"]["cars"]["Insert"]["fuel_type"],
          vin: form.vin || "—",
          featured: form.featured,
          description: form.description || "",
          status: "available" as Database["public"]["Tables"]["cars"]["Insert"]["status"],
        };

        const { error: insertError } = await supabase.from("cars").insert(salePayload);
        if (insertError) throw insertError;
      } else {
        const rentalPayload: Database["public"]["Tables"]["rentals"]["Insert"] = {
          name: form.name || "Untitled Rental",
          category: form.category,
          daily_rate: Number.isFinite(parsedDailyRate) && parsedDailyRate > 0 ? parsedDailyRate : 0,
          transmission: form.transmission as Database["public"]["Tables"]["rentals"]["Insert"]["transmission"],
          fuel_type: (form.fuel_type || null) as Database["public"]["Tables"]["rentals"]["Insert"]["fuel_type"],
          description: form.description || "",
          hero_image: heroImageUrl,
          gallery: galleryUrls,
          available: true,
          currency: "AED",
          rental_type: "self-drive" as Database["public"]["Tables"]["rentals"]["Insert"]["rental_type"],
        };

        const { error: insertError } = await supabase.from("rentals").insert(rentalPayload);
        if (insertError) throw insertError;
      }

      toast.success(`${form.name} saved straight into inventory database.`);

      setForm({
        name: "",
        make: "",
        model: "",
        year: "2026",
        category: "Supercar",
        price: "",
        daily_rate: "",
        transmission: "Automatic",
        fuel_type: "Petrol",
        zero_to_sixty: "",
        engine: "",
        vin: "",
        description: "",
        featured: false,
      });
      setImageFiles([]);
      fetchInventory();
    } catch (err: any) {
      toast.error(err.message || "Database execution failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pt-28 pb-16 mx-auto w-[min(1400px,94%)] text-ice min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <p className="text-xs tracking-display text-ember uppercase font-semibold">HQ CONTROL</p>
          <h1 className="text-3xl font-display font-bold mt-1 tracking-tight">Fleet Curator Panel</h1>
        </div>
        <button
          onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/admin/login" }))}
          className="text-xs border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition text-muted-foreground"
        >
          Disconnect Terminal
        </button>
      </div>

      <div className="mt-10 grid lg:grid-cols-5 gap-8 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-card border border-white/5 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="flex items-center gap-2 text-ember text-xs font-semibold uppercase tracking-wider">
              <Plus className="h-3.5 w-3.5" /> Introduce Asset
            </span>
            <div className="bg-obsidian rounded-xl p-1 flex gap-1 border border-white/5 text-xs">
              <button
                type="button"
                onClick={() => setListingType("sale")}
                className={`px-3 py-1.5 rounded-lg transition ${listingType === "sale" ? "bg-ember text-ice font-medium" : "text-muted-foreground"}`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setListingType("rental")}
                className={`px-3 py-1.5 rounded-lg transition ${listingType === "rental" ? "bg-ember text-ice font-medium" : "text-muted-foreground"}`}
              >
                For Rent
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Vehicle Display Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Lamborghini Revuelto"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60"
            />
          </div>

          {listingType === "sale" ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Brand / Make</label>
                  <input
                    type="text"
                    required
                    placeholder="Lamborghini"
                    value={form.make}
                    onChange={(event) => setForm({ ...form, make: event.target.value })}
                    className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Model Variant</label>
                  <input
                    type="text"
                    required
                    placeholder="Revuelto V12"
                    value={form.model}
                    onChange={(event) => setForm({ ...form, model: event.target.value })}
                    className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Retail Price (AED)</label>
                  <input
                    type="number"
                    required
                    placeholder="2400000"
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: event.target.value })}
                    className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Production Year</label>
                  <input
                    type="number"
                    required
                    placeholder="2026"
                    value={form.year}
                    onChange={(event) => setForm({ ...form, year: event.target.value })}
                    className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground">Engine</label>
                  <input
                    type="text"
                    placeholder="6.5L V12"
                    value={form.engine}
                    onChange={(event) => setForm({ ...form, engine: event.target.value })}
                    className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 p-2.5 text-xs text-ice focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">0-60 mph</label>
                  <input
                    type="text"
                    placeholder="2.5s"
                    value={form.zero_to_sixty}
                    onChange={(event) => setForm({ ...form, zero_to_sixty: event.target.value })}
                    className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 p-2.5 text-xs text-ice focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">VIN String</label>
                  <input
                    type="text"
                    placeholder="LMB..."
                    value={form.vin}
                    onChange={(event) => setForm({ ...form, vin: event.target.value })}
                    className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 p-2.5 text-xs text-ice focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Vehicle Narrative / Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe vehicle background context..."
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none text-ice resize-none"
                />
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(event) => setForm({ ...form, featured: event.target.checked })}
                  className="accent-ember h-4 w-4 rounded"
                />
                <label htmlFor="featured" className="text-xs text-ice font-medium cursor-pointer select-none">
                  Promote to Homepage Smart Grid Showcase
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Daily Index Rate (AED)</label>
                  <input
                    type="number"
                    required
                    placeholder="4500"
                    value={form.daily_rate}
                    onChange={(event) => setForm({ ...form, daily_rate: event.target.value })}
                    className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-ember/60"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Propulsion Fuel</label>
                  <select
                    value={form.fuel_type}
                    onChange={(event) => setForm({ ...form, fuel_type: event.target.value as FuelTypeOption })}
                    className="mt-1.5 w-full rounded-xl bg-obsidian border border-white/10 px-3 py-3 text-sm focus:outline-none"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Rental Brief Context</label>
                <textarea
                  rows={2}
                  placeholder="Luxury specs summary..."
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none resize-none"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Category Curation</label>
              <select
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value as ListingCategory })}
                className="mt-1.5 w-full rounded-xl bg-obsidian border border-white/10 px-3 py-3 text-sm focus:outline-none"
              >
                <option value="Supercar">Supercar</option>
                <option value="Chauffeur">Chauffeur</option>
                <option value="Self-Drive">Self-Drive</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Gearbox</label>
              <select
                value={form.transmission}
                onChange={(event) => setForm({ ...form, transmission: event.target.value as TransmissionOption })}
                className="mt-1.5 w-full rounded-xl bg-obsidian border border-white/10 px-3 py-3 text-sm focus:outline-none"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Upload Vehicle Images</label>
            <div className="mt-1.5 relative border border-dashed border-white/10 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] transition group cursor-pointer">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                multiple
                onChange={(event) => setImageFiles(event.target.files ? Array.from(event.target.files) : [])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <ImagePlus className="h-5 w-5 text-muted-foreground group-hover:text-ember transition" />
                <p className="text-xs text-muted-foreground text-center">Select one or more JPG/PNG images for this listing.</p>
                <p className="text-[11px] text-muted-foreground max-w-xs text-center">The first selected image becomes the hero image; additional files become the gallery.</p>
              </div>
            </div>
            {imageFiles.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                {imageFiles.slice(0, 4).map((file) => (
                  <div key={file.name + file.size} className="rounded-xl border border-white/10 bg-white/[0.03] p-2 truncate">
                    {file.name}
                  </div>
                ))}
                {imageFiles.length > 4 && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-center">+{imageFiles.length - 4} more</div>
                )}
              </div>
            )}
          </div>

          <button disabled={submitting} className="w-full mt-2 rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ice hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-50">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : `Commit to ${listingType === "sale" ? "Sales" : "Rentals"}`}
          </button>
        </form>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border border-white/5 p-5 rounded-3xl">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">
              <Car className="h-3.5 w-3.5 text-ember" /> Live Sales Catalog ({salesCars.length})
            </div>
            {loading ? (
              <div className="py-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Syncing...</div>
            ) : salesCars.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground border border-dashed border-white/5 rounded-xl">No active sale listings.</div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {salesCars.map((car) => (
                  <div key={car.id} className="flex items-center justify-between p-2 bg-white/[0.02] border border-white/5 rounded-xl text-xs">
                    <div className="flex items-center gap-3">
                      <img src={img(car.hero_image)} className="h-8 w-12 object-cover rounded border border-white/10" />
                      <div>
                        <p className="font-semibold text-ice">{car.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{car.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-ice">{formatPrice(car.price, "AED")}</span>
                      <button onClick={() => handleDelete(car.id, "sale")} className="p-1.5 text-muted-foreground hover:text-red-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card border border-white/5 p-5 rounded-3xl">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">
              <CheckCircle className="h-3.5 w-3.5 text-ember" /> Live Rentals Catalog ({rentalCars.length})
            </div>
            {loading ? (
              <div className="py-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Syncing...</div>
            ) : rentalCars.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground border border-dashed border-white/5 rounded-xl">No active rental listings.</div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {rentalCars.map((car) => (
                  <div key={car.id} className="flex items-center justify-between p-2 bg-white/[0.02] border border-white/5 rounded-xl text-xs">
                    <div className="flex items-center gap-3">
                      <img src={img(car.hero_image)} className="h-8 w-12 object-cover rounded border border-white/10" />
                      <div>
                        <p className="font-semibold text-ice">{car.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{car.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-ice">{formatPrice(car.daily_rate, "AED")}/day</span>
                      <button onClick={() => handleDelete(car.id, "rental")} className="p-1.5 text-muted-foreground hover:text-red-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
