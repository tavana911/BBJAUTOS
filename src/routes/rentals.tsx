import { createFileRoute } from "@tanstack/react-router";
import { RentalsPage } from "@/pages/rentals/RentalsPage";

export const Route = createFileRoute("/rentals")({
  head: () => ({
    meta: [
      { title: "Rentals — BBJ Autos" },
      {
        name: "description",
        content:
          "Self-drive and chauffeur-driven luxury car rentals from BBJ Autos. Daily, weekly and monthly rates.",
      },
      { property: "og:title", content: "Rentals — BBJ Autos" },
      { property: "og:description", content: "Premium daily, weekly and monthly luxury rentals." },
    ],
  }),
  component: RentalsPage,
});
