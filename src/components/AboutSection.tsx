import { useInView } from "@/hooks/useInView";

const AboutSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-4xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          About <span className="gradient-text">AI Laptop Wala</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-10 rounded-full" />

        <div className="glass-card glow-cyan p-8 md:p-12 rounded-2xl">
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            Founded by <strong className="text-foreground">Mr. Bhagwan Das Asati</strong> in 2017,{" "}
            <strong className="text-foreground">Asati Infotech</strong> has become a household name
            in Indore's tech market under the brand{" "}
            <span className="text-primary font-semibold">AI Laptop Wala</span>.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
            We specialize in high-performance computing, bringing you the latest MacBooks, Gaming
            Laptops, and AI-powered workstations at prices that redefine "Affordability".
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            With over <strong className="text-foreground">15+ years</strong> of industry expertise
            at Silver Mall, we don't just sell machines — we provide guaranteed quality and 100%
            genuine tech solutions to thousands of happy customers across India.
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground">
            {[
              "Premium Open-Box Laptops",
              "Apple MacBooks",
              "High-End Gaming Laptops",
              "AI-Integrated Workstations",
              "Business & Professional Computing",
              "After-Sales Support",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-primary">✦</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
