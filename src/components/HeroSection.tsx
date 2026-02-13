import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
    id="hero"
  >
    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Premium laptop floating in futuristic space"
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
    </div>

    <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
      <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
        Welcome to{" "}
        <span className="gradient-text">AI Laptop Wala</span>
        <br />
        <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/90">
          India's Leading Destination for Premium Open-Box & AI-Integrated Laptops
        </span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground mb-4 font-body">
        High-Performance MacBooks • Gaming Laptops • AI Workstations
      </p>
      <p className="text-base text-muted-foreground mb-10">
        Best Prices. Genuine Products. Trusted Since 2017.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#products"
          className="rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors glow-cyan"
        >
          Explore Products
        </a>
        <a
          href="https://wa.me/919893496163"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-primary/50 px-8 py-3 text-base font-semibold text-primary hover:bg-primary/10 transition-colors"
        >
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
