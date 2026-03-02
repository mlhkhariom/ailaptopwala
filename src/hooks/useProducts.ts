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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dthlunjjxegdcpikighl.supabase.co/functions/v1';

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
        // Map table name to action
        const actionMap = {
          laptops: 'get-laptop',
          desktops: 'get-desktops',
          accessories: 'get-accessories'
        };

        const res = await fetch(`${API_BASE_URL}/postgres-api`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: actionMap[table] })
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const rawData = await res.json();
        
        // Transform data to match Product interface
        const transformedProducts = rawData.map((item: any) => ({
          id: item.row_number,
          brand: item.brand || '',
          model: item.model || '',
          processor: item.processor || '',
          ram: item.ram_gb || 0,
          storage: item.storage_gb || 0,
          storageType: item.storage_type || '',
          screenSize: item.screen_size || '',
          graphics: item.graphics || '',
          condition: item.condition || '',
          price: parseInt(item.price_range?.split('-')[0]?.replace(/[^0-9]/g, '') || '0'),
          originalPrice: parseInt(item.price_range?.split('-')[1]?.replace(/[^0-9]/g, '') || '0'),
          stockQuantity: item.stock_quantity || 0,
          specialFeature: item.special_feature || '',
          warranty: item.warranty_in_months || 0,
          primaryImage: item.image_url_1 || '',
          secondaryImage: item.image_url_2 || '',
          generation: item.generation || ''
        }));

        setProducts(transformedProducts);
        setTotal(transformedProducts.length);
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
