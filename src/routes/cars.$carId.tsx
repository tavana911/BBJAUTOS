import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type CarSummary } from "@/components/CarCard";
import { gallery, img } from "@/lib/images";
import { Loader2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cars/$carId")({
  component: CarDetailsPage,
});

function CarDetailsPage() {
  const { carId } = Route.useParams();
  const [car, setCar] = useState<CarSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImg, setActiveImg] = useState<number>(0);

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", carId)
          .single();

        if (error) throw error;
        setCar(data as CarSummary);
      } catch (err) {
        console.error("Error pulling asset specifications:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCarDetails();
  }, [carId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center text-ice">
        <Loader2 className="h-8 w-8 animate-spin text-ember" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="pt-32 text-center text-ice bg-obsidian min-h-screen">
        <h1 className="text-xl font-bold">Bespoke Asset Not Found</h1>
        <Link to="/inventory" className="text-ember text-sm mt-4 inline-block hover:underline">
          Return to Showroom Floor
        </Link>
      </div>
    );
  }

  const galleryImages = gallery(car.gallery);
  const imageGallery = galleryImages.length > 0 ? galleryImages : [car.hero_image];

  return (
    <div className="pt-32 pb-24 bg-obsidian min-h-screen text-ice">
      <div className="mx-auto w-[min(1200px,92%)] grid md:grid-cols-2 gap-12 items-start">
        
        {/* INTERACTIVE MEDIA GALLERY */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 aspect-[4/3] bg-card shadow-2xl">
            <img 
              src={imageGallery[activeImg]} 
              alt={car.name} 
              className="w-full h-full object-cover transition-all duration-300" 
            />
          </div>

          {/* GALLERY THUMBNAIL TRACK */}
          {imageGallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {imageGallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImg(index)}
                  className={`h-20 w-28 rounded-xl overflow-hidden border-2 bg-card flex-shrink-0 transition ${
                    activeImg === index ? "border-ember opacity-100 scale-95" : "border-white/10 opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* METRICS & SPECS */}
        <div className="space-y-6">
          <div>
            <p className="text-xs text-ember font-semibold tracking-display uppercase">{car.category}</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold mt-1">{car.name}</h1>
            <p className="text-2xl font-semibold text-ember mt-3">
              {car.price.toLocaleString()} {car.currency}
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{car.narrative}</p>
          <p className="text-xs text-ice/70 bg-white/5 border border-white/5 p-4 rounded-xl font-medium italic">
            {car.description}
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-6 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs">Engine Profile</span>
              <span className="font-medium text-ice">{car.engine}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">0 - 60 MPH</span>
              <span className="font-medium text-ice">{car.zero_to_sixty}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Transmission</span>
              <span className="font-medium text-ice">{car.transmission}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Performance</span>
              <span className="font-medium text-ice">{car.horsepower} ({car.top_speed})</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Colors (Ext / Int)</span>
              <span className="font-medium text-ice text-xs">{car.exterior_color} / {car.interior_color}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">Chassis VIN</span>
              <span className="font-mono text-xs text-ice/80">{car.vin}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/inventory" className="inline-flex items-center gap-2 text-xs border border-white/10 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}