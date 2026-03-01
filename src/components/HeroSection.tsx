import logo from "@/assets/logo.jpeg";
import { ChevronDown, Zap, ShieldCheck, MessageCircle, Search, MapPin, Phone, Star, Truck, Monitor, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section
    className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    id="hero"
    style={{
      background: "linear-gradient(135deg, hsl(30 40% 8%) 0%, hsl(32 60% 14%) 40%, hsl(35 50% 18%) 70%, hsl(30 40% 6%) 100%)",
    }}
  >
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(32,100%,50%)]/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[hsl(45,100%,55%)]/8 blur-[100px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[hsl(32,100%,50%)]/5 blur-[150px]" />
    </div>

    {/* Grid pattern overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    <div className="relative z-10 container mx-auto px-5 text-center max-w-4xl pt-20 pb-10">
      {/* Logo with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative inline-block mb-5"
      >
        <div className="absolute inset-0 blur-3xl bg-[hsl(32,100%,50%)]/20 rounded-full scale-[2]" />
        <img
          src={logo}
          alt="AI Laptop Wala Logo"
          className="relative h-20 md:h-28 w-auto mx-auto drop-shadow-2xl rounded-xl"
        />
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-[hsl(32,100%,75%)] border border-[hsl(32,100%,50%)]/25 bg-[hsl(32,100%,50%)]/10 backdrop-blur-sm mb-6"
      >
        <Zap size={12} className="text-[hsl(45,100%,60%)]" /> Powered by Asati Infotech — Since 2011
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="font-heading text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.1] mb-4 tracking-tight"
      >
        <span className="text-white">Your Trusted </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(32,100%,55%)] via-[hsl(40,100%,55%)] to-[hsl(45,100%,50%)]">
          Laptop Partner
        </span>
        <br />
        <span className="text-white text-[1.5rem] sm:text-3xl md:text-4xl lg:text-[2.8rem]">in Indore</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm sm:text-base md:text-lg text-[hsl(35,20%,70%)] font-medium mb-5 max-w-xl mx-auto leading-relaxed"
      >
        Premium Open-Box MacBooks, Gaming Laptops, AI Workstations & Refurbished Systems at unbeatable prices.
      </motion.p>

      {/* Feature icons row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 max-w-lg sm:max-w-2xl mx-auto mb-7"
      >
        {[
          { icon: Monitor, label: "MacBooks" },
          { icon: Search, label: "Gaming" },
          { icon: Wrench, label: "Repairs" },
          { icon: Truck, label: "Home Service" },
          { icon: Star, label: "Refurbished" },
          { icon: ShieldCheck, label: "Genuine" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + i * 0.05 }}
            className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-colors"
          >
            <item.icon size={18} className="text-[hsl(32,100%,60%)]" />
            <span className="text-[9px] md:text-[10px] font-medium text-[hsl(35,15%,55%)]">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-4 md:gap-8 mb-7 py-4 px-5 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] max-w-md mx-auto"
      >
        {[
          { num: "15+", label: "Years" },
          { num: "5K+", label: "Customers" },
          { num: "100%", label: "Genuine" },
          { num: "4.8★", label: "Rating" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-3 md:gap-4">
            {i > 0 && <div className="w-px h-8 bg-white/10" />}
            <div className="text-center">
              <div className="font-heading text-lg md:text-xl font-extrabold text-white">{s.num}</div>
              <div className="text-[8px] md:text-[10px] text-[hsl(35,15%,45%)] font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6"
      >
        <a
          href="#products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-base font-bold text-white transition-all active:scale-95 shadow-lg"
          style={{
            background: "linear-gradient(135deg, hsl(32 100% 50%), hsl(40 100% 50%))",
            boxShadow: "0 8px 32px hsl(32 100% 50% / 0.35)",
          }}
        >
          <Search size={16} /> Explore Products
        </a>
        <a
          href="https://wa.me/919893496163"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[hsl(142,70%,45%)]/40 bg-[hsl(142,70%,45%)]/10 px-8 py-3.5 text-base font-bold text-[hsl(142,80%,60%)] hover:bg-[hsl(142,70%,45%)]/20 transition-all active:scale-95 backdrop-blur-sm"
        >
          <MessageCircle size={16} /> WhatsApp Us
        </a>
      </motion.div>

      {/* Location & Contact quick info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-[10px] md:text-xs text-[hsl(35,15%,50%)]"
      >
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={12} className="text-[hsl(32,100%,55%)]" /> Silver Mall, RNT Marg, Indore
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Phone size={12} className="text-[hsl(32,100%,55%)]" /> +91 98934 96163
        </span>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <a
      href="#about"
      className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-float text-white/30 hover:text-white/70 transition-colors"
    >
      <ChevronDown size={26} />
    </a>
  </section>
);

export default HeroSection;
