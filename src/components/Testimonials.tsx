import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Michael V.", role: "Business Owner", text: "BBJ AUTO'S delivered an exceptional experience. From the moment I walked in, the professionalism and quality were unmatched. My new S-Class is a dream." },
  { name: "Sarah D.", role: "Entrepreneur", text: "The financing options made it possible for me to drive the car I've always wanted. The team was incredibly helpful and transparent throughout." },
  { name: "Aina G.", role: "Executive", text: "Nationwide delivery was seamless. The car arrived in perfect condition, exactly as described. I couldn't be happier with my purchase from BBJ AUTO'S." },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Client <span className="gold-text">Testimonials</span>
          </h2>
          <div className="gold-divider mx-auto" />
        </motion.div>

        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="glass-card rounded-lg p-8 md:p-12 text-center"
        >
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <p className="font-body text-lg leading-relaxed text-secondary-foreground mb-8 italic">
            "{testimonials[current].text}"
          </p>
          <p className="font-display text-xl font-semibold gold-text">{testimonials[current].name}</p>
          <p className="text-muted-foreground text-sm font-body">{testimonials[current].role}</p>
        </motion.div>

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prev} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
