import { motion } from "framer-motion";
import { Award, Shield, CreditCard, Truck } from "lucide-react";

const features = [
  { icon: Award, title: "Premium Vehicles", desc: "Only the finest luxury and performance cars make it to our showroom." },
  { icon: Shield, title: "Trusted Dealership", desc: "Over 15 years of excellence with thousands of satisfied clients." },
  { icon: CreditCard, title: "Financing Options", desc: "Flexible payment plans tailored to your budget and lifestyle." },
  { icon: Truck, title: "Nationwide Delivery", desc: "We deliver your dream car to your doorstep, anywhere in the country." },
];

const WhyChooseUs = () => {
  return (
    <section id="services" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gold-text">BBJ AUTO'S</span>
          </h2>
          <div className="gold-divider mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-lg p-8 text-center group hover:border-primary/50 transition-all duration-500"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
