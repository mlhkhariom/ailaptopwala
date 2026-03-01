import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { Building2, Award, User, Hash, Calendar, Briefcase } from "lucide-react";

const details = [
  { icon: Building2, label: "Legal Name", value: "Asati Infotech" },
  { icon: Award, label: "Brand Name", value: "AI Laptop Wala" },
  { icon: User, label: "Founder/Owner", value: "Bhagwan Das Asati" },
  { icon: Briefcase, label: "CEO & Manager", value: "Nitin Asati" },
  { icon: Hash, label: "GST Number", value: "23ATNPA4415H1Z2" },
  { icon: Calendar, label: "Established", value: "2011" },
];

const BusinessDetails = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="container mx-auto px-5 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
            Business <span className="gradient-text">Details</span>
          </h2>
          <div className="section-divider mb-8 md:mb-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card-solid glow-cyan gradient-border p-5 md:p-8 rounded-2xl"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="text-center touch-card p-2 rounded-xl"
              >
                <d.icon size={20} className="text-primary mx-auto mb-2" />
                <dt className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">{d.label}</dt>
                <dd className="text-xs md:text-sm font-semibold text-foreground">{d.value}</dd>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessDetails;
