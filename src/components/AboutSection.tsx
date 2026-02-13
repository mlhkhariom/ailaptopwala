import { useInView } from "@/hooks/useInView";
import { Award, MapPin, Calendar } from "lucide-react";

const highlights = [
  { icon: Award, text: "15+ Years Industry Expertise" },
  { icon: MapPin, text: "Silver Mall, Indore" },
  { icon: Calendar, text: "Established 2017" },
];

const AboutSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-16 md:py-24">
      <div
        ref={ref}
        className={`container mx-auto px-5 max-w-4xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
          About <span className="gradient-text">AI Laptop Wala</span>
        </h2>
        <div className="section-divider mb-8 md:mb-10" />

        {/* Highlight pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {highlights.map((h) => (
            <div
              key={h.text}
              className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/40 px-4 py-2 text-xs font-medium text-muted-foreground"
            >
              <h.icon size={14} className="text-primary" />
              {h.text}
            </div>
          ))}
        </div>

        <div className="glass-card-solid glow-cyan p-6 md:p-10 rounded-2xl gradient-border">
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-5">
            Founded by <strong className="text-foreground">Mr. Bhagwan Das Asati</strong> in 2017,{" "}
            <strong className="text-foreground">Asati Infotech</strong> has become a household name
            in Indore's tech market under the brand{" "}
            <span className="text-primary font-semibold">AI Laptop Wala</span>.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-5">
            We specialize in high-performance computing, bringing you the latest MacBooks, Gaming
            Laptops, Refurbished Systems, and AI-powered workstations at prices that redefine "Affordability".
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            With over <strong className="text-foreground">15+ years</strong> of industry expertise
            at Silver Mall, we don't just sell machines — we provide guaranteed quality and 100%
            genuine tech solutions to thousands of happy customers across India.
          </p>

          <div className="mt-6 pt-6 border-t border-border/30">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-foreground">
              {[
                "Premium Open-Box Laptops",
                "Apple MacBooks",
                "High-End Gaming Laptops",
                "AI-Integrated Workstations",
                "Refurbished Laptops & Desktops",
                "Home Repair Service in Indore",
                "Business Computing Solutions",
                "After-Sales Support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 py-1">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-xs md:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
