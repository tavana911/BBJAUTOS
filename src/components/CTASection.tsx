import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/10" />
      <div className="container mx-auto relative z-10 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold mb-4"
        >
          Find Your <span className="gold-text">Dream Car</span> Today
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="gold-divider mx-auto mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground font-body mb-10 max-w-lg mx-auto"
        >
          Visit our showroom or browse our collection online. Your perfect vehicle is waiting.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#inventory" className="btn-gold">Browse Inventory</a>
          <a href="#contact" className="btn-outline-gold">Contact Us</a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
