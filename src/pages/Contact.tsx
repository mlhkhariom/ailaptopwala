import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, Navigation, Clock } from "lucide-react";

const Contact = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-16 md:py-20">
      <div className="container mx-auto px-5 text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl md:text-5xl font-black mb-4"
        >
          Get in <span className="text-primary">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-background/60 text-sm md:text-base"
        >
          Visit our store, call us, or send a WhatsApp message. We're here to help!
        </motion.p>
      </div>
    </section>

    <section className="py-12 md:py-16">
      <div className="container mx-auto px-5 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card-solid glow-cyan gradient-border p-5 md:p-8 rounded-2xl space-y-5"
          >
            <h3 className="font-heading text-lg font-bold flex items-center gap-2">
              <Phone className="text-primary" size={20} /> Contact Information
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:+919893496163"
                className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-xs font-semibold text-primary active:scale-95 transition-transform touch-card"
              >
                <Phone size={14} /> Call Now
              </a>
              <a
                href="https://wa.me/919893496163"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[hsl(142,70%,45%)]/10 border border-[hsl(142,70%,45%)]/20 px-4 py-3 text-xs font-semibold text-[hsl(142,70%,45%)] active:scale-95 transition-transform touch-card"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                <Phone size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Primary</p>
                  <a href="tel:+919893496163" className="text-sm font-semibold text-primary">+91 98934 96163</a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                <Phone size={15} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Inquiries (Nitin Asati)</p>
                  <a href="tel:+919303558009" className="text-sm font-medium text-foreground">+91 93035 58009</a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                <Mail size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:ailaptopwala@gmail.com" className="text-sm font-medium text-foreground block">ailaptopwala@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                <Clock size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Working Hours</p>
                  <p className="text-sm font-medium text-foreground">Mon-Sat: 10 AM – 8 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card-solid glow-cyan gradient-border p-5 md:p-8 rounded-2xl space-y-5"
          >
            <h3 className="font-heading text-lg font-bold flex items-center gap-2">
              <MapPin className="text-primary" size={20} /> Store Address
            </h3>
            <div className="p-4 rounded-xl bg-muted/50">
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
              href="https://maps.google.com/?q=AI+Laptop+Wala+Silver+Mall+Indore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors active:scale-95 touch-card"
            >
              <ExternalLink size={14} /> Open in Google Maps
            </a>

            <div className="rounded-xl overflow-hidden border border-border/50 glow-cyan">
              <iframe
                title="AI Laptop Wala – Indore"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d75.857!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAI+Laptop+Wala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="250"
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
  </div>
);

export default Contact;
