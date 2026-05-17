import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { supabase } from "@/integrations/supabase/client";
import { CarCard, type CarSummary } from "@/components/CarCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BBJAutos" },
      {
        name: "description",
        content: "The curated collection of luxury and performance vehicles by BBJ Autos. Cinematic showroom, expert concierge, instant booking.",
      },
      { property: "og:title", content: "BBJ Autos — Invest in Excellence" },
      { property: "og:description", content: "Cinematic luxury car showroom. Sales, rentals, concierge." },
    ],
  }),
  component: HomePage,
});

const STATIC_FALLBACK_FLEET: CarSummary[] = [
  {
    id: "1",
    name: "Rolls-Royce Phantom Series II",
    make: "Rolls-Royce",
    model: "Phantom",
    year: 2026,
    category: "Chauffeur",
    price: 4500000,
    currency: "AED",
    hero_image: "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&q=80&w=800",
    zero_to_sixty: "5.1s",
    engine: "6.75L V12",
    transmission: "Automatic",
    vin: "SCA684S0XG",
    mileage: null,
    fuel_type: null,
    drivetrain: null,
    top_speed: null,
    horsepower: null,
    exterior_color: null,
    interior_color: null,
    description: "",
    narrative: null,
    gallery: [],
    featured: true,
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Lamborghini Revuelto",
    make: "Lamborghini",
    model: "Revuelto",
    year: 2026,
    category: "Supercar",
    price: 2700000,
    currency: "AED",
    hero_image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800",
    zero_to_sixty: "2.5s",
    engine: "6.5L V12 Hybrid",
    transmission: "Automatic",
    vin: "HW8392019X",
    mileage: null,
    fuel_type: null,
    drivetrain: null,
    top_speed: null,
    horsepower: null,
    exterior_color: null,
    interior_color: null,
    description: "",
    narrative: null,
    gallery: [],
    featured: true,
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Mercedes-AMG G 63 Grand Edition",
    make: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2026,
    category: "Self-Drive",
    price: 1200000,
    currency: "AED",
    hero_image: "https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=800",
    zero_to_sixty: "4.5s",
    engine: "4.0L V8 Biturbo",
    transmission: "Automatic",
    vin: "WDB4632761",
    mileage: null,
    fuel_type: null,
    drivetrain: null,
    top_speed: null,
    horsepower: null,
    exterior_color: null,
    interior_color: null,
    description: "",
    narrative: null,
    gallery: [],
    featured: true,
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

function HomePage() {
  const { data: featuredCars = STATIC_FALLBACK_FLEET, isLoading } = useQuery<
    CarSummary[]
  >({
    queryKey: ["featuredCars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("featured", true)
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data ?? [];
    },
  });

  const fleet = !isLoading && featuredCars.length > 0 ? featuredCars : STATIC_FALLBACK_FLEET;

  return (
    <div className="pt-24">
      {/* HERO */}
      <section className="px-3 md:px-5">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mx-auto max-w-[1400px] gradient-cinematic">
          <img
            src={heroCar}
            alt="BBJ Autos hero"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />

          <div className="relative px-6 md:px-14 pt-16 md:pt-28 pb-20 md:pb-32 max-w-3xl">
            <p className="text-xs tracking-display text-ember">THE DIGITAL SHOWROOM</p>
            <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] text-ice">
              Invest in <span className="text-gradient-ember">Excellence</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg text-ice/75">
              The Curated Collection by BBJ Autos — a private inventory of luxury, performance, and provenance, delivered with cinematic intent.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inventory" className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ice shadow-ember hover:brightness-110 transition">
                Explore Inventory <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/rentals" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-ice hover:bg-white/10 transition">
                Browse Rentals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="mx-auto w-[min(1400px,94%)] mt-20 md:mt-28">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs tracking-display text-ember">FEATURED</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-ice">The Smart Grid</h2>
          </div>
          <Link to="/inventory" className="inline-flex items-center gap-1.5 text-sm text-ice hover:text-ember transition">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fleet.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto w-[min(1400px,94%)] mt-20 md:mt-28 grid md:grid-cols-3 gap-4">
        <ValueCard icon={<ShieldCheck className="h-5 w-5 text-ember" />} title="Provenance Verified" body="Every vehicle is inspected and history-checked." />
        <ValueCard icon={<Truck className="h-5 w-5 text-ember" />} title="Global Logistics" body="Enclosed transport across the GCC and beyond." />
        <ValueCard icon={<Sparkles className="h-5 w-5 text-ember" />} title="Concierge Curation" body="Tell us your spec. We source, negotiate and deliver." />
      </section>
      <div className="h-10" />
    </div>
  );
}


function ValueCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6">
      <div className="h-10 w-10 grid place-items-center rounded-xl bg-white/5 border border-white/10">{icon}</div>
      <h3 className="mt-4 text-lg font-display font-semibold text-ice">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}