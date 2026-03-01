import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Monitor, Battery, Keyboard, Cpu, Sparkles, HardDrive,
  Phone, MessageCircle, CheckCircle, ShieldCheck, Wifi, Gauge
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const services = [
  { icon: Monitor, title: "Screen Replacement", desc: "Cracked or flickering screen? We replace with original quality panels.", price: "₹3,499" },
  { icon: Battery, title: "Battery Replacement", desc: "Laptop draining fast? Get a new battery with 6-month warranty.", price: "₹1,999" },
  { icon: Keyboard, title: "Keyboard Repair", desc: "Keys not working or sticky? We fix or replace full keyboard modules.", price: "₹1,200" },
  { icon: Cpu, title: "Motherboard Repair", desc: "Complex chip-level repairs for dead laptops or liquid damage.", price: "₹2,499" },
  { icon: Sparkles, title: "General Service", desc: "Deep cleaning, thermal paste replacement, and fan optimization.", price: "₹499" },
  { icon: HardDrive, title: "SSD/RAM Upgrade", desc: "Boost performance with storage and memory upgrades.", price: "On Quote" },
];

const qualityChecks = [
  { icon: Monitor, title: "Screen & Display", desc: "No dead pixels, scratches, or color bleeding." },
  { icon: Battery, title: "Battery Health", desc: "Minimum 80% capacity guaranteed." },
  { icon: Gauge, title: "Performance Stress", desc: "CPU & GPU stress tested for stability." },
  { icon: Wifi, title: "Connectivity", desc: "All ports, Wi-Fi, and Bluetooth verified." },
];

const repairServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Computer Repair Service",
  "name": "Home Laptop & Desktop Repair Service Indore",
  "description": "Doorstep laptop and desktop repair service in Indore, Madhya Pradesh. Screen replacement, keyboard repair, battery replacement, SSD/RAM upgrade, motherboard repair, OS installation, virus removal. No Fix No Charge policy.",
  "provider": {
    "@type": "ComputerStore",
    "name": "AI Laptop Wala",
    "telephone": "+919893496163",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "LG-21, B-Block, Silver Mall, RNT Marg",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452001",
      "addressCountry": "IN"
    }
  },
  "areaServed": [
    { "@type": "City", "name": "Indore" },
    { "@type": "State", "name": "Madhya Pradesh" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Repair Services",
    "itemListElement": services.map(s => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": s.title,
        "description": s.desc
      }
    }))
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceType": "Home Service",
    "servicePhone": "+919893496163",
    "serviceUrl": "https://wa.me/919893496163"
  }
};

const repairFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the home visit charge for laptop repair in Indore?",
      "acceptedAnswer": { "@type": "Answer", "text": "Home visit charges start from ₹199 + tax. This covers engineer visit and checkup. Parts are charged separately if needed." }
    },
    {
      "@type": "Question",
      "name": "Do you provide No Fix No Charge service?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, AI Laptop Wala follows a No Fix No Charge policy. If we cannot fix your laptop, you don't pay anything." }
    },
    {
      "@type": "Question",
      "name": "What types of laptop repair services are available in Indore?",
      "acceptedAnswer": { "@type": "Answer", "text": "We offer screen replacement, battery replacement, keyboard repair, motherboard repair, SSD/RAM upgrade, OS installation, virus removal, data recovery, and general servicing in Indore." }
    },
    {
      "@type": "Question",
      "name": "How to book home laptop repair service in Indore?",
      "acceptedAnswer": { "@type": "Answer", "text": "Call or WhatsApp at +91 98934 96163. Our expert engineer will visit your home or office for laptop/desktop repair in Indore." }
    }
  ]
};

const Repair = () => (
  <div className="pt-20">
    <SEOHead
      title="Home Laptop Repair Service Indore – Screen, Battery, Keyboard, Motherboard Repair"
      description="Best home laptop repair service in Indore by AI Laptop Wala. Doorstep screen replacement, battery replacement, keyboard repair, SSD/RAM upgrade, motherboard repair. No Fix No Charge. Call +91 98934 96163. Serving all Indore, Madhya Pradesh."
      canonical="/repair"
      keywords="laptop repair Indore, home laptop repair Indore, laptop service center Indore, laptop screen repair Indore, laptop battery replacement Indore, keyboard repair Indore, motherboard repair Indore, SSD upgrade Indore, RAM upgrade Indore, desktop repair Indore, computer repair Indore, laptop repair near me, laptop repair Madhya Pradesh, doorstep laptop repair Indore, laptop service Indore, laptop fix Indore"
      jsonLd={[repairServiceSchema, repairFaqSchema]}
    />

    {/* Hero */}
    <section className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-16 md:py-24">
      <div className="container mx-auto px-5 text-center max-w-3xl">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl md:text-5xl font-black mb-4">
          Expert <span className="text-primary">Repair</span> Services
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-background/60 text-sm md:text-base mb-2">
          Laptop Ka One Stop Solution — Doorstep service in Indore
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full text-xs font-semibold mt-4">
          <Phone size={12} /> Home Service Available — Visit Charges: ₹199+
        </motion.div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-5 max-w-5xl">
        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-center mb-3">Our <span className="gradient-text">Services</span></h2>
        <div className="section-divider mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card-solid gradient-border p-5 md:p-6 rounded-2xl hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"><s.icon size={22} className="text-primary" /></div>
              <h3 className="font-heading text-base font-bold mb-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
              <p className="text-sm font-bold text-primary mb-4">Starting from {s.price}</p>
              <a href={`https://wa.me/919893496163?text=Hi%2C%20I%20need%20${encodeURIComponent(s.title)}%20service`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
                <MessageCircle size={12} /> Book Service
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Our Promise */}
    <section className="py-16 md:py-20 section-alt">
      <div className="container mx-auto px-5 max-w-4xl">
        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-center mb-3">हमारा <span className="gradient-text">वादा</span></h2>
        <p className="text-sm text-muted-foreground text-center mb-8">Our Promise to You</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {["⚡ Fast Service", "✅ Genuine Parts", "💰 साफ़ कीमतें", "🔧 No Fix – No Charge", "👨‍🔧 Trusted Engineers"].map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card-solid gradient-border p-4 rounded-xl text-center">
              <p className="text-xs md:text-sm font-semibold">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* 40-Step Quality Check */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-5 max-w-4xl">
        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-center mb-3">Our 40-Step <span className="gradient-text">Quality Check</span></h2>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">We don't just sell used laptops; we sell certified machines. Every device goes through a rigorous testing process.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {qualityChecks.map((q, i) => (
            <motion.div key={q.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card-solid gradient-border p-5 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3"><q.icon size={22} className="text-primary" /></div>
              <h3 className="font-heading text-sm font-bold mb-1">{q.title}</h3>
              <p className="text-[10px] md:text-xs text-muted-foreground">{q.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-12 md:py-16 bg-primary/5">
      <div className="container mx-auto px-5 text-center max-w-2xl">
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">Need a Repair?</h2>
        <p className="text-sm text-muted-foreground mb-6">Call us or WhatsApp for instant booking. Our engineer will visit your home/office.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="tel:+919893496163" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"><Phone size={16} /> Call Now</a>
          <a href="https://wa.me/919893496163?text=Hi%2C%20I%20need%20repair%20service" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[hsl(142,70%,45%)] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[hsl(142,70%,40%)] transition-colors"><MessageCircle size={16} /> WhatsApp Us</a>
        </div>
      </div>
    </section>
  </div>
);

export default Repair;
