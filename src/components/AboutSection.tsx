import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { Award, MapPin, Calendar, CheckCircle } from "lucide-react";

const highlights = [
  { icon: Award, text: "15+ Years Industry Expertise" },
  { icon: MapPin, text: "Silver Mall, Indore" },
  { icon: Calendar, text: "Established 2017" },
];

const AboutSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-16 md:py-24">
      <div ref={ref} className="container mx-auto px-5 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
            About <span className="gradient-text">AI Laptop Wala</span>
          </h2>
          <div className="section-divider mb-8 md:mb-10" />
        </motion.div>

        {/* Highlight pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          {highlights.map((h) => (
            <div
              key={h.text}
              className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/40 px-4 py-2 text-xs font-medium text-muted-foreground"
            >
              <h.icon size={14} className="text-primary" />
              {h.text}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card-solid glow-cyan p-6 md:p-10 rounded-2xl gradient-border"
        >
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
                  <CheckCircle size={14} className="text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
