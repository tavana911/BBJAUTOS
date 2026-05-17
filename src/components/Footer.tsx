import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Phone, Mail, MapPin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WHATSAPP_LINK } from "@/lib/format";

// Simple SVG icons for TikTok / WhatsApp / X (Lucide doesn't ship these reliably).
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M21 8.5a7.5 7.5 0 0 1-4.5-1.5v8a6 6 0 1 1-6-6c.34 0 .67.03 1 .1v3.1a3 3 0 1 0 2 2.8V2h3a4.5 4.5 0 0 0 4.5 4.5V8.5Z" />
    </svg>
  );
}
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3.3 17l-1.3 4.8 4.9-1.3A11 11 0 1 0 20.5 3.5Zm-8.5 18a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.8.8-2.8-.2-.3A9 9 0 1 1 12 21.5Zm5.2-6.7c-.3-.2-1.7-.8-1.9-.9-.3-.1-.5-.2-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1 2.8.1.2 1.7 2.7 4.2 3.7.6.2 1 .4 1.4.5.6.2 1.1.1 1.5.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setLoading(false);
    if (error) toast.error("Couldn't subscribe — try a different email");
    else {
      toast.success("Welcome to the Inner Circle.");
      setEmail("");
    }
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.message) return;
    setLoading(true);
    const { error } = await supabase.from("contact_inquiries").insert({
      name: contact.name,
      email: contact.email,
      message: contact.message,
      inquiry_type: "footer",
    });
    setLoading(false);
    if (error) toast.error("Could not send. Please try again.");
    else {
      toast.success("Message sent. Our concierge will be in touch.");
      setContact({ name: "", email: "", message: "" });
    }
  }

  return (
    <footer
      id="contact"
      className="relative mt-24 bg-obsidian rounded-t-[2.5rem] border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent" />

      {/* Newsletter band */}
      <div className="mx-auto w-[min(1280px,92%)] pt-16 md:pt-20 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs tracking-display text-ember">JOIN THE INNER CIRCLE</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-ice">
            New arrivals, before everyone else.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Quiet drops, private viewings and curated trade opportunities — delivered to your inbox.
          </p>
        </div>
        <form onSubmit={subscribe} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="you@privateemail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-ice placeholder:text-muted-foreground focus:outline-none focus:border-ember/60"
          />
          <button
            disabled={loading}
            className="rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ice shadow-ember hover:brightness-110 transition disabled:opacity-60"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="h-px bg-white/5 mx-auto w-[min(1280px,92%)]" />

      {/* Contact grid */}
      <div className="mx-auto w-[min(1280px,92%)] py-14 grid lg:grid-cols-3 gap-10">
        {/* Left — map / address */}
        <div>
          <p className="text-xs tracking-display text-ember">VISIT THE SHOWROOM</p>
          <h3 className="mt-3 text-2xl font-display font-bold text-ice">BBJ Autos HQ</h3>
          <p className="mt-3 text-sm text-muted-foreground flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-ember" />
            Sheikh Zayed Road, Showroom 14
            <br />
            Dubai, United Arab Emirates
          </p>
          <div className="mt-5 rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
            <iframe
              title="BBJ Autos location"
              src="https://www.google.com/maps?q=Sheikh+Zayed+Road+Dubai&output=embed"
              loading="lazy"
              className="w-full h-full grayscale contrast-125"
            />
          </div>
        </div>

        {/* Center — socials & direct contact */}
        <div>
          <p className="text-xs tracking-display text-ember">DIRECT CONTACT</p>
          <h3 className="mt-3 text-2xl font-display font-bold text-ice">Concierge, on demand.</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Reach our specialists across every channel. Replies typically within 12 minutes.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href="https://wa.me/2347078236267"
                className="flex items-center gap-3 text-ice hover:text-ember transition"
              >
                <span className="h-9 w-9 grid place-items-center rounded-full bg-white/5 border border-white/10">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                WhatsApp Concierge
              </a>
            </li>
            <li>
              <a
                href="tel:+2347078236267"
                className="flex items-center gap-3 text-ice hover:text-ember transition"
              >
                <span className="h-9 w-9 grid place-items-center rounded-full bg-white/5 border border-white/10">
                  <Phone className="h-4 w-4" />
                </span>
                +234 707 823 6267
              </a>
            </li>
            <li>
              <a
                href="mailto:info@bbjautos.com"
                className="flex items-center gap-3 text-ice hover:text-ember transition"
              >
                <span className="h-9 w-9 grid place-items-center rounded-full bg-white/5 border border-white/10">
                  <Mail className="h-4 w-4" />
                </span>
                Email: info@bbjautos.com
              </a>
            </li>
          </ul>

          <p className="mt-8 text-xs tracking-display text-ember">FOLLOW</p>
          <div className="mt-3 flex items-center gap-2">
            {[
              {
                label: "Instagram",
                icon: <Instagram className="h-4 w-4" />,
                href: "https://instagram.com",
              },
              {
                label: "TikTok",
                icon: <TikTokIcon className="h-4 w-4" />,
                href: "https://tiktok.com",
              },
              {
                label: "WhatsApp",
                icon: <WhatsAppIcon className="h-4 w-4" />,
                href: "https://wa.me/2347078236267",
              },
            ].map((s) => (
              <a
                key={s.label}
                aria-label={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 grid place-items-center rounded-full border border-white/10 bg-white/5 text-ice hover:text-ember hover:border-ember/60 transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right — contact form */}
        <div>
          <p className="text-xs tracking-display text-ember">SEND A MESSAGE</p>
          <h3 className="mt-3 text-2xl font-display font-bold text-ice">
            Tell us what you're after.
          </h3>

          <form onSubmit={submitContact} className="mt-6 space-y-3">
            <input
              required
              placeholder="Full name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice placeholder:text-muted-foreground focus:outline-none focus:border-ember/60"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice placeholder:text-muted-foreground focus:outline-none focus:border-ember/60"
            />
            <textarea
              required
              rows={4}
              placeholder="What can we curate for you?"
              value={contact.message}
              onChange={(e) => setContact({ ...contact, message: e.target.value })}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice placeholder:text-muted-foreground focus:outline-none focus:border-ember/60 resize-none"
            />
            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ice shadow-ember hover:brightness-110 transition disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> Send Inquiry
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto w-[min(1280px,92%)] py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BBJ Autos. The Curated Collection.</p>
          <div className="flex items-center gap-5">
            <Link to="/inventory" className="hover:text-ice transition">
              Inventory
            </Link>
            <Link to="/rentals" className="hover:text-ice transition">
              Rentals
            </Link>
            <span>Logistics</span>
            <span>Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
