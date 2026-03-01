import { motion } from "framer-motion";
import { Award, MapPin, Calendar, CheckCircle, Building2, User, Briefcase, Hash, Users, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import SEOHead from "@/components/SEOHead";

const highlights = [
  { icon: Award, text: "15+ Years Industry Expertise" },
  { icon: MapPin, text: "Silver Mall, Indore" },
  { icon: Calendar, text: "Established 2017" },
  { icon: Users, text: "5000+ Happy Customers" },
];

const details = [
  { icon: Building2, label: "Legal Name", value: "Asati Infotech" },
  { icon: Award, label: "Brand Name", value: "AI Laptop Wala" },
  { icon: User, label: "Founder/Owner", value: "Bhagwan Das Asati" },
  { icon: Briefcase, label: "CEO/Manager", value: "Nitin Asati" },
  { icon: Hash, label: "GST Number", value: "23ATNPA4415H1Z2" },
  { icon: Calendar, label: "Established", value: "July 2017" },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About AI Laptop Wala",
  "description": "About AI Laptop Wala (Asati Infotech) - Best laptop shop in Indore, Madhya Pradesh. Founded by Bhagwan Das Asati in 2017.",
  "mainEntity": {
    "@type": "ComputerStore",
    "name": "AI Laptop Wala",
    "legalName": "Asati Infotech",
    "url": "https://ailaptopwala.com",
    "telephone": "+919893496163",
    "foundingDate": "2017-07",
    "founder": { "@type": "Person", "name": "Bhagwan Das Asati" },
    "employee": { "@type": "Person", "name": "Nitin Asati", "jobTitle": "CEO/Manager" },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "LG-21, B-Block, Silver Mall, RNT Marg",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452001",
      "addressCountry": "IN"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": "22.7196", "longitude": "75.857" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "500", "bestRating": "5" }
  }
};

const About = () => (
  <div className="pt-20">
    <SEOHead
      title="About AI Laptop Wala Indore – Asati Infotech | Best Laptop Shop Since 2017"
      description="Learn about AI Laptop Wala (Asati Infotech) – Indore's trusted laptop shop since 2017. Founded by Bhagwan Das Asati, managed by Nitin Asati. 5000+ happy customers. Premium MacBooks, gaming laptops, refurbished systems. Silver Mall, RNT Marg, Indore, Madhya Pradesh."
      canonical="/about"
      keywords="AI Laptop Wala about, Asati Infotech, Bhagwan Das Asati, Nitin Asati, laptop shop Indore, AI Laptop Wala Indore, Silver Mall laptop shop, computer shop Indore, laptop dealer Indore history, best laptop shop Madhya Pradesh"
      jsonLd={aboutSchema}
    />

    {/* Hero */}
    <section className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-16 md:py-24">
      <div className="container mx-auto px-5 text-center max-w-3xl">
        <motion.img initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} src={logo} alt="AI Laptop Wala Logo - Best Laptop Shop Indore" className="h-20 md:h-24 w-auto mx-auto mb-6 rounded-xl" />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl md:text-5xl font-black mb-4">
          About <span className="text-primary">AI Laptop Wala</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-background/60 text-sm md:text-base">
          Powered by Asati Infotech — Your trusted tech partner since 2017
        </motion.p>
      </div>
    </section>

    {/* Highlight badges */}
    <section className="py-8">
      <div className="container mx-auto px-5">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {highlights.map((h, i) => (
            <motion.div key={h.text} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
              <h.icon size={14} className="text-primary" />{h.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Story */}
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-5 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card-solid glow-cyan gradient-border p-6 md:p-10 rounded-2xl">
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-5">
            Founded by <strong className="text-foreground">Mr. Bhagwan Das Asati</strong> in 2017, <strong className="text-foreground">Asati Infotech</strong> has become a household name in Indore's tech market under the brand <span className="text-primary font-semibold">AI Laptop Wala</span>.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-5">
            We specialize in high-performance computing, bringing you the latest MacBooks, Gaming Laptops, Refurbished Systems, and AI-powered workstations at prices that redefine "Affordability".
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            With over <strong className="text-foreground">15+ years</strong> of industry expertise at Silver Mall, we don't just sell machines — we provide guaranteed quality and 100% genuine tech solutions to thousands of happy customers across India.
          </p>
          <div className="mt-6 pt-6 border-t border-border/50">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-foreground">
              {["Premium Open-Box Laptops", "Apple MacBooks", "High-End Gaming Laptops", "AI-Integrated Workstations", "Refurbished Laptops & Desktops", "Home Repair Service in Indore", "Business Computing Solutions", "After-Sales Support"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 py-1"><CheckCircle size={14} className="text-primary flex-shrink-0" /><span className="text-xs md:text-sm">{item}</span></li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Business Details */}
    <section className="py-12 md:py-16 section-alt">
      <div className="container mx-auto px-5 max-w-3xl">
        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-center mb-3">Business <span className="gradient-text">Details</span></h2>
        <div className="section-divider mb-8" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card-solid glow-cyan gradient-border p-5 md:p-8 rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
            {details.map((d, i) => (
              <motion.div key={d.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-center p-2 rounded-xl">
                <d.icon size={20} className="text-primary mx-auto mb-2" />
                <dt className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">{d.label}</dt>
                <dd className="text-xs md:text-sm font-semibold text-foreground">{d.value}</dd>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default About;
