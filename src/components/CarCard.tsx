import { Link } from "@tanstack/react-router";
import { Gauge, Cog, Fingerprint, ArrowUpRight } from "lucide-react";
import { img } from "@/lib/images";
import { formatPrice } from "@/lib/format";
import type { Database } from "@/integrations/supabase/types";

export type CarSummary = Database["public"]["Tables"]["cars"]["Row"];

export type Car = Omit<CarSummary, "mileage"> & {
  mileage?: number | string | null;
  condition?: string | null;
  fuel?: string | null;
};

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/cars/$carId"
      params={{ carId: car.id }}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-card transition hover:border-ember/40 hover:shadow-ember"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={img(car.hero_image)}
          alt={`${car.year} ${car.make} ${car.model}`}
          loading="lazy"
          width={1280}
          height={832}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

        {/* Glassmorphism stat chip */}
        <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-[10px] tracking-display text-ice/80">
          {car.category}
        </div>
        <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 text-[11px] text-ice flex items-center gap-1.5">
          <Gauge className="h-3 w-3 text-ember" /> {car.zero_to_sixty ?? "—"}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-display text-ember">
              {car.year} · {car.make}
            </p>
            <h3 className="mt-1 text-lg md:text-xl font-display font-semibold text-ice leading-tight">
              {car.model}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">From</p>
            <p className="text-base md:text-lg font-display font-bold text-ice">
              {formatPrice(Number(car.price), car.currency)}
            </p>
          </div>
        </div>

        {/* Quick specs reveal */}
        <div className="mt-4 grid grid-cols-3 gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <Spec icon={<Cog className="h-3.5 w-3.5" />} label="Engine" value={car.engine ?? "—"} />
          <Spec
            icon={<Gauge className="h-3.5 w-3.5" />}
            label="Trans."
            value={car.transmission ?? "—"}
          />
          <Spec
            icon={<Fingerprint className="h-3.5 w-3.5" />}
            label="VIN"
            value={car.vin ? `…${car.vin.slice(-5)}` : "—"}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Curated by BBJ</span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-ember group-hover:gap-1.5 transition-all">
            View Details <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-lg px-2.5 py-1.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-0.5 text-[11px] text-ice truncate">{value}</div>
    </div>
  );
}


