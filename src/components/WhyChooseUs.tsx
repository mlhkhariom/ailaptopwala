import { ShieldCheck, IndianRupee, Cpu, CalendarCheck, Users, HeadphonesIcon, Wrench, RefreshCcw } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const features = [
  { icon: ShieldCheck, title: "100% Genuine Products", desc: "Every device is verified and comes with a quality guarantee." },
  { icon: IndianRupee, title: "Affordable Premium", desc: "Top-tier laptops at prices that redefine value for money." },
  { icon: Cpu, title: "AI-Integrated Systems", desc: "Future-ready machines with cutting-edge AI capabilities." },
  { icon: RefreshCcw, title: "Certified Refurbished", desc: "Like-new refurbished laptops & desktops at best prices." },
  { icon: Wrench, title: "Home Repair Service", desc: "Doorstep laptop & desktop repair service in Indore." },
  { icon: CalendarCheck, title: "Trusted Since 2017", desc: "Years of excellence serving thousands of customers." },
  { icon: Users, title: "Expert Consultation", desc: "Personalized guidance to find your perfect machine." },
  { icon: HeadphonesIcon, title: "After-Sales Support", desc: "Dedicated support long after your purchase." },
];

const WhyChooseUs = () => {
  const { ref, inView } = useInView();

  return (
    <section id="why-us" className="py-16 md:py-24 bg-secondary/20">
      <div ref={ref} className="container mx-auto px-5">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
          Why Choose <span className="gradient-text">Us</span>
        </h2>
        <div className="section-divider mb-10 md:mb-12" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glass-card-solid glow-cyan-hover gradient-border p-4 md:p-6 rounded-2xl text-center transition-all duration-500 hover:-translate-y-1 touch-card ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="inline-flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary mb-3">
                <f.icon size={22} className="md:w-7 md:h-7" />
              </div>
              <h3 className="font-heading text-xs md:text-sm font-bold mb-1.5 leading-tight">{f.title}</h3>
              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed hidden sm:block">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
