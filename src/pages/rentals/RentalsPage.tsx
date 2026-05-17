import { useQuery } from "@tanstack/react-query";
import { Calendar, Users, Fuel, Cog } from "lucide-react";
import React from "react";

import { supabase } from "@/integrations/supabase/client";
import { img } from "@/lib/images";
import { formatPrice, WHATSAPP_LINK } from "@/lib/format";

type Rental = {
  id: string;
  name: string;
  category: string;
  rental_type: string;
  daily_rate: number;
  weekly_rate: number | null;
  monthly_rate: number | null;
  currency: string;
  seats: number | null;
  transmission: string | null;
  fuel_type: string | null;
  description: string;
  hero_image: string;
  tags: unknown;
};

export function RentalsPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["rentals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rentals")
        .select("*")
        .eq("available", true)
        .order("daily_rate", { ascending: false });
      if (error) throw error;
      return data as Rental[];
    },
  });

  return (
    <div className="pt-28 mx-auto w-[min(1400px,94%)]">
      <p className="text-xs tracking-display text-ember">CHAUFFEUR & SELF-DRIVE</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-display font-bold text-ice">
        Luxury, by the Day.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground max-w-xl">
        Daily, weekly, and monthly rates for our most-requested vehicles. Concierge delivery
        included.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-3xl bg-card animate-pulse border border-white/5"
              />
            ))
          : data.map((r) => <RentalCard key={r.id} rental={r} />)}
      </div>

      <div className="h-16" />
    </div>
  );
}

function RentalCard({ rental }: { rental: Rental }) {
  const tags = Array.isArray(rental.tags) ? (rental.tags as string[]) : [];
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-card group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={img(rental.hero_image)}
          alt={rental.name}
          loading="lazy"
          width={1280}
          height={832}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="glass rounded-full px-2.5 py-1 text-[10px] tracking-display text-ice"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-display text-ember">{rental.category}</p>
            <h3 className="mt-1 text-xl font-display font-semibold text-ice">{rental.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">From / day</p>
            <p className="text-xl font-display font-bold text-ice">
              {formatPrice(Number(rental.daily_rate), rental.currency)}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">{rental.description}</p>

        <dl className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
          <Pill
            icon={<Calendar className="h-3 w-3" />}
            label="Weekly"
            value={
              rental.weekly_rate ? formatPrice(Number(rental.weekly_rate), rental.currency) : "—"
            }
          />
          <Pill
            icon={<Users className="h-3 w-3" />}
            label="Seats"
            value={rental.seats ? String(rental.seats) : "—"}
          />
          <Pill
            icon={<Cog className="h-3 w-3" />}
            label="Trans"
            value={rental.transmission ?? "—"}
          />
        </dl>

        <div className="mt-5 flex items-center gap-2">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-medium text-ice shadow-ember hover:brightness-110 transition"
          >
            Book Now
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-ice hover:bg-white/10 transition inline-flex items-center gap-1.5"
          >
            <Fuel className="h-3.5 w-3.5 text-ember" /> Inquire
          </a>
        </div>
      </div>
    </article>
  );
}

function Pill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5">
      <div className="flex items-center gap-1 text-muted-foreground uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <div className="mt-0.5 text-ice truncate">{value}</div>
    </div>
  );
}
