import { useState, useMemo } from "react";
import { useProducts, Product } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Monitor, MessageCircle, Loader2, SlidersHorizontal, X, ChevronLeft, ChevronRight, ArrowUpDown, ShieldCheck, Laptop, PcCase, Headphones, Search
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const BRANDS = ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer"];
const RAM_OPTIONS = [4, 8, 16, 32];
const STORAGE_OPTIONS = [128, 256, 512, 1024];

type Category = "laptops" | "desktops" | "accessories";

const CATEGORIES: { key: Category; label: string; icon: any }[] = [
  { key: "laptops", label: "Laptops", icon: Laptop },
  { key: "desktops", label: "Desktops", icon: PcCase },
  { key: "accessories", label: "Accessories", icon: Headphones },
];

const ProductCard = ({ product, category }: { product: Product; category: Category }) => {
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const productName = category === "accessories"
    ? (product.name || "Accessory")
    : `${product.brand} ${product.model}`;

  return (
    <Link to={`/products/${category}/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card-solid glow-cyan-hover gradient-border rounded-2xl overflow-hidden touch-card group"
      >
        <div className="relative h-40 md:h-48 overflow-hidden bg-muted/30">
          {product.primaryImage ? (
            <img
              src={product.primaryImage}
              alt={productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Monitor size={40} className="text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
          {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
            <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider bg-destructive text-destructive-foreground px-2.5 py-1 rounded-lg">
              Only {product.stockQuantity} left
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-lg">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading text-sm md:text-base font-bold mb-2 leading-tight text-foreground">
            {productName}
          </h3>
          {category !== "accessories" && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.ram > 0 && (
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded-md text-muted-foreground font-medium">{product.ram}GB RAM</span>
              )}
              {product.storage > 0 && (
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded-md text-muted-foreground font-medium">{product.storage}GB {product.storageType || 'SSD'}</span>
              )}
              {product.processor && (
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded-md text-muted-foreground font-medium">{product.processor}</span>
              )}
            </div>
          )}
          {product.price > 0 ? (
            <>
              {discount > 0 && (
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-heading text-lg md:text-xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </>
          ) : (
            <div className="mb-3">
              <span className="text-sm font-semibold text-primary">Contact for Price</span>
            </div>
          )}
          {category !== "accessories" && product.condition && (
            <p className="text-[10px] text-muted-foreground mb-3">{product.condition}</p>
          )}
          <span onClick={(e) => e.stopPropagation()} className="block">
            <a
              href={`https://wa.me/919893496163?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(productName)}${product.price > 0 ? `%20(₹${product.price})` : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[hsl(142,70%,45%)] py-2.5 text-xs font-bold text-white hover:bg-[hsl(142,70%,40%)] transition-colors active:scale-95"
            >
              <MessageCircle size={14} /> Buy on WhatsApp
            </a>
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

const Products = () => {
  const [category, setCategory] = useState<Category>("laptops");
  const { products, total, loading, error } = useProducts(category, 100);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<number[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const perPage = 12;

  const filtered = useMemo(() => {
    let result = [...products];
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const name = category === "accessories" ? (p.name || "") : `${p.brand} ${p.model}`;
        return name.toLowerCase().includes(q) || (p.processor || "").toLowerCase().includes(q) || (p.brand || "").toLowerCase().includes(q);
      });
    }
    if (category !== "accessories") {
      if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
      if (selectedRam.length > 0) result = result.filter((p) => selectedRam.includes(p.ram));
      if (selectedStorage.length > 0) result = result.filter((p) => selectedStorage.includes(p.storage));
    }
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, selectedBrands, selectedRam, selectedStorage, sortBy, category, searchQuery]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleBrand = (b: string) => { setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]); setPage(1); };
  const toggleRam = (r: number) => { setSelectedRam((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]); setPage(1); };
  const toggleStorage = (s: number) => { setSelectedStorage((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]); setPage(1); };
  const clearFilters = () => { setSelectedBrands([]); setSelectedRam([]); setSelectedStorage([]); setSearchQuery(""); setPage(1); };
  const switchCategory = (cat: Category) => { setCategory(cat); clearFilters(); setSortBy("featured"); setPage(1); };
  const hasFilters = selectedBrands.length > 0 || selectedRam.length > 0 || selectedStorage.length > 0 || searchQuery.trim().length > 0;

  const categoryLabels: Record<Category, string> = { laptops: "laptops", desktops: "desktops", accessories: "accessories" };

  const categoryMeta: Record<Category, { title: string; desc: string; kw: string }> = {
    laptops: {
      title: "Buy Refurbished & Open Box Laptops in Indore – MacBook, Gaming, Business Laptops",
      desc: "Buy best refurbished laptops in Indore at AI Laptop Wala. Apple MacBook, gaming laptops, business laptops, open box laptops at best prices with warranty. Free delivery in Indore, Madhya Pradesh.",
      kw: "buy laptop Indore, refurbished laptop Indore, MacBook Indore, gaming laptop Indore, second hand laptop Indore, used laptop Indore, open box laptop Indore, laptop shop Indore, laptop dealer Indore, best laptop price Indore, laptop Madhya Pradesh"
    },
    desktops: {
      title: "Buy Refurbished Desktops in Indore – Best Desktop Computer Shop",
      desc: "Buy refurbished desktops in Indore at AI Laptop Wala. Certified quality desktops for office, home, and business use. Best prices with warranty in Indore, Madhya Pradesh.",
      kw: "refurbished desktop Indore, desktop computer Indore, used desktop Indore, computer shop Indore, desktop dealer Indore, office desktop Indore, desktop Madhya Pradesh"
    },
    accessories: {
      title: "Buy Laptop Accessories in Indore – Best Prices on Chargers, Bags, SSD, RAM",
      desc: "Buy laptop accessories at best prices in Indore. SSD, RAM, chargers, bags, keyboards, mouse & more at AI Laptop Wala, Silver Mall, Indore, Madhya Pradesh.",
      kw: "laptop accessories Indore, laptop charger Indore, SSD Indore, RAM Indore, laptop bag Indore, laptop accessories shop Indore, computer accessories Madhya Pradesh"
    }
  };

  // ItemList schema for products
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${category.charAt(0).toUpperCase() + category.slice(1)} - AI Laptop Wala Indore`,
    "numberOfItems": filtered.length,
    "itemListElement": paginated.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": category === "accessories" ? (p.name || "Accessory") : `${p.brand} ${p.model}`,
        "image": p.primaryImage || "",
        "url": `https://ailaptopwala.com/products/${category}/${p.id}`,
        "offers": {
          "@type": "Offer",
          "price": p.price,
          "priceCurrency": "INR",
          "availability": p.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": { "@type": "Organization", "name": "AI Laptop Wala" }
        }
      }
    }))
  };

  const meta = categoryMeta[category];

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-base">Filters</h3>
        {hasFilters && <button onClick={clearFilters} className="text-xs text-primary font-medium hover:underline">Clear all</button>}
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3">Brands</h4>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button key={b} onClick={() => toggleBrand(b)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${selectedBrands.includes(b) ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"}`}>{b}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3">RAM</h4>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((r) => (
            <button key={r} onClick={() => toggleRam(r)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${selectedRam.includes(r) ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"}`}>{r}GB</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-3">SSD Storage</h4>
        <div className="flex flex-wrap gap-2">
          {STORAGE_OPTIONS.map((s) => (
            <button key={s} onClick={() => toggleStorage(s)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${selectedStorage.includes(s) ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"}`}>{s >= 1024 ? `${s / 1024}TB` : `${s}GB`}</button>
          ))}
        </div>
      </div>
      <div className="glass-card-solid gradient-border p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={18} className="text-primary" />
          <span className="text-sm font-bold">AI Certified</span>
        </div>
        <p className="text-[10px] text-muted-foreground">Every device passes our 40-step quality check process.</p>
      </div>
    </div>
  );

  return (
    <div className="pt-20 pb-16">
      <SEOHead
        title={meta.title}
        description={meta.desc}
        canonical="/products"
        keywords={meta.kw}
        jsonLd={itemListSchema}
      />

      {/* Page Hero */}
      <div className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-12 md:py-16">
        <div className="container mx-auto px-5 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black mb-3">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-background/60 text-sm md:text-base max-w-lg mx-auto">
            Premium refurbished laptops, desktops & accessories — up to 60% off with warranty.
          </p>
          <div className="flex items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button key={cat.key} onClick={() => switchCategory(cat.key)} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${category === cat.key ? "bg-primary text-primary-foreground shadow-lg" : "bg-background/10 text-background/70 hover:bg-background/20 border border-background/10"}`}>
                  <Icon size={16} />{cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-background/40" />
            <input
              type="text"
              placeholder="Search laptops, brands, models..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm font-medium focus:outline-none focus:border-primary/50 focus:bg-background/15 transition-all"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-background/40 hover:text-background transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 mt-8">
        <div className="flex gap-6">
          {category !== "accessories" && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 glass-card-solid gradient-border p-5 rounded-2xl"><FilterSidebar /></div>
            </aside>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {category !== "accessories" && (
                  <button className="lg:hidden inline-flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-2 rounded-lg border border-border" onClick={() => setShowFilters(true)}>
                    <SlidersHorizontal size={14} /> Filters
                  </button>
                )}
                <p className="text-sm text-muted-foreground">Showing {paginated.length} of {filtered.length} {categoryLabels[category]}</p>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-muted-foreground" />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="text-sm bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-foreground">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary" size={36} /></div>
            ) : error ? (
              <div className="text-center py-20"><p className="text-muted-foreground">Could not load products. Please try again later.</p></div>
            ) : paginated.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No products match your filters.</p>
                {hasFilters && <button onClick={clearFilters} className="mt-3 text-sm text-primary font-medium hover:underline">Clear filters</button>}
              </div>
            ) : (
              <div className={`grid ${category === "accessories" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3"} gap-3 md:gap-5`}>
                {paginated.map((product, i) => (
                  <motion.div key={`${category}-${product.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.3 }}>
                    <ProductCard product={product} category={category} />
                  </motion.div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted/50 disabled:opacity-30 transition-colors"><ChevronLeft size={16} /></button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = i + 1;
                  return <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted/50"}`}>{p}</button>;
                })}
                {totalPages > 5 && <span className="text-muted-foreground">...</span>}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted/50 disabled:opacity-30 transition-colors"><ChevronRight size={16} /></button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && category !== "accessories" && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><X size={16} /></button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
