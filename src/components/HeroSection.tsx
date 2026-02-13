import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { ChevronDown, Zap, ShieldCheck, BadgeCheck, MessageCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section
    className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    id="hero"
  >
    {/* Background image with dark overlay for contrast */}
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Premium laptop"
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(215,50%,12%)]/85 via-[hsl(215,50%,15%)]/75 to-[hsl(215,50%,10%)]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,100%,20%)]/30 to-transparent" />
    </div>

    <div className="relative z-10 container mx-auto px-5 text-center max-w-4xl pt-20 pb-10">
      {/* Logo */}
      <motion.img
        src={logo}
        alt="AI Laptop Wala Logo"
        className="h-20 md:h-28 w-auto mx-auto mb-5 drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/90 border border-white/20 bg-white/10 backdrop-blur-sm mb-6 md:mb-8"
      >
        <Zap size={12} className="text-yellow-400" /> Powered by Asati Infotech — Since 2017
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 tracking-tight text-white"
      >
        Welcome to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(210,100%,65%)] via-[hsl(200,100%,60%)] to-[hsl(190,100%,55%)]">
          AI Laptop Wala
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-base sm:text-lg md:text-xl text-white/80 font-medium mb-3 max-w-2xl mx-auto leading-relaxed"
      >
        India's Leading Destination for Premium Open-Box & AI-Integrated Laptops
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm md:text-base text-white/60 mb-4"
      >
        MacBooks • Gaming Laptops • AI Workstations • Refurbished Systems
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-white/70 mb-8 md:mb-10 flex-wrap"
      >
        <span className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-[hsl(210,100%,65%)]" /> Best Prices</span>
        <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-[hsl(210,100%,65%)]" /> Genuine Products</span>
        <span className="inline-flex items-center gap-1.5"><BadgeCheck size={14} className="text-[hsl(210,100%,65%)]" /> Trusted Since 2017</span>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-6 md:gap-12 mb-8 md:mb-10 bg-white/10 backdrop-blur-md rounded-2xl py-5 px-6 border border-white/10 max-w-lg mx-auto"
      >
        <div className="text-center">
          <div className="font-heading text-2xl md:text-3xl font-bold text-white">15+</div>
          <div className="text-[10px] md:text-xs text-white/60 mt-0.5">Years Experience</div>
        </div>
        <div className="w-px h-10 bg-white/20" />
        <div className="text-center">
          <div className="font-heading text-2xl md:text-3xl font-bold text-white">5K+</div>
          <div className="text-[10px] md:text-xs text-white/60 mt-0.5">Happy Customers</div>
        </div>
        <div className="w-px h-10 bg-white/20" />
        <div className="text-center">
          <div className="font-heading text-2xl md:text-3xl font-bold text-white">100%</div>
          <div className="text-[10px] md:text-xs text-white/60 mt-0.5">Genuine Products</div>
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
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 active:scale-95"
        >
          <Search size={16} /> Explore Products
        </a>
        <a
          href="https://wa.me/919893496163"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/30 px-8 py-3.5 text-base font-bold text-white hover:bg-white/10 transition-all active:scale-95"
        >
          <MessageCircle size={16} /> Chat on WhatsApp
        </a>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float text-white/50 hover:text-white transition-colors">
      <ChevronDown size={28} />
    </a>
  </section>
);

export default HeroSection;
