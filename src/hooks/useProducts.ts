import { useState, useEffect } from "react";

export interface Product {
  id: number;
  brand: string;
  model: string;
  name?: string;
  processor: string;
  ram: number;
  storage: number;
  storageType: string;
  screenSize: string;
  graphics: string;
  condition: string;
  price: number;
  originalPrice: number;
  stockQuantity: number;
  specialFeature: string;
  warranty: number;
  primaryImage: string;
  secondaryImage: string;
  generation: string;
  type?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export function useProducts(table: "laptops" | "desktops" | "accessories" = "laptops", limit = 50, brand?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ table, limit: String(limit) });
        if (brand) params.set("brand", brand);

        const res = await fetch(`${SUPABASE_URL}/functions/v1/fetch-products?${params}`, {
          headers: {
            apikey: SUPABASE_KEY,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } catch (err: any) {
        setError(err.message);
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [table, limit, brand]);

  return { products, total, loading, error };
}
