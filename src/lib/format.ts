export function formatPrice(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export const WHATSAPP_NUMBER = "2347078236267"; // BBJ Autos concierge
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
