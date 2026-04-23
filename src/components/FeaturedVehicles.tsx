import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Vehicle {
  image: string;
  name: string;
  price: string;
  tag: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  description: string;
  features: string[];
  images: string[];
  specs: {
    engine: string;
    power: string;
    torque: string;
    acceleration: string;
    topSpeed: string;
  };
}

const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
fetch('/data/inventory.json')
      .then((response) => response.json())
      .then((data: Vehicle[]) => setVehicles(data))
      .catch((error) => console.error('Error loading inventory:', error));
  }, []);

  if (vehicles.length === 0) {
    return null; // or loading spinner
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
            Featured <span className="gold-text">Vehicles</span>
          </h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Handpicked luxury automobiles, each inspected to meet our exacting standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/90 text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
                    {car.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold mb-1">{car.name}</h3>
                <p className="gold-text font-body font-bold text-xl mb-4">{car.price}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="btn-outline-gold w-full text-xs py-2"
                      onClick={() => {
                        setSelectedVehicle(car);
                        setSelectedImage(0);
                      }}
                    >
                      View Details
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedVehicle && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-display">
                            {selectedVehicle.name}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                          {/* Main Image */}
                          <div className="space-y-4">
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                              <img
                                src={selectedVehicle.images[selectedImage]}
                                alt={`${selectedVehicle.name} - Image ${selectedImage + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {selectedVehicle.images.map((img, index) => (
                                <button
                                  key={index}
                                  onClick={() => setSelectedImage(index)}
                                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                    selectedImage === index
                                      ? "border-primary"
                                      : "border-transparent hover:border-primary/50"
                                  }`}
                                >
                                  <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Vehicle Details */}
                          <div className="space-y-6">
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <Badge variant="secondary">{selectedVehicle.tag}</Badge>
                                <span className="gold-text font-bold text-2xl">
                                  {selectedVehicle.price}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Year:</span>
                                  <p className="font-semibold">{selectedVehicle.year}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Mileage:</span>
                                  <p className="font-semibold">{selectedVehicle.mileage}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Fuel:</span>
                                  <p className="font-semibold">{selectedVehicle.fuel}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Transmission:</span>
                                  <p className="font-semibold">{selectedVehicle.transmission}</p>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <h3 className="font-semibold mb-2">Description</h3>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {selectedVehicle.description}
                              </p>
                            </div>

                            <Separator />

                            <div>
                              <h3 className="font-semibold mb-3">Key Features</h3>
                              <div className="grid grid-cols-1 gap-2">
                                {selectedVehicle.features.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                    <span className="text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <h3 className="font-semibold mb-3">Technical Specifications</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Engine:</span>
                                  <span>{selectedVehicle.specs.engine}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Power:</span>
                                  <span>{selectedVehicle.specs.power}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Torque:</span>
                                  <span>{selectedVehicle.specs.torque}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">0-100 km/h:</span>
                                  <span>{selectedVehicle.specs.acceleration}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Top Speed:</span>
                                  <span>{selectedVehicle.specs.topSpeed}</span>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4">
                              <DialogClose asChild>
                                <Button asChild>
                                  <a href="#contact" className="w-full btn-gold">
                                    Contact Us About This Vehicle
                                  </a>
                                </Button>
                              </DialogClose>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
