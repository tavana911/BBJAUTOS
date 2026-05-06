import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";

interface Car {
  id: string;
  image?: string;
  image_url?: string | string[];
  name: string;
  tag?: string;
  tag_category?: string;
  year: string | number;
  price: string | number;
}

function normalizeImageUrl(input: unknown): string | null {
  if (Array.isArray(input)) {
    const first = input[0];
    return normalizeImageUrl(first);
  }

  // Supabase may store image_url as a JSON-stringified array.
  // e.g. "[\"https://...\"]".
  if (typeof input === 'string') {
    const raw = input.trim();
    if (!raw) return null;

    if (raw.startsWith('[') && raw.endsWith(']')) {
      try {
        const parsed = JSON.parse(raw);
        return normalizeImageUrl(parsed);
      } catch {
        // fall through to return raw as-is
      }
    }

    return raw;
  }

  return null;
}

const SUPABASE_PROJECT_ID = 'avjajpkmakddnjthrgrf';

function isAbsoluteHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function resolveCarImageSrc(car: Car): string {
  const placeholder = '/placeholder.svg';

  // 1) image_url can be: string | string[] | undefined
  const imageUrl = normalizeImageUrl(car.image_url);
  if (imageUrl) {
    // If Supabase (or any) absolute URL -> use directly
    if (isAbsoluteHttpUrl(imageUrl)) return imageUrl;

    // If it's a relative/static inventory path, keep it as-is.
    // (Your inventory.json uses paths like "/inventory/xxx.jpg")
    if (imageUrl.startsWith('/')) return imageUrl;

    // Otherwise treat it as a storage object path and construct a Supabase absolute public URL.
    return `https://avjajpkmakddnjthrgrf.supabase.co/storage/v1/object/public/car-images/${imageUrl}`;
  }

  // 2) Fallback to `car.image`
  const image = normalizeImageUrl(car.image);
  if (image) {
    // If image is absolute, use it. If not, it's likely a relative/static path.
    if (isAbsoluteHttpUrl(image)) return image;
    return image;
  }

  return placeholder;
}

const CarListing = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('id', { ascending: false });

        if (error) throw error;

        // Load static cars and merge with Supabase cars (newest first)
        const response = await fetch('/data/inventory.json');
        const staticCars = await response.json();
        
        // Map static cars to interface (add id if missing)
        const mappedStaticCars = staticCars.map((car: any, index: number) => ({
          ...car,
          id: car.id || `static-${index}`,
          image_url: car.image // Normalize for Supabase cars
        })); 

        // Combine static + Supabase (Supabase newest first)
        setCars([...data || [], ...mappedStaticCars]);
      } catch (err: any) {
        console.error('Error fetching cars:', err);
        setError('Failed to load inventory.');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  if (loading) {
    return (
      <section id="inventory" className="section-padding">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-card rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inventory" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Car <span className="gold-text">Inventory</span>
          </h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Browse our premium vehicle selection fetched from the database.
          </p>
          {error && (
            <p className="text-destructive mt-4">{error}</p>
          )}
        </motion.div>

        {cars.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground text-xl">
            No vehicles found in the inventory yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car, i) => (
              <motion.div
                key={car.id || i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-lg overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={resolveCarImageSrc(car)}
                    alt={car.name}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const currentSrc = target?.src;
                      const fallback = resolveCarImageSrc({ ...car, image_url: undefined, image: car.image });
                      const placeholder = '/placeholder.svg';

                      if (currentSrc !== fallback && fallback) {
                        target.src = fallback;
                        return;
                      }

                      if (currentSrc !== placeholder) {
                        target.src = placeholder;
                      }
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wider">
                      {car.tag ?? car.tag_category ?? ''}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold mb-2">{car.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{car.year}</p>
                  <p className="gold-text font-body font-bold text-xl">{car.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CarListing;