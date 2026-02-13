import { useInView } from "@/hooks/useInView";

const MapSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-16 bg-secondary/30">
      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-5xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="rounded-2xl overflow-hidden border border-border/50 glow-cyan">
          <iframe
            title="AI Laptop Wala – Silver Mall, Indore"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123456789!2d75.8571!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b0bffffff%3A0xsilvermallindore!2sSilver+Mall%2C+RNT+Marg%2C+Indore!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
