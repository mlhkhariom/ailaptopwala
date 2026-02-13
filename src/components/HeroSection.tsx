import logo from "@/assets/logo.png";
import { ChevronDown, Zap, ShieldCheck, BadgeCheck, MessageCircle, Search, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section
    className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    id="hero"
    style={{
      background: "linear-gradient(135deg, hsl(215 60% 12%) 0%, hsl(210 80% 18%) 40%, hsl(205 70% 22%) 70%, hsl(215 60% 10%) 100%)",
    }}
  >
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(210,100%,50%)]/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[hsl(200,100%,45%)]/8 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(210,100%,40%)]/5 blur-[150px]" />
    </div>

    {/* Grid pattern overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    <div className="relative z-10 container mx-auto px-5 text-center max-w-4xl pt-24 pb-12">
      {/* Logo with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative inline-block mb-6"
      >
        <div className="absolute inset-0 blur-2xl bg-[hsl(210,100%,50%)]/20 rounded-full scale-150" />
        <img
          src={logo}
          alt="AI Laptop Wala Logo"
          className="relative h-20 md:h-28 w-auto mx-auto drop-shadow-2xl"
        />
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-[hsl(210,100%,75%)] border border-[hsl(210,100%,50%)]/25 bg-[hsl(210,100%,50%)]/10 backdrop-blur-sm mb-7"
      >
        <Zap size={12} className="text-[hsl(45,100%,60%)]" /> Powered by Asati Infotech — Since 2017
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="font-heading text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.1] mb-5 tracking-tight"
      >
        <span className="text-white">Welcome to </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(210,100%,65%)] via-[hsl(195,100%,55%)] to-[hsl(180,100%,50%)]">
          AI Laptop Wala
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-base sm:text-lg md:text-xl text-[hsl(210,30%,75%)] font-medium mb-4 max-w-2xl mx-auto leading-relaxed"
      >
        India's Leading Destination for Premium Open-Box & AI-Integrated Laptops
      </motion.p>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-6"
      >
        {["MacBooks", "Gaming Laptops", "AI Workstations", "Refurbished Systems"].map((cat) => (
          <span
            key={cat}
            className="rounded-full px-3 py-1 text-[11px] md:text-xs font-medium text-[hsl(210,30%,70%)] border border-white/10 bg-white/5"
          >
            {cat}
          </span>
        ))}
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-[hsl(210,30%,70%)] mb-8 flex-wrap"
      >
        <span className="inline-flex items-center gap-1.5"><BadgeCheck size={15} className="text-[hsl(210,100%,65%)]" /> Best Prices</span>
        <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-[hsl(145,60%,50%)]" /> Genuine Products</span>
        <span className="inline-flex items-center gap-1.5"><BadgeCheck size={15} className="text-[hsl(210,100%,65%)]" /> Trusted Since 2017</span>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="grid grid-cols-2 gap-3 md:gap-4 max-w-xs mx-auto mb-9"
      >
        {[
          { num: "15+", label: "Years Experience" },
          { num: "100%", label: "Genuine Products" },
        ].map((s) => (
          <div
            key={s.num}
            className="rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 py-4 px-2 text-center"
          >
            <div className="font-heading text-xl md:text-2xl font-extrabold text-white mb-0.5">{s.num}</div>
            <div className="text-[9px] md:text-[11px] text-[hsl(210,20%,55%)] font-medium leading-tight">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <a
          href="#products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-base font-bold text-white transition-all active:scale-95 shadow-lg"
          style={{
            background: "linear-gradient(135deg, hsl(210 100% 50%), hsl(200 100% 45%))",
            boxShadow: "0 8px 32px hsl(210 100% 50% / 0.35)",
          }}
        >
          <Search size={16} /> Explore Products
        </a>
        <a
          href="https://wa.me/919893496163"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 px-8 py-3.5 text-base font-bold text-white hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
        >
          <MessageCircle size={16} /> Chat on WhatsApp
        </a>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <a
      href="#about"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float text-white/40 hover:text-white/80 transition-colors"
    >
      <ChevronDown size={28} />
    </a>
  </section>
);

export default HeroSection;
