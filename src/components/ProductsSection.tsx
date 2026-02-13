import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { Apple, Gamepad2, RefreshCcw, Monitor, Briefcase, Bot, ArrowRight } from "lucide-react";
import macbookImg from "@/assets/macbook.jpg";
import gamingImg from "@/assets/gaming-laptop.jpg";
import businessImg from "@/assets/business-laptop.jpg";
import aiImg from "@/assets/ai-workstation.jpg";
import refurbishedLaptopImg from "@/assets/refurbished-laptop.jpg";
import refurbishedDesktopImg from "@/assets/refurbished-desktop.jpg";

const products = [
  { title: "Apple MacBooks", desc: "Premium open-box MacBooks at unbeatable pricing.", tag: "Best Seller", icon: Apple, img: macbookImg },
  { title: "Gaming Laptops", desc: "High-performance RTX powered gaming machines.", tag: "Popular", icon: Gamepad2, img: gamingImg },
  { title: "Refurbished Laptops", desc: "Certified like-new laptops at 40-60% off MRP.", tag: "Value Deal", icon: RefreshCcw, img: refurbishedLaptopImg },
  { title: "Refurbished Desktops", desc: "Powerful desktop systems for home & office use.", tag: "New", icon: Monitor, img: refurbishedDesktopImg },
  { title: "Business Laptops", desc: "Reliable systems for office & professionals.", tag: "", icon: Briefcase, img: businessImg },
  { title: "AI Workstations", desc: "Next-gen computing for creators & developers.", tag: "Premium", icon: Bot, img: aiImg },
];

const ProductsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="products" className="py-16 md:py-24">
      <div ref={ref} className="container mx-auto px-5">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
          Our <span className="gradient-text">Products</span>
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-3 max-w-md mx-auto">
          From premium MacBooks to certified refurbished systems — find your perfect machine.
        </p>
        <div className="section-divider mb-10 md:mb-12" />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
          {products.map((p, i) => (
            <motion.a
              key={p.title}
              href="https://wa.me/919893496163"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-card-solid glow-cyan-hover gradient-border rounded-2xl overflow-hidden group touch-card block"
            >
              <div className="relative h-28 sm:h-36 md:h-44 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                {p.tag && (
                  <span className="absolute top-2 right-2 text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="p-3 md:p-5">
                <h3 className="font-heading text-sm md:text-lg font-bold mb-1 leading-tight flex items-center gap-1.5">
                  <p.icon size={16} className="text-primary flex-shrink-0 md:w-5 md:h-5" />
                  {p.title}
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <span className="inline-flex items-center gap-1 mt-2 md:mt-3 text-[10px] md:text-xs font-semibold text-primary">
                  Enquire Now <ArrowRight size={10} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
