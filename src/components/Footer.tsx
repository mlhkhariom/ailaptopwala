import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => (
  <footer className="bg-foreground text-background py-12 md:py-16">
    <div className="container mx-auto px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="AI Laptop Wala" className="h-10 w-auto rounded-lg" />
            <span className="font-heading text-lg font-bold text-background">AI Laptop Wala</span>
          </Link>
          <p className="text-sm text-background/60 leading-relaxed mb-4">
            Your trusted partner for high-quality refurbished laptops and expert repair services in Indore.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/ailaptopwala" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <ExternalLink size={14} className="text-background/70" />
            </a>
            <a href="https://youtube.com/@ailaptopwala" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <ExternalLink size={14} className="text-background/70" />
            </a>
            <a href="https://facebook.com/ailaptopwala" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <ExternalLink size={14} className="text-background/70" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-sm mb-4 text-background">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Home", to: "/" },
              { label: "Buy Laptops", to: "/products" },
              { label: "Repair Services", to: "/repair" },
              { label: "About Us", to: "/about" },
              { label: "Blog", to: "/blog" },
              { label: "Contact Us", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-background/60 hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-bold text-sm mb-4 text-background">Services</h4>
          <ul className="space-y-2.5">
            {["Screen Replacement", "Battery Replacement", "Keyboard Repair", "SSD/RAM Upgrade", "General Service", "Motherboard Repair"].map((s) => (
              <li key={s}>
                <Link to="/repair" className="text-sm text-background/60 hover:text-primary transition-colors">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-bold text-sm mb-4 text-background">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-background/60">LG-21, B-Block, Silver Mall, RNT Marg, Indore, MP – 452001</p>
            </div>
            <a href="tel:+919893496163" className="flex items-center gap-2.5 text-sm text-background/60 hover:text-primary transition-colors">
              <Phone size={14} className="text-primary flex-shrink-0" /> +91 98934 96163
            </a>
            <a href="mailto:contact@ailaptopwala.com" className="flex items-center gap-2.5 text-sm text-background/60 hover:text-primary transition-colors">
              <Mail size={14} className="text-primary flex-shrink-0" /> contact@ailaptopwala.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 pt-6 text-center">
        <p className="text-xs text-background/40">
          © 2026 AI Laptop Wala | Powered by Asati Infotech. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
