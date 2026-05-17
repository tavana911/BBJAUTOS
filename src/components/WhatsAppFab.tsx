import { WHATSAPP_LINK } from "@/lib/format";

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp Expert"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-medium text-ice shadow-ember hover:brightness-110 transition"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 3.3 17l-1.3 4.8 4.9-1.3A11 11 0 1 0 20.5 3.5Zm-8.5 18a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.8.8-2.8-.2-.3A9 9 0 1 1 12 21.5Z" />
      </svg>
      WhatsApp Expert
    </a>
  );
}
