import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown } from "lucide-react";

const HeroSection = () => (
  <section
    className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    id="hero"
  >
    {/* Background */}
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Premium laptop floating in futuristic space"
        className="w-full h-full object-cover scale-105"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
    </div>

    <div className="relative z-10 container mx-auto px-5 text-center max-w-4xl pt-20 pb-10">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 shimmer-badge rounded-full px-4 py-1.5 text-xs font-medium text-primary border border-primary/20 mb-6 md:mb-8">
        ⚡ Powered by Asati Infotech — Since 2017
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 tracking-tight">
        Welcome to{" "}
        <span className="gradient-text">AI Laptop Wala</span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-medium mb-3 max-w-2xl mx-auto leading-relaxed">
        India's Leading Destination for Premium Open-Box & AI-Integrated Laptops
      </p>

      <p className="text-sm md:text-base text-muted-foreground mb-4">
        MacBooks • Gaming Laptops • AI Workstations • Refurbished Systems
      </p>

      <p className="text-xs md:text-sm text-muted-foreground mb-8 md:mb-10">
        ✅ Best Prices &nbsp; ✅ Genuine Products &nbsp; ✅ Trusted Since 2017
      </p>

      {/* Stats row */}
      <div className="flex items-center justify-center gap-6 md:gap-12 mb-8 md:mb-10">
        <div className="stat-item">
          <div className="stat-number">15+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="w-px h-10 bg-border/50" />
        <div className="stat-item">
          <div className="stat-number">5K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="w-px h-10 bg-border/50" />
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">Genuine Products</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <a
          href="#products"
          className="w-full sm:w-auto rounded-2xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground hover:bg-primary/90 transition-all glow-cyan active:scale-95"
        >
          Explore Products
        </a>
        <a
          href="https://wa.me/919893496163"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto rounded-2xl border-2 border-primary/40 px-8 py-3.5 text-base font-bold text-primary hover:bg-primary/10 transition-all active:scale-95"
        >
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>

    {/* Scroll indicator */}
    <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float text-muted-foreground hover:text-primary transition-colors">
      <ChevronDown size={28} />
    </a>
  </section>
);

export default HeroSection;
