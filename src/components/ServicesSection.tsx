import { useInView } from "@/hooks/useInView";
import { Wrench, Phone, Clock, MapPin, CheckCircle } from "lucide-react";
import homeRepairImg from "@/assets/home-repair.jpg";

const services = [
  "Laptop Screen Replacement",
  "Keyboard & Trackpad Repair",
  "Battery Replacement",
  "SSD/RAM Upgrade",
  "OS Installation & Recovery",
  "Virus Removal & Cleanup",
  "Desktop Assembly & Repair",
  "Data Recovery Service",
];

const ServicesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/20">
      <div
        ref={ref}
        className={`container mx-auto px-5 max-w-5xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
          Home Service <span className="gradient-text">Repair</span>
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-3 max-w-md mx-auto">
          Doorstep laptop & desktop repair service in Indore — fast, reliable, and affordable.
        </p>
        <div className="section-divider mb-10 md:mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {/* Image side */}
          <div className="glass-card-solid gradient-border rounded-2xl overflow-hidden">
            <img
              src={homeRepairImg}
              alt="Home repair service technician"
              className="w-full h-48 md:h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Info side */}
          <div className="space-y-5">
            <div className="glass-card-solid glow-cyan gradient-border p-5 md:p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wrench className="text-primary" size={20} />
                </div>
                <h3 className="font-heading text-base md:text-lg font-bold">Our Repair Services</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <CheckCircle size={14} className="text-primary flex-shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass-card-solid gradient-border p-3 md:p-4 rounded-xl text-center touch-card">
                <Phone className="text-primary mx-auto mb-1.5" size={18} />
                <p className="text-[10px] md:text-xs font-medium text-foreground">Call for Booking</p>
              </div>
              <div className="glass-card-solid gradient-border p-3 md:p-4 rounded-xl text-center touch-card">
                <Clock className="text-primary mx-auto mb-1.5" size={18} />
                <p className="text-[10px] md:text-xs font-medium text-foreground">Same Day Service</p>
              </div>
              <div className="glass-card-solid gradient-border p-3 md:p-4 rounded-xl text-center touch-card">
                <MapPin className="text-primary mx-auto mb-1.5" size={18} />
                <p className="text-[10px] md:text-xs font-medium text-foreground">All Over Indore</p>
              </div>
            </div>

            <a
              href="https://wa.me/919893496163?text=Hi%2C%20I%20need%20home%20repair%20service%20in%20Indore"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl bg-primary px-6 py-3.5 text-center text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all glow-cyan active:scale-95"
            >
              📞 Book Home Repair Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
