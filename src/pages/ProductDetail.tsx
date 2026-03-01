import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, MessageCircle, Monitor, Loader2, ShieldCheck, Cpu, HardDrive, MemoryStick,
  MonitorSmartphone, Palette, Calendar, Package, Tag, Star
} from "lucide-react";
import { Product } from "@/hooks/useProducts";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Category = "laptops" | "desktops" | "accessories";

const ProductDetail = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<"primary" | "secondary">("primary");

  const cat = (category || "laptops") as Category;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ table: cat, id: id || "" });
        const res = await fetch(`${SUPABASE_URL}/functions/v1/fetch-products?${params}`, {
          headers: {
            apikey: SUPABASE_KEY,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);
        } else if (data.products?.length > 0) {
          setProduct(data.products[0]);
        } else {
          throw new Error("Product not found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [cat, id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error || "Product not found"}</p>
        <Link to="/products" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    );
  }

  const productName = cat === "accessories"
    ? (product.name || "Accessory")
    : `${product.brand} ${product.model}`;

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const currentImage = activeImage === "secondary" && product.secondaryImage
    ? product.secondaryImage
    : product.primaryImage;

  const specs = cat !== "accessories" ? [
    { icon: Cpu, label: "Processor", value: product.processor },
    { icon: MemoryStick, label: "RAM", value: product.ram > 0 ? `${product.ram} GB` : null },
    { icon: HardDrive, label: "Storage", value: product.storage > 0 ? `${product.storage} GB ${product.storageType || "SSD"}` : null },
    { icon: MonitorSmartphone, label: "Screen", value: product.screenSize },
    { icon: Palette, label: "Graphics", value: product.graphics },
    { icon: Tag, label: "Generation", value: product.generation },
    { icon: Calendar, label: "Warranty", value: product.warranty ? `${product.warranty} Months` : null },
    { icon: Package, label: "Condition", value: product.condition },
    { icon: Star, label: "Special Feature", value: product.specialFeature },
  ].filter(s => s.value) : [];

  return (
    <div className="pt-20 pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-5 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="capitalize">{cat}</span>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">{productName}</span>
        </nav>
      </div>

      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card-solid gradient-border rounded-2xl overflow-hidden">
              <div className="relative aspect-square bg-muted/20 flex items-center justify-center">
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={productName}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <Monitor size={80} className="text-muted-foreground/20" />
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 text-sm font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-xl">
                    {discount}% OFF
                  </span>
                )}
                {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
                  <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider bg-destructive text-destructive-foreground px-3 py-1.5 rounded-xl">
                    Only {product.stockQuantity} left
                  </span>
                )}
              </div>
              {/* Thumbnail switcher */}
              {product.secondaryImage && (
                <div className="flex gap-3 p-4 border-t border-border/50">
                  <button
                    onClick={() => setActiveImage("primary")}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${activeImage === "primary" ? "border-primary" : "border-border/50"}`}
                  >
                    <img src={product.primaryImage} alt="" className="w-full h-full object-cover" />
                  </button>
                  <button
                    onClick={() => setActiveImage("secondary")}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${activeImage === "secondary" ? "border-primary" : "border-border/50"}`}
                  >
                    <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {cat !== "accessories" && product.brand && (
              <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{product.brand}</span>
            )}
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-black mb-4 text-foreground">
              {productName}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.price > 0 ? (
                <>
                  <span className="font-heading text-3xl md:text-4xl font-black text-primary">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {discount > 0 && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-sm font-bold text-[hsl(var(--success))] bg-[hsl(var(--success))]/10 px-2 py-0.5 rounded-lg">
                      Save {discount}%
                    </span>
                  )}
                </>
              ) : (
                <span className="font-heading text-2xl font-bold text-primary">Contact for Price</span>
              )}
            </div>

            {/* Stock */}
            {product.stockQuantity > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-2.5 h-2.5 rounded-full ${product.stockQuantity <= 5 ? "bg-destructive" : "bg-[hsl(var(--success))]"}`} />
                <span className="text-sm text-muted-foreground">
                  {product.stockQuantity <= 5 ? `Only ${product.stockQuantity} left in stock` : "In Stock"}
                </span>
              </div>
            )}

            {/* Specs Grid */}
            {specs.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                    <spec.icon size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{spec.label}</p>
                      <p className="text-sm font-semibold text-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col gap-3 mt-auto">
              <a
                href={`https://wa.me/919893496163?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(productName)}${product.price > 0 ? `%20(₹${product.price.toLocaleString("en-IN")})` : ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-[hsl(142,70%,45%)] py-4 text-base font-bold text-white hover:bg-[hsl(142,70%,40%)] transition-colors active:scale-[0.98]"
              >
                <MessageCircle size={20} /> Buy on WhatsApp
              </a>

              <div className="glass-card-solid gradient-border rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground">Quality Guaranteed</p>
                  <p className="text-xs text-muted-foreground">Every device passes our 40-step quality check. {product.warranty ? `${product.warranty}-month warranty included.` : ""}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
