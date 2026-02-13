import { ShieldCheck, IndianRupee, Cpu, CalendarCheck, Users, HeadphonesIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const features = [
  { icon: ShieldCheck, title: "100% Genuine Products", desc: "Every device is verified and comes with a quality guarantee." },
  { icon: IndianRupee, title: "Affordable Premium", desc: "Top-tier laptops at prices that redefine value for money." },
  { icon: Cpu, title: "AI-Integrated Systems", desc: "Future-ready machines with cutting-edge AI capabilities." },
  { icon: CalendarCheck, title: "Trusted Since 2017", desc: "Years of excellence serving thousands of happy customers." },
  { icon: Users, title: "Expert Consultation", desc: "Personalized guidance to find your perfect machine." },
  { icon: HeadphonesIcon, title: "After-Sales Support", desc: "Dedicated support long after your purchase." },
];

const WhyChooseUs = () => {
  const { ref, inView } = useInView();

  return (
    <section id="why-us" className="py-20 md:py-28 bg-secondary/30">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          Why Choose <span className="gradient-text">Us</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glass-card glow-cyan-hover p-6 rounded-xl text-center transition-all duration-500 hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                <f.icon size={28} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
