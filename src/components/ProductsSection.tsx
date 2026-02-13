import { useInView } from "@/hooks/useInView";
import macbookImg from "@/assets/macbook.jpg";
import gamingImg from "@/assets/gaming-laptop.jpg";
import businessImg from "@/assets/business-laptop.jpg";
import aiImg from "@/assets/ai-workstation.jpg";

const products = [
  { title: "Apple MacBooks", desc: "Premium open-box MacBooks at unbeatable pricing.", emoji: "💻", img: macbookImg },
  { title: "Gaming Laptops", desc: "High-performance RTX powered machines.", emoji: "🎮", img: gamingImg },
  { title: "Business Laptops", desc: "Reliable systems for office & professionals.", emoji: "🏢", img: businessImg },
  { title: "AI Workstations", desc: "Next-gen computing for creators & developers.", emoji: "🤖", img: aiImg },
];

const ProductsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="products" className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          Our <span className="gradient-text">Products</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {products.map((p, i) => (
            <div
              key={p.title}
              className={`glass-card glow-cyan-hover rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 group ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-2">
                  {p.emoji} {p.title}
                </h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
