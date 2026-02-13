import logo from "@/assets/logo.png";
import { ChevronDown, Zap, ShieldCheck, BadgeCheck, MessageCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section
    className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10"
    id="hero"
  >
    {/* Decorative blobs */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

    <div className="relative z-10 container mx-auto px-5 text-center max-w-4xl pt-20 pb-10">
      {/* Logo */}
      <motion.img
        src={logo}
        alt="AI Laptop Wala Logo"
        className="h-20 md:h-24 w-auto mx-auto mb-5 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 shimmer-badge rounded-full px-4 py-1.5 text-xs font-medium text-primary border border-primary/20 mb-6 md:mb-8"
      >
        <Zap size={12} /> Powered by Asati Infotech — Since 2017
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 tracking-tight text-foreground"
      >
        Welcome to{" "}
        <span className="gradient-text">AI Laptop Wala</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-base sm:text-lg md:text-xl text-foreground/70 font-medium mb-3 max-w-2xl mx-auto leading-relaxed"
      >
        India's Leading Destination for Premium Open-Box & AI-Integrated Laptops
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm md:text-base text-muted-foreground mb-4"
      >
        MacBooks • Gaming Laptops • AI Workstations • Refurbished Systems
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground mb-8 md:mb-10 flex-wrap"
      >
        <span className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-primary" /> Best Prices</span>
        <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Genuine Products</span>
        <span className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-primary" /> Trusted Since 2017</span>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-6 md:gap-12 mb-8 md:mb-10"
      >
        <div className="stat-item">
          <div className="stat-number">15+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="stat-item">
          <div className="stat-number">5K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">Genuine Products</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <a
          href="#products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground hover:bg-primary/90 transition-all glow-cyan active:scale-95"
        >
          <Search size={16} /> Explore Products
        </a>
        <a
          href="https://wa.me/919893496163"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-primary/40 px-8 py-3.5 text-base font-bold text-primary hover:bg-primary/5 transition-all active:scale-95"
        >
          <MessageCircle size={16} /> Chat on WhatsApp
        </a>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float text-muted-foreground hover:text-primary transition-colors">
      <ChevronDown size={28} />
    </a>
  </section>
);

export default HeroSection;
