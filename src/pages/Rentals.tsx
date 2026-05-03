import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import AirportTransferBooking from "@/components/AirportTransferBooking";

const features = [
  {
    title: "Premium SUV Fleet",
    subtitle: "Daily rentals built for executive comfort.",
  },
  {
    title: "Airport Transfers",
    subtitle: "Seamless chauffeur-driven arrivals and departures.",
  },
  {
    title: "Flexible Booking",
    subtitle: "Book by the day, the week, or long-term corporate plans.",
  },
];

const Rentals = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-300" />
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Luxury rental SUV fleet"
            className="h-full w-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-slate-50/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-400/10 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-slate-500">Rentals</p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Daily Luxury Fleet Rentals for Executives
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  Discover premium vehicles, flexible booking, and curated chauffeur services in a modern rental experience built for seamless mobility.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <Link
                  to="/"
                  className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 transition hover:bg-slate-200 hover:text-slate-950"
                >
                  Home
                </Link>
                <Link
                  to="/#inventory"
                  className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 transition hover:bg-slate-200 hover:text-slate-950"
                >
                  Inventory
                </Link>
                <span className="rounded-full bg-slate-950 px-4 py-2 text-white">Rentals</span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  href="https://wa.me/2347078236267?text=Hello!%20I%20would%20like%20to%20book%20a%20premium%20rental."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-emerald-500/20 transition-transform duration-300 hover:-translate-y-1"
                >
                  Book a Rental
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  href="/#inventory"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  View Fleet
                </motion.a>

                <div className="grid gap-4 sm:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-950">{feature.title}</p>
                      <p className="mt-2 text-sm text-slate-600">{feature.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-900/20"
              >
                <img src="/inventory/GLE-63-1.jpeg" alt="Mercedes-AMG GLE 63 S rental" className="h-[520px] w-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-white backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Featured Rental</p>
                  <h2 className="mt-3 text-2xl font-semibold">Mercedes-AMG GLE 63 S 4MATIC+</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-200">
                    <div>
                      <p className="text-slate-400">Power</p>
                      <p className="mt-1 font-semibold">603 hp</p>
                    </div>
                    <div>
                      <p className="text-slate-400">0-100 km/h</p>
                      <p className="mt-1 font-semibold">3.8s</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Top Speed</p>
                      <p className="mt-1 font-semibold">280 km/h</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Premium Support</p>
            <h3 className="mt-4 text-xl font-semibold text-slate-950">Chauffeur-Driven Experience</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">Enjoy concierge pickups and tailored route planning for every journey.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Transparent Pricing</p>
            <h3 className="mt-4 text-xl font-semibold text-slate-950">Daily, Weekly & Long-Term</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">Flexible packages designed around your schedule and corporate requirements.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Fleet Access</p>
            <h3 className="mt-4 text-xl font-semibold text-slate-950">High-Capacity Luxury Vehicles</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">Select from premium SUVs, executive sedans, and VIP transfer units.</p>
          </div>
        </div>
      </section>

      <AirportTransferBooking />
    </main>
  );
};

export default Rentals;
