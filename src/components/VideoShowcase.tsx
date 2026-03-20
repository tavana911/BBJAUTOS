import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

const VideoShowcase = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            The <span className="gold-text">Experience</span>
          </h2>
          <div className="gold-divider mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-lg overflow-hidden glass-card aspect-video"
        >
          {!playing ? (
            <div
              className="relative w-full h-full cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80"
                alt="Luxury car showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/40 flex items-center justify-center group-hover:bg-background/30 transition-colors">
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="BBJ AUTO'S Showcase"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
