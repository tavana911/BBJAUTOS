import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/format";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BBJ Autos" },
      {
        name: "description",
        content:
          "Speak with the BBJ Autos concierge. Sales, rentals, sourcing and logistics inquiries.",
      },
      { property: "og:title", content: "Contact — BBJ Autos" },
      {
        property: "og:description",
        content: "Reach the BBJ Autos concierge for sales, rentals and bespoke sourcing.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Price Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_inquiries").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject,
      message: form.message,
      inquiry_type: "contact-page",
    });
    setLoading(false);
    if (error) toast.error("Couldn't send. Please try again.");
    else {
      toast.success("Message received. Concierge will respond shortly.");
      setForm({ name: "", email: "", phone: "", subject: "Price Inquiry", message: "" });
    }
  }

  return (
    <div className="pt-28 mx-auto w-[min(1280px,94%)]">
      <p className="text-xs tracking-display text-ember">CONCIERGE DESK</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-display font-bold text-ice">
        Talk to a Specialist.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground max-w-xl">
        Pricing, sourcing, rentals, logistics — our team handles it all in one conversation.
      </p>

      <div className="mt-12 grid lg:grid-cols-5 gap-6">
        <aside className="lg:col-span-2 space-y-3">
          <ContactRow
            icon={<Phone className="h-4 w-4 text-ember" />}
            title="Call"
            value="+234 707 823 6267"
            href="tel:+2347078236267"
          />
          <ContactRow
            icon={<Mail className="h-4 w-4 text-ember" />}
            title="Email"
            value="info@bbjautos.com"
            href="mailto:info@bbjautos.com"
          />
          <ContactRow
            icon={<MapPin className="h-4 w-4 text-ember" />}
            title="Showroom"
            value="Sheikh Zayed Road, Dubai, UAE"
          />
          <a
            href="https://wa.me/2347078236267"
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-ember/40 bg-ember/10 p-5 text-ice hover:bg-ember/15 transition"
          >
            <p className="text-xs tracking-display text-ember">WHATSAPP CONCIERGE</p>
            <p className="mt-1 font-display font-semibold text-lg">Chat with an expert →</p>
            <p className="mt-1 text-xs text-muted-foreground">Average response time: 12 minutes.</p>
          </a>
        </aside>

        <form
          onSubmit={submit}
          className="lg:col-span-3 rounded-3xl border border-white/10 bg-card p-6 md:p-8 space-y-3"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Full name"
              required
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <Field
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Phone"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
            <Field
              label="Subject"
              value={form.subject}
              onChange={(v) => setForm({ ...form, subject: v })}
            />
          </div>
          <div>
            <label className="text-xs tracking-display text-muted-foreground">Message</label>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60 resize-none"
            />
          </div>
          <button
            disabled={loading}
            className="w-full rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-ice shadow-ember hover:brightness-110 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>

      <div className="h-16" />
    </div>
  );
}

function ContactRow({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card p-4">
      <span className="h-9 w-9 grid place-items-center rounded-full bg-white/5 border border-white/10">
        {icon}
      </span>
      <div>
        <p className="text-[11px] tracking-display text-muted-foreground">{title}</p>
        <p className="text-sm text-ice">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:border-ember/40 transition">
      {Inner}
    </a>
  ) : (
    Inner
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs tracking-display text-muted-foreground">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-ice focus:outline-none focus:border-ember/60"
      />
    </div>
  );
}
