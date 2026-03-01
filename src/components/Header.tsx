import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Buy Products", href: "/products" },
  { label: "Repair Services", href: "/repair" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50" : "bg-card/80 backdrop-blur-md"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-2.5 md:py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="AI Laptop Wala" className="h-9 md:h-10 w-auto rounded-lg" />
          <span className="font-heading text-base md:text-lg font-extrabold gradient-text tracking-tight hidden sm:inline">
            AI Laptop Wala
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === l.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
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
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-muted text-foreground active:scale-95 transition-transform"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 top-0 z-40"
          >
            <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-1 px-8">
              <img src={logo} alt="AI Laptop Wala" className="h-16 w-auto mb-6 rounded-xl" />
              {navLinks.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link
                    to={l.href}
                    className={`text-2xl font-heading font-bold transition-colors py-3 block ${
                      location.pathname === l.href ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                href="https://wa.me/919893496163"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground glow-cyan active:scale-95 transition-transform"
                onClick={() => setMobileOpen(false)}
              >
                <Phone size={18} /> WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
