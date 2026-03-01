import { useState, useMemo } from "react";
import { useProducts, Product } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Monitor, MessageCircle, Loader2, SlidersHorizontal, X, ChevronLeft, ChevronRight, ArrowUpDown, ShieldCheck
} from "lucide-react";

const BRANDS = ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer"];
const RAM_OPTIONS = [4, 8, 16, 32];
const STORAGE_OPTIONS = [128, 256, 512, 1024];

const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card-solid glow-cyan-hover gradient-border rounded-2xl overflow-hidden touch-card group"
    >
      <div className="relative h-40 md:h-48 overflow-hidden bg-muted/30">
        {product.primaryImage ? (
          <img
            src={product.primaryImage}
            alt={`${product.brand} ${product.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Monitor size={40} className="text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
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
          {product.brand} {product.model}
        </h3>
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
        <div className="flex items-baseline gap-2 mb-1">
          {discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-heading text-lg md:text-xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
        <p className="text-[10px] text-muted-foreground mb-3">{product.condition || "Refurbished"}</p>
        <a
          href={`https://wa.me/919893496163?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(product.brand + ' ' + product.model)}%20(₹${product.price})`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-[hsl(142,70%,45%)] py-2.5 text-xs font-bold text-white hover:bg-[hsl(142,70%,40%)] transition-colors active:scale-95"
        >
          <MessageCircle size={14} /> Buy on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const { products, total, loading, error } = useProducts("laptops", 100);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<number[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<number[]>([]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 200000]);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const perPage = 12;

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedRam.length > 0) {
      result = result.filter((p) => selectedRam.includes(p.ram));
    }
    if (selectedStorage.length > 0) {
      result = result.filter((p) => selectedStorage.includes(p.storage));
    }
    result = result.filter((p) => p.price >= budgetRange[0] && p.price <= budgetRange[1]);
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, selectedBrands, selectedRam, selectedStorage, budgetRange, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
    setPage(1);
  };
  const toggleRam = (r: number) => {
    setSelectedRam((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]);
    setPage(1);
  };
  const toggleStorage = (s: number) => {
    setSelectedStorage((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    setPage(1);
  };
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedRam([]);
    setSelectedStorage([]);
    setBudgetRange([0, 200000]);
    setPage(1);
  };

  const hasFilters = selectedBrands.length > 0 || selectedRam.length > 0 || selectedStorage.length > 0;

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-base">Filters</h3>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-primary font-medium hover:underline">Clear all</button>
        )}
      </div>

      {/* Brands */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Brands</h4>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => toggleBrand(b)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                selectedBrands.includes(b)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* RAM */}
      <div>
        <h4 className="text-sm font-semibold mb-3">RAM</h4>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => toggleRam(r)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                selectedRam.includes(r)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {r}GB
            </button>
          ))}
        </div>
      </div>

      {/* Storage */}
      <div>
        <h4 className="text-sm font-semibold mb-3">SSD Storage</h4>
        <div className="flex flex-wrap gap-2">
          {STORAGE_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => toggleStorage(s)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                selectedStorage.includes(s)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {s >= 1024 ? `${s / 1024}TB` : `${s}GB`}
            </button>
          ))}
        </div>
      </div>

      {/* AI Certified badge */}
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
      {/* Page Hero */}
      <div className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-12 md:py-16">
        <div className="container mx-auto px-5 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black mb-3">
            Premium Refurbished <span className="text-primary">Laptops</span>
          </h1>
          <p className="text-background/60 text-sm md:text-base max-w-lg mx-auto">
            Get enterprise-grade laptops at up to 60% off. Rigorously tested, certified quality, and backed by warranty.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
              Shop Now
            </Link>
            <Link to="/repair" className="inline-flex items-center gap-2 border border-background/20 text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-background/10 transition-colors">
              Book Repair
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 mt-8">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 glass-card-solid gradient-border p-5 rounded-2xl">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden inline-flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-2 rounded-lg border border-border"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>
                <p className="text-sm text-muted-foreground">
                  Showing {paginated.length} of {filtered.length} laptops
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-foreground"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={36} />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Could not load products. Please try again later.</p>
              </div>
            ) : paginated.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No products match your filters.</p>
                <button onClick={clearFilters} className="mt-3 text-sm text-primary font-medium hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {paginated.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted/50 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        page === p ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="text-muted-foreground">...</span>}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted/50 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
