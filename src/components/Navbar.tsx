import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import bbjLogo from "@/assets/bbj-logo.png";

const navItems = [
  { to: "/", label: "Showroom" },
  { to: "/inventory", label: "Inventory" },
  { to: "/rentals", label: "Rentals" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 w-[min(1280px,94%)] glass-strong rounded-2xl px-4 py-3 md:px-6 md:py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={bbjLogo}
            alt="BBJ Autos"
            // className="h-8 w-8 rounded-md object-contain bg-ember"
            width={72}
            height={52}
          />
          <span className="font-display font-bold tracking-display text-sm md:text-base text-ice">
            BBJAUTOS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="px-4 py-2 text-sm text-ice/80 hover:text-ice transition-colors rounded-md"
              activeProps={{ className: "text-ice bg-white/5" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-ice shadow-ember hover:brightness-110 transition"
        >
          Price Inquiry
        </Link>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-ice"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-auto mt-2 w-[min(1280px,94%)] glass-strong rounded-2xl p-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm text-ice/85 hover:bg-white/5 rounded-lg"
              activeProps={{ className: "text-ice bg-white/5" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-1 mx-1 inline-flex items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-medium text-ice"
          >
            Price Inquiry
          </Link>
        </div>
      )}
    </header>
  );
}
