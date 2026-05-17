import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CarCard, type CarSummary } from "@/components/CarCard";
import { supabase } from "@/integrations/supabase/client";

import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/inventory")({
  component: InventoryPage,
});

function InventoryPage() {
  const [fleet, setFleet] = useState<CarSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch livedata directly from Supabase
  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        // Only show sale cars that are actively available
        const { data, error: supabaseError } = await supabase
          .from("cars")
          .select("*")
          .eq("status", "available")
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;

        setFleet(data || []);
      } catch (err: any) {
        console.error("Error loading showroom inventory:", err);
        setError(err.message || "Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, []);


  // Dynamically group categories based on live database records
  const categories = ["All", ...Array.from(new Set(fleet.map((c) => c.category)))];

  // Filter list down based on selected pill
  const filteredCars = selectedCategory === "All" 
    ? fleet 
    : fleet.filter((c) => c.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center text-ice">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-ember" />
          <p className="text-sm tracking-wide text-muted-foreground">Accessing Showroom Vault...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center text-ice">
        <div className="text-center space-y-4">
          <p className="text-ember font-medium">Database Connection Error</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen text-ice bg-obsidian">
      <div className="mx-auto w-[min(1400px,94%)]">
        {/* HEADER */}
        <div>
          <p className="text-xs tracking-display text-ember uppercase font-semibold">THE COLLECTION</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-2 tracking-tight">Curated Inventory</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Live luxury collection managed directly from your system concierge panel.
          </p>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition capitalize ${
                selectedCategory === cat
                  ? "bg-ember text-ice shadow-lg shadow-ember/20"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-ice"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SHOWROOM STOCK GRID */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl mt-10">
            <p className="text-sm text-muted-foreground">No vehicles listed under this profile configuration.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 animate-fade-in">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}