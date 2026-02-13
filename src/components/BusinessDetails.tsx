import { useInView } from "@/hooks/useInView";
import { Building2 } from "lucide-react";

const details = [
  { label: "Legal Name", value: "Asati Infotech" },
  { label: "Brand Name", value: "AI Laptop Wala" },
  { label: "Founder/Owner", value: "Bhagwan Das Asati" },
  { label: "CEO/Manager", value: "Nitin Asati" },
  { label: "GST Number", value: "23ATNPA4415H1Z2" },
  { label: "Established", value: "July 2017" },
];

const BusinessDetails = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-2xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          Business <span className="gradient-text">Details</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-10 rounded-full" />

        <div className="glass-card glow-cyan p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-primary" size={28} />
            <h3 className="font-heading text-xl font-semibold">Legal & Ownership</h3>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{d.label}</dt>
                <dd className="text-base font-medium text-foreground">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default BusinessDetails;
