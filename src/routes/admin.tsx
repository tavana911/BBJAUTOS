import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePlus, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type ListingType = "sale" | "rental";
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
  transmission: "Automatic" | "Manual";
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

export function AdminPage() {
  const [listingType, setListingType] = useState<ListingType>("sale");
  const [form, setForm] = useState<AdminFormState>(initialFormState);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

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
        const extension = file.name.split(".").pop() ?? "jpg";
        const safeName = `${crypto.randomUUID()}.${extension.toLowerCase()}`;

        const { error: uploadError } = await supabase.storage
          .from("car-images")
          .upload(safeName, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = await supabase.storage
          .from("car-images")
          .getPublicUrl(safeName);

        if (!publicUrlData?.publicUrl) {
          throw new Error("Unable to generate public image URL.");
        }

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      const heroImageUrl = uploadedUrls[0];
      const galleryUrls = uploadedUrls.slice(1);

      if (listingType === "sale") {
        const salePayload: Database["public"]["Tables"]["cars"]["Insert"] = {
          name: form.name || "Untitled Vehicle",
          make: form.make.trim() || "Unknown",
          model: form.model.trim() || "Vehicle",
          year: Number(form.year) || 2026,
          category: form.category,
          price: Number(form.price) || 0,
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

        if (insertError) {
          throw insertError;
        }
      } else {
        const rentalPayload: Database["public"]["Tables"]["rentals"]["Insert"] = {
          name: form.name || "Untitled Rental",
          category: form.category,
          daily_rate: Number(form.daily_rate) || 0,
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

        if (insertError) {
          throw insertError;
        }
      }

      toast.success(`${form.name || "Vehicle"} was added to inventory.`);
      setForm(initialFormState);
      setImageFiles([]);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Could not save this listing.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-obsidian px-4 pb-16 pt-28 text-ice">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">Administration</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ice">Admin Dashboard</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Inventory Management
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-white/10 bg-card p-5 shadow-2xl shadow-black/25 md:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              <Plus className="h-3.5 w-3.5" />
              Introduce Asset
            </div>
            <div className="flex gap-2 rounded-2xl border border-white/10 bg-obsidian p-1">
              <button
                type="button"
                onClick={() => setListingType("sale")}
                className={`rounded-xl px-3 py-1.5 text-xs transition ${
                  listingType === "sale" ? "bg-ember text-ice" : "text-muted-foreground"
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setListingType("rental")}
                className={`rounded-xl px-3 py-1.5 text-xs transition ${
                  listingType === "rental" ? "bg-ember text-ice" : "text-muted-foreground"
                }`}
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
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="e.g. Lamborghini Revuelto"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground">Brand / Make</label>
              <input
                type="text"
                required
                value={form.make}
                onChange={(event) => setForm({ ...form, make: event.target.value })}
                placeholder="Lamborghini"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Model Variant</label>
              <input
                type="text"
                required
                value={form.model}
                onChange={(event) => setForm({ ...form, model: event.target.value })}
                placeholder="Revuelto V12"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground">
                {listingType === "sale" ? "Retail Price (AED)" : "Daily Rate (AED)"}
              </label>
              <input
                type="number"
                required
                value={listingType === "sale" ? form.price : form.daily_rate}
                onChange={(event) =>
                  setForm({
                    ...form,
                    ...(listingType === "sale"
                      ? { price: event.target.value }
                      : { daily_rate: event.target.value }),
                  })
                }
                placeholder={listingType === "sale" ? "2400000" : "4500"}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Production Year</label>
              <input
                type="number"
                required
                value={form.year}
                onChange={(event) => setForm({ ...form, year: event.target.value })}
                placeholder="2026"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs text-muted-foreground">Engine</label>
              <input
                type="text"
                value={form.engine}
                onChange={(event) => setForm({ ...form, engine: event.target.value })}
                placeholder="6.5L V12"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">0-60 mph</label>
              <input
                type="text"
                value={form.zero_to_sixty}
                onChange={(event) => setForm({ ...form, zero_to_sixty: event.target.value })}
                placeholder="2.5s"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">VIN String</label>
              <input
                type="text"
                value={form.vin}
                onChange={(event) => setForm({ ...form, vin: event.target.value })}
                placeholder="LMB..."
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Vehicle Narrative / Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Describe the asset, ownership background, and standout features."
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground">Category Curation</label>
              <select
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value as ListingCategory })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-obsidian px-3 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
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
                onChange={(event) =>
                  setForm({ ...form, transmission: event.target.value as "Automatic" | "Manual" })
                }
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-obsidian px-3 py-3 text-sm text-ice outline-none transition focus:border-ember/60"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Upload Vehicle Images</label>
            <div className="mt-1.5 relative rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 transition hover:bg-white/[0.04]">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                multiple
                onChange={(event) => setImageFiles(event.target.files ? Array.from(event.target.files) : [])}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <ImagePlus className="h-5 w-5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Select one or more JPG/PNG images for this listing.</p>
              </div>
            </div>
            {imageFiles.length > 0 && (
              <div className="mt-3 grid gap-2 text-[11px] text-muted-foreground sm:grid-cols-2">
                {imageFiles.slice(0, 4).map((file) => (
                  <div key={`${file.name}-${file.size}`} className="truncate rounded-xl border border-white/10 bg-white/[0.03] p-2">
                    {file.name}
                  </div>
                ))}
                {imageFiles.length > 4 && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-center">
                    +{imageFiles.length - 4} more
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <input
              id="featured-check"
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm({ ...form, featured: event.target.checked })}
              className="h-4 w-4 accent-ember"
            />
            <label htmlFor="featured-check" className="cursor-pointer text-sm text-ice">
              Promote to Homepage Smart Grid Showcase
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ice transition hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}
