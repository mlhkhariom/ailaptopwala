import { useInView } from "@/hooks/useInView";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className="py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-5xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="glass-card glow-cyan p-8 rounded-2xl space-y-6">
            <h3 className="font-heading text-xl font-semibold flex items-center gap-2">
              <Phone className="text-primary" size={22} /> Contact Information
            </h3>
            <div className="space-y-4 text-sm">
              <p>
                <span className="text-muted-foreground">Call / WhatsApp:</span>
                <br />
                <a href="tel:+919893496163" className="text-primary font-medium hover:underline">
                  +91 98934 96163
                </a>
              </p>
              <p>
                <span className="text-muted-foreground">Inquiries (Nitin Asati):</span>
                <br />
                <a href="tel:+919303558009" className="text-foreground font-medium hover:underline">
                  +91 93035 58009
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="text-primary mt-0.5" size={16} />
                <span>
                  <a href="mailto:contact@ailaptopwala.com" className="text-foreground hover:text-primary transition-colors">
                    contact@ailaptopwala.com
                  </a>
                  <br />
                  <a href="mailto:asatiinfotech@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    asatiinfotech@gmail.com
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="glass-card glow-cyan p-8 rounded-2xl space-y-6">
            <h3 className="font-heading text-xl font-semibold flex items-center gap-2">
              <MapPin className="text-primary" size={22} /> Store Address
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">AI Laptop Wala (Asati Infotech)</strong>
              <br />
              LG-21, B-Block, Silver Mall
              <br />
              RNT Marg, Indore
              <br />
              Madhya Pradesh – 452001
              <br />
              <span className="text-primary">Near Hotel Shrimaya</span>
            </p>
            <a
              href="https://maps.google.com/?q=Silver+Mall+RNT+Marg+Indore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <MapPin size={14} /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
