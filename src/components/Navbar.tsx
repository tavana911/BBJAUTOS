import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/bbj-logo.png";

const navLinks = [
  { label: "Home", href: "/", type: "link" },
  { label: "Inventory", href: "/#inventory", type: "anchor" },
  { label: "Services", href: "/#services", type: "anchor" },
  { label: "About", href: "/#about", type: "anchor" },
  { label: "Contact", href: "/#contact", type: "anchor" },
  { label: "Rentals", href: "/rentals", type: "link" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="BBJ AUTO'S" className="h-12 logo-glow" />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.type === "link" ? (
                <Link
                  to={link.href}
                  className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
          <li>
            <a href="/#contact" className="btn-gold text-xs">Book Test Drive</a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.type === "link" ? (
                  <Link
                    to={link.href}
                    className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a href="/#contact" className="btn-gold text-xs" onClick={() => setMobileOpen(false)}>
                Book Test Drive
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
