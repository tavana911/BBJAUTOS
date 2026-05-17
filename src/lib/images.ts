import heroCar from "@/assets/hero-car.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carSupercar from "@/assets/car-supercar.jpg";
import carCoupe from "@/assets/car-coupe.jpg";
import carSuv2 from "@/assets/car-suv2.jpg";
import carSedan2 from "@/assets/car-sedan2.jpg";
import carInterior from "@/assets/car-interior.jpg";

const map: Record<string, string> = {
  "hero-car": heroCar,
  "car-suv": carSuv,
  "car-sedan": carSedan,
  "car-supercar": carSupercar,
  "car-coupe": carCoupe,
  "car-suv2": carSuv2,
  "car-sedan2": carSedan2,
  "car-interior": carInterior,
};

export function img(key: string): string {
  if (!key) return heroCar;
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/")) {
    return key;
  }
  return map[key] ?? heroCar;
}

export function gallery(keys: unknown): string[] {
  if (!Array.isArray(keys)) return [];
  return keys.filter((k): k is string => typeof k === "string").map(img);
}
