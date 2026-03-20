import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Link } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.sendForm('service_cuw4xkg', 'template_65k6smp', formRef.current!, 'KKDS3qYa3fpMpY_Sl');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Email send failed:', error);
      // Optionally show error message to user
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="gold-text">Touch</span>
          </h2>
          <div className="gold-divider mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            ref={formRef}
            className="glass-card rounded-lg p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                required
                className="w-full bg-muted border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                required
                className="w-full bg-muted border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              className="w-full bg-muted border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              className="w-full bg-muted border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              name="message"
              required
              className="w-full bg-muted border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
            />
            <button type="submit" className="btn-gold w-full">
              {submitted ? "Message Sent ✓" : "Send Message"}
            </button>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card rounded-lg p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">Phone</h4>
                  <a href="tel:+310201234567" className="text-muted-foreground font-body text-sm hover:text-primary transition-colors">+31 (0) 20 123 4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">Email</h4>
                  <a href="mailto:Bbjagoautos@gmail.com" className="text-muted-foreground font-body text-sm hover:text-primary transition-colors">Bbjagoautos@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">Location</h4>
                  <p className="text-muted-foreground font-body text-sm">Amsterdam, Netherlands</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">Instagram</h4>
                  <a href="https://www.instagram.com/bbjago.autos?igsh=ejZzbGUweDVqOWhl&utm_source=qr" className="text-muted-foreground font-body text-sm hover:text-primary transition-colors">@bbjago.autos</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Link className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold mb-1">TikTok</h4>
                  <a href="https://www.tiktok.com/@bbjago_autos" className="text-muted-foreground font-body text-sm hover:text-primary transition-colors">@bbjago_autos</a>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155959.55397508!2d4.7633028!3d52.3547498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c63fb5949a7755%3A0x6600fd4cb7c0af8d!2sAmsterdam!5e0!3m2!1sen!2snl!4v1"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="BBJ AUTO'S Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
