import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, MessageCircle, Monitor, Loader2, ShieldCheck, Cpu, HardDrive, MemoryStick,
  MonitorSmartphone, Palette, Calendar, Package, Tag, Star
} from "lucide-react";
import { Product } from "@/hooks/useProducts";
import SEOHead from "@/components/SEOHead";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dthlunjjxegdcpikighl.supabase.co/functions/v1';

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
        const actionMap = {
          laptops: 'get-laptop',
          desktops: 'get-desktops',
          accessories: 'get-accessories'
        };

        const res = await fetch(`${API_BASE_URL}/postgres-api`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: actionMap[cat] })
        });

        if (!res.ok) throw new Error("Failed to fetch product");
        
        const rawData = await res.json();
        const foundProduct = rawData.find((item: any) => item.row_number === parseInt(id || '0'));
        
        if (!foundProduct) throw new Error("Product not found");

        // Transform to Product interface
        const transformedProduct: Product = {
          id: foundProduct.row_number,
          brand: foundProduct.brand || '',
          model: foundProduct.model || '',
          processor: foundProduct.processor || '',
          ram: foundProduct.ram_gb || 0,
          storage: foundProduct.storage_gb || 0,
          storageType: foundProduct.storage_type || '',
          screenSize: foundProduct.screen_size || '',
          graphics: foundProduct.graphics || '',
          condition: foundProduct.condition || '',
          price: parseInt(foundProduct.price_range?.split('-')[0]?.replace(/[^0-9]/g, '') || '0'),
          originalPrice: parseInt(foundProduct.price_range?.split('-')[1]?.replace(/[^0-9]/g, '') || '0'),
          stockQuantity: foundProduct.stock_quantity || 0,
          specialFeature: foundProduct.special_feature || '',
          warranty: foundProduct.warranty_in_months || 0,
          primaryImage: foundProduct.image_url_1 || '',
          secondaryImage: foundProduct.image_url_2 || '',
          generation: foundProduct.generation || ''
        };

        setProduct(transformedProduct);
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

  // Dynamic Product Schema for Google
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "image": [product.primaryImage, product.secondaryImage].filter(Boolean),
    "description": cat !== "accessories"
      ? `${productName} - ${product.processor || ""} ${product.ram ? product.ram + "GB RAM" : ""} ${product.storage ? product.storage + "GB " + (product.storageType || "SSD") : ""} ${product.screenSize || ""} ${product.condition || ""}. Available at AI Laptop Wala Indore.`
      : `${productName} available at AI Laptop Wala Indore at best price.`,
    "brand": cat !== "accessories" && product.brand ? { "@type": "Brand", "name": product.brand } : undefined,
    "sku": `${cat.toUpperCase()}-${product.id}`,
    "category": cat === "laptops" ? "Laptops" : cat === "desktops" ? "Desktop Computers" : "Computer Accessories",
    ...(cat !== "accessories" && product.processor ? {
      "additionalProperty": [
        product.processor ? { "@type": "PropertyValue", "name": "Processor", "value": product.processor } : null,
        product.ram > 0 ? { "@type": "PropertyValue", "name": "RAM", "value": `${product.ram} GB` } : null,
        product.storage > 0 ? { "@type": "PropertyValue", "name": "Storage", "value": `${product.storage} GB ${product.storageType || "SSD"}` } : null,
        product.screenSize ? { "@type": "PropertyValue", "name": "Screen Size", "value": product.screenSize } : null,
        product.graphics ? { "@type": "PropertyValue", "name": "Graphics", "value": product.graphics } : null,
        product.generation ? { "@type": "PropertyValue", "name": "Generation", "value": product.generation } : null,
      ].filter(Boolean)
    } : {}),
    "offers": {
      "@type": "Offer",
      "url": `https://ailaptopwala.com/products/${cat}/${product.id}`,
      "priceCurrency": "INR",
      "price": product.price > 0 ? product.price : undefined,
      "availability": product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "AI Laptop Wala",
        "url": "https://ailaptopwala.com"
      },
      "itemCondition": product.condition?.toLowerCase().includes("new") ? "https://schema.org/NewCondition" : "https://schema.org/RefurbishedCondition",
      ...(product.warranty ? { "warranty": { "@type": "WarrantyPromise", "durationOfWarranty": { "@type": "QuantitativeValue", "value": product.warranty, "unitCode": "MON" } } } : {})
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ailaptopwala.com" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://ailaptopwala.com/products" },
      { "@type": "ListItem", "position": 3, "name": cat.charAt(0).toUpperCase() + cat.slice(1), "item": `https://ailaptopwala.com/products?cat=${cat}` },
      { "@type": "ListItem", "position": 4, "name": productName, "item": `https://ailaptopwala.com/products/${cat}/${product.id}` },
    ]
  };

  const seoTitle = cat !== "accessories"
    ? `${productName} – ${product.processor || ""} ${product.ram ? product.ram + "GB" : ""} ${product.storage ? product.storage + "GB" : ""} | Buy in Indore`
    : `${productName} | Buy at Best Price in Indore`;

  const seoDesc = cat !== "accessories"
    ? `Buy ${productName} at AI Laptop Wala Indore. ${product.processor || ""}, ${product.ram ? product.ram + "GB RAM" : ""}, ${product.storage ? product.storage + "GB " + (product.storageType || "SSD") : ""}. ${product.condition || ""}. ${product.price > 0 ? "Price: ₹" + product.price.toLocaleString("en-IN") + "." : ""} ${product.warranty ? product.warranty + " months warranty." : ""} Best laptop deal in Indore, Madhya Pradesh.`
    : `Buy ${productName} at best price at AI Laptop Wala Indore. ${product.price > 0 ? "Price: ₹" + product.price.toLocaleString("en-IN") + "." : ""} Fast delivery in Indore, Madhya Pradesh.`;

  return (
    <div className="pt-20 pb-16">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={`/products/${cat}/${product.id}`}
        ogImage={product.primaryImage || undefined}
        ogType="product"
        keywords={`${productName}, ${product.brand || ""} ${cat} Indore, buy ${cat === "laptops" ? "laptop" : cat === "desktops" ? "desktop" : "accessories"} Indore, ${product.brand || ""} price Indore, refurbished ${cat} Indore, ${productName} price`}
        jsonLd={[productSchema, breadcrumbSchema]}
      />

      {/* Breadcrumb */}
      <div className="container mx-auto px-5 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="glass-card-solid gradient-border rounded-2xl overflow-hidden">
              <div className="relative aspect-square bg-muted/20 flex items-center justify-center">
                {currentImage ? (
                  <img src={currentImage} alt={`${productName} - Buy at AI Laptop Wala Indore`} className="w-full h-full object-contain p-4" />
                ) : (
                  <Monitor size={80} className="text-muted-foreground/20" />
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 text-sm font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-xl">{discount}% OFF</span>
                )}
                {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
                  <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider bg-destructive text-destructive-foreground px-3 py-1.5 rounded-xl">Only {product.stockQuantity} left</span>
                )}
              </div>
              {product.secondaryImage && (
                <div className="flex gap-3 p-4 border-t border-border/50">
                  <button onClick={() => setActiveImage("primary")} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${activeImage === "primary" ? "border-primary" : "border-border/50"}`}>
                    <img src={product.primaryImage} alt="" className="w-full h-full object-cover" />
                  </button>
                  <button onClick={() => setActiveImage("secondary")} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${activeImage === "secondary" ? "border-primary" : "border-border/50"}`}>
                    <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col">
            {cat !== "accessories" && product.brand && (
              <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{product.brand}</span>
            )}
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-black mb-4 text-foreground">{productName}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.price > 0 ? (
                <>
                  <span className="font-heading text-3xl md:text-4xl font-black text-primary">₹{product.price.toLocaleString("en-IN")}</span>
                  {discount > 0 && <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                  {discount > 0 && <span className="text-sm font-bold text-[hsl(var(--success))] bg-[hsl(var(--success))]/10 px-2 py-0.5 rounded-lg">Save {discount}%</span>}
                </>
              ) : (
                <span className="font-heading text-2xl font-bold text-primary">Contact for Price</span>
              )}
            </div>

            {/* Stock */}
            {product.stockQuantity > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-2.5 h-2.5 rounded-full ${product.stockQuantity <= 5 ? "bg-destructive" : "bg-[hsl(var(--success))]"}`} />
                <span className="text-sm text-muted-foreground">{product.stockQuantity <= 5 ? `Only ${product.stockQuantity} left in stock` : "In Stock"}</span>
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
