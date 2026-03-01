import { useInView } from "@/hooks/useInView";
import { useProducts, Product } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Apple, Gamepad2, RefreshCcw, Monitor, Briefcase, Bot, ArrowRight, MessageCircle, Loader2 } from "lucide-react";
import macbookImg from "@/assets/macbook.jpg";
import gamingImg from "@/assets/gaming-laptop.jpg";
import businessImg from "@/assets/business-laptop.jpg";
import aiImg from "@/assets/ai-workstation.jpg";
import refurbishedLaptopImg from "@/assets/refurbished-laptop.jpg";
import refurbishedDesktopImg from "@/assets/refurbished-desktop.jpg";

const categories = [
  { title: "Apple MacBooks", tag: "Best Seller", icon: Apple, img: macbookImg, brand: "Apple" },
  { title: "Gaming Laptops", tag: "Popular", icon: Gamepad2, img: gamingImg, brand: "" },
  { title: "Refurbished Laptops", tag: "Value Deal", icon: RefreshCcw, img: refurbishedLaptopImg, brand: "" },
  { title: "Refurbished Desktops", tag: "New", icon: Monitor, img: refurbishedDesktopImg, brand: "" },
  { title: "Business Laptops", tag: "", icon: Briefcase, img: businessImg, brand: "" },
  { title: "AI Workstations", tag: "Premium", icon: Bot, img: aiImg, brand: "" },
];

const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/products/laptops/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card-solid glow-cyan-hover gradient-border rounded-2xl overflow-hidden touch-card"
      >
        <div className="relative h-36 md:h-44 overflow-hidden bg-muted/30">
          {product.primaryImage ? (
            <img
              src={product.primaryImage}
              alt={`${product.brand} ${product.model}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Monitor size={40} className="text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
          {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
            <span className="absolute top-2 left-2 text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">
              Only {product.stockQuantity} left
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-2 right-2 text-[9px] md:text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="p-3 md:p-4">
          <h3 className="font-heading text-sm md:text-base font-bold mb-1 leading-tight text-foreground truncate">
            {product.brand} {product.model}
          </h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {product.processor && (
              <span className="text-[9px] md:text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{product.processor}</span>
            )}
            {product.ram > 0 && (
              <span className="text-[9px] md:text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{product.ram}GB RAM</span>
            )}
            {product.storage > 0 && (
              <span className="text-[9px] md:text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{product.storage}GB {product.storageType || 'SSD'}</span>
            )}
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-heading text-base md:text-lg font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
            {discount > 0 && (
              <span className="text-[10px] md:text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <span onClick={(e) => e.stopPropagation()} className="block">
            <a
              href={`https://wa.me/919893496163?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(product.brand + ' ' + product.model)}%20(₹${product.price})`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-[hsl(142,70%,45%)]/10 border border-[hsl(142,70%,45%)]/20 py-2 text-[10px] md:text-xs font-semibold text-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,45%)]/20 transition-colors active:scale-95"
            >
              <MessageCircle size={12} /> Buy on WhatsApp
            </a>
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

const ProductsSection = () => {
  const { ref, inView } = useInView();
  const { products, loading, error } = useProducts("laptops", 12);

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

        {/* Categories */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 max-w-3xl mx-auto mb-10">
          {categories.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer touch-card"
            >
              <c.icon size={18} className="text-primary" />
              <span className="text-[9px] md:text-[10px] font-medium text-muted-foreground text-center leading-tight">{c.title.split(' ').slice(-1)}</span>
            </motion.div>
          ))}
        </div>

        {/* Live Products from DB */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : error ? (
          // Fallback to category cards
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
            {categories.map((p, i) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  {p.tag && (
                    <span className="absolute top-2 right-2 text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="font-heading text-sm md:text-lg font-bold mb-1 leading-tight flex items-center gap-1.5 text-foreground">
                    <p.icon size={16} className="text-primary flex-shrink-0 md:w-5 md:h-5" />
                    {p.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 mt-2 md:mt-3 text-[10px] md:text-xs font-semibold text-primary">
                    Enquire Now <ArrowRight size={10} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 max-w-6xl mx-auto">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No products available right now.</p>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
