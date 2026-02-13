import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card-solid shadow-2xl" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <a href="#" className="font-heading text-lg md:text-xl font-extrabold gradient-text tracking-tight">
          AI Laptop Wala
        </a>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/919893496163"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all glow-cyan"
            >
              <Phone size={14} /> WhatsApp Us
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/50 text-foreground active:scale-95 transition-transform"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-40 transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-2 px-8">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-2xl font-heading font-bold text-foreground hover:text-primary transition-all duration-300 py-3 ${
                mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/919893496163"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground glow-cyan active:scale-95 transition-transform"
            onClick={() => setMobileOpen(false)}
          >
            <Phone size={18} /> WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
