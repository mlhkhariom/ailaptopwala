import { useInView } from "@/hooks/useInView";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/20">
      <div
        ref={ref}
        className="container mx-auto px-5 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-divider mb-10 md:mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-card-solid glow-cyan gradient-border p-5 md:p-8 rounded-2xl space-y-5"
          >
            <h3 className="font-heading text-base md:text-lg font-bold flex items-center gap-2">
              <Phone className="text-primary" size={20} /> Contact Information
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:+919893496163"
                className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3 py-3 text-xs font-semibold text-primary active:scale-95 transition-transform touch-card"
              >
                <Phone size={14} /> Call Now
              </a>
              <a
                href="https://wa.me/919893496163"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[hsl(142,70%,45%)]/10 border border-[hsl(142,70%,45%)]/20 px-3 py-3 text-xs font-semibold text-[hsl(142,70%,45%)] active:scale-95 transition-transform touch-card"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30">
                <Phone size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Call / WhatsApp</p>
                  <a href="tel:+919893496163" className="text-sm font-semibold text-primary">
                    +91 98934 96163
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30">
                <Phone size={15} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Inquiries (Nitin Asati)</p>
                  <a href="tel:+919303558009" className="text-sm font-medium text-foreground">
                    +91 93035 58009
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30">
                <Mail size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:contact@ailaptopwala.com" className="text-sm font-medium text-foreground block">
                    contact@ailaptopwala.com
                  </a>
                  <a href="mailto:asatiinfotech@gmail.com" className="text-xs text-muted-foreground">
                    asatiinfotech@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass-card-solid glow-cyan gradient-border p-5 md:p-8 rounded-2xl space-y-5"
          >
            <h3 className="font-heading text-base md:text-lg font-bold flex items-center gap-2">
              <MapPin className="text-primary" size={20} /> Store Address
            </h3>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-foreground font-semibold mb-1">AI Laptop Wala (Asati Infotech)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                LG-21, B-Block, Silver Mall
                <br />
                RNT Marg, Indore
                <br />
                Madhya Pradesh – 452001
              </p>
              <p className="flex items-center gap-1.5 text-xs text-primary font-medium mt-2">
                <Navigation size={12} /> Near Hotel Shrimaya
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=AI+Laptop+Wala+Indore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors active:scale-95 touch-card"
            >
              <ExternalLink size={14} /> Open in Google Maps
            </a>

            <div className="rounded-xl overflow-hidden border border-border/30 glow-cyan">
              <iframe
                title="AI Laptop Wala – Indore"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d75.857!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAI+Laptop+Wala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
