import { Instagram, Link } from "lucide-react";
import logo from "@/assets/bbj-logo.png";

const Footer = () => {
  const socialLinks = [
    { Icon: Instagram, href: "https://www.instagram.com/bbjago.autos?igsh=ejZzbGUweDVqOWhl&utm_source=qr", label: "Instagram" },
    { Icon: Link, href: "https://www.tiktok.com/@bbjago_autos", label: "TikTok" }
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img src={logo} alt="BBJ AUTO'S" className="h-10 mb-4" />
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Your trusted luxury automotive dealership. Premium vehicles, exceptional service.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Inventory", "Services", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-muted-foreground font-body text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-muted-foreground font-body text-sm">
              <li>Vehicle Sales</li>
              <li>Test Drives</li>
              <li>Financing</li>
              <li>Trade-In</li>
              <li>Delivery</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-muted-foreground font-body text-xs">
            © {new Date().getFullYear()} BBJ AUTO'S. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
