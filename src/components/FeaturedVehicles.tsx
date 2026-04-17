import { motion } from "framer-motion";
import { useState } from "react";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/Mercedes-gla-5.jpeg";
import car5a from "@/assets/Mercedes-gla-5a.jpeg";
import car5b from "@/assets/Mercedes-gla-5b.jpeg";
import car5c from "@/assets/Mercedes-gla-5c.jpeg";
import car5d from "@/assets/Mercedes-gla-5d.jpeg";
import car5e from "@/assets/Mercedes-gla-5e.jpeg";
import car5f from "@/assets/Mercedes-gla-5f.jpeg";
import car5g from "@/assets/Mercedes-gla-5g.jpeg";
import car5h from "@/assets/Mercedes-gla-5h.jpeg";
import car5i from "@/assets/Mercedes-gla-5i.jpeg";
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

const vehicles = [

{
  image: car5,
  name: "Mercedes-Benz GLA 200",
  price: "Price Upon Request", // Or enter your specific price here
  tag: "GCC Specs",
  year: "2023",
  mileage: "10,000 km",
  fuel: "Petrol",
  transmission: "Automatic",
  description: "Pristine 2023 Mercedes GLA 200 with GCC specifications. Features full Agency Warranty and Free Service contract until February 2028 or 105,000 km. This vehicle is loaded with premium options and a sport body kit.",
  features: [
    "2-Tone Leather Interior",
    "Agency Warranty & Service (2028)",
    "360 Degree Cameras",
    "Panoramic Sunroof",
    "Navigation & Bluetooth System",
    "Sport System & Body Kit",
    "Front/Rear Parking Sensors",
    "Side Steps"
  ],
  images: [car5, car5a, car5b, car5c, car5d, car5e, car5f, car5g, car5h, car5i],
  specs: {
    engine: "1.3L 4-Cylinder Turbo",
    power: "163 hp",
    torque: "250 Nm",
    acceleration: "0-100 km/h in 8.7s",
    topSpeed: "210 km/h"
  }
},
  {
    image: car1,
    name: "Executive S-Class",
    price: "€89,500",
    tag: "Luxury Sedan",
    year: "2023",
    mileage: "15,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    description: "The Mercedes-Benz S-Class represents the pinnacle of luxury automotive engineering. This executive sedan offers unparalleled comfort, cutting-edge technology, and sophisticated design.",
    features: ["Premium Leather Interior", "Advanced Driver Assistance", "Burmester Sound System", "Air Suspension", "Panoramic Sunroof"],
    images: [car1, car2, car3, car4], // Using existing images as placeholders
    specs: {
      engine: "3.0L V6 Turbo Diesel",
      power: "286 hp",
      torque: "600 Nm",
      acceleration: "0-100 km/h in 6.4s",
      topSpeed: "250 km/h (limited)"
    }
  },
  {
    image: car2,
    name: "Sport 911 Targa",
    price: "€124,900",
    tag: "Sports Car",
    year: "2022",
    mileage: "8,500 km",
    fuel: "Petrol",
    transmission: "Manual",
    description: "The iconic Porsche 911 Targa combines the thrill of a convertible with the structural integrity of a coupe. Experience pure driving dynamics with legendary performance.",
    features: ["Targa Roof System", "Sport Chrono Package", "Adaptive Sports Seats", "PDK Transmission Option", "Carbon Fiber Interior"],
    images: [car2, car1, car4, car3],
    specs: {
      engine: "3.0L Flat-6 Turbo",
      power: "379 hp",
      torque: "450 Nm",
      acceleration: "0-100 km/h in 4.2s",
      topSpeed: "293 km/h"
    }
  },
  {
    image: car3,
    name: "Range Rover Sport",
    price: "€95,000",
    tag: "Premium SUV",
    year: "2023",
    mileage: "12,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    description: "The Range Rover Sport delivers exceptional capability and luxury in an athletic package. Perfect for both urban adventures and off-road exploration.",
    features: ["Terrain Response 2", "Premium Interior", "Advanced Tow Assist", "Meridian Sound System", "Adaptive Dynamics"],
    images: [car3, car4, car1, car2],
    specs: {
      engine: "3.0L V6 Turbo Diesel",
      power: "306 hp",
      torque: "700 Nm",
      acceleration: "0-100 km/h in 7.1s",
      topSpeed: "210 km/h"
    }
  },
  {
    image: car4,
    name: "M5 Competition",
    price: "€112,800",
    tag: "Performance",
    year: "2022",
    mileage: "9,200 km",
    fuel: "Petrol",
    transmission: "Automatic",
    description: "The BMW M5 Competition represents the ultimate expression of performance and luxury. Experience the perfect blend of track-ready dynamics and everyday drivability.",
    features: ["M Drive Professional", "Carbon Ceramic Brakes", "Adaptive M Suspension", "Harman Kardon Sound", "M Performance Seats"],
    images: [car4, car3, car2, car1],
    specs: {
      engine: "4.4L V8 Twin-Turbo",
      power: "625 hp",
      torque: "750 Nm",
      acceleration: "0-100 km/h in 3.3s",
      topSpeed: "305 km/h (limited)"
    }
  },
];

const FeaturedVehicles = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

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
                            <div className="flex gap-2 overflow-x-auto">
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
