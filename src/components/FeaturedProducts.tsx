import { useInView } from "@/hooks/useInView";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Monitor, MessageCircle, Loader2 } from "lucide-react";

const FeaturedProducts = () => {
  const { ref, inView } = useInView();
  const { products, loading } = useProducts("laptops", 6);

  return (
    <section id="products" className="py-16 md:py-24">
      <div ref={ref} className="container mx-auto px-5">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-3">
          Featured <span className="gradient-text">Products</span>
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-3 max-w-md mx-auto">
          Top picks from our collection — premium laptops at unbeatable prices.
        </p>
        <div className="section-divider mb-10 md:mb-12" />

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 max-w-5xl mx-auto">
            {products.slice(0, 6).map((product, i) => {
              const discount = product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card-solid glow-cyan-hover gradient-border rounded-2xl overflow-hidden touch-card group"
                >
                  <div className="relative h-32 sm:h-40 overflow-hidden bg-muted/30">
                    {product.primaryImage ? (
                      <img src={product.primaryImage} alt={`${product.brand} ${product.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Monitor size={32} className="text-muted-foreground/30" /></div>
                    )}
                    {discount > 0 && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{discount}% OFF</span>
                    )}
                    {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                      <span className="absolute top-2 left-2 text-[9px] font-bold bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">Only {product.stockQuantity} left</span>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-heading text-xs md:text-sm font-bold mb-1 truncate">{product.brand} {product.model}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.ram > 0 && <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{product.ram}GB</span>}
                      {product.storage > 0 && <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{product.storage}GB</span>}
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-heading text-sm md:text-base font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                      {discount > 0 && <span className="text-[9px] text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>}
                    </div>
                    <a
                      href={`https://wa.me/919893496163?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(product.brand + ' ' + product.model)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full rounded-lg bg-[hsl(142,70%,45%)]/10 border border-[hsl(142,70%,45%)]/20 py-1.5 text-[10px] font-semibold text-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,45%)]/20 transition-colors"
                    >
                      <MessageCircle size={10} /> WhatsApp
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
