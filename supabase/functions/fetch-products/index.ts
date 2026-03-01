import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const dbHost = Deno.env.get('DB_HOST');
    const dbPort = Deno.env.get('DB_PORT') || '5432';
    const dbName = Deno.env.get('DB_NAME');
    const dbUser = Deno.env.get('DB_USER');
    const dbPassword = Deno.env.get('DB_PASSWORD');

    if (!dbHost || !dbName || !dbUser || !dbPassword) {
      throw new Error('Database configuration missing');
    }

    const { Client } = await import("https://deno.land/x/postgres@v0.19.3/mod.ts");
    
    const client = new Client({
      hostname: dbHost,
      port: parseInt(dbPort),
      database: dbName,
      user: dbUser,
      password: dbPassword,
      tls: { enabled: false },
    });

    await client.connect();

    const url = new URL(req.url);
    const table = url.searchParams.get('table') || 'laptops';
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const brand = url.searchParams.get('brand');

    const allowedTables = ['laptops', 'desktops', 'accessories'];
    if (!allowedTables.includes(table)) {
      throw new Error('Invalid table name');
    }

    let query = `SELECT * FROM ${table}`;
    const params: string[] = [];
    
    if (brand && table !== 'accessories') {
      params.push(brand);
      query += ` WHERE LOWER(brand) = LOWER($${params.length})`;
    }

    query += ` ORDER BY row_number LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(String(limit), String(offset));

    const result = await client.queryObject(query, params);
    
    let countQuery = `SELECT COUNT(*) as total FROM ${table}`;
    const countParams: string[] = [];
    if (brand && table !== 'accessories') {
      countParams.push(brand);
      countQuery += ` WHERE LOWER(brand) = LOWER($1)`;
    }
    const countResult = await client.queryObject(countQuery, countParams);
    const total = Number((countResult.rows[0] as any)?.total || 0);

    await client.end();

    // Parse price range helper
    const parsePrice = (priceStr: string | null): number => {
      if (!priceStr) return 0;
      const cleaned = priceStr.replace(/[₹,\s]/g, '');
      const parts = cleaned.split('-');
      return parseInt(parts[0]) || 0;
    };

    const parseOriginalPrice = (priceStr: string | null): number => {
      if (!priceStr) return 0;
      const cleaned = priceStr.replace(/[₹,\s]/g, '');
      const parts = cleaned.split('-');
      return parseInt(parts[1] || parts[0]) || 0;
    };

    let products;

    if (table === 'accessories') {
      products = result.rows.map((row: any) => ({
        id: row.row_number,
        name: row.accessories_name || '',
        price: parsePrice(row.price_range_inr),
        originalPrice: parseOriginalPrice(row.price_range_inr),
        primaryImage: row.image_url_1 || '',
        secondaryImage: row.image_url_2 || null,
        type: 'accessory',
      }));
    } else {
      products = result.rows.map((row: any) => ({
        id: row.row_number,
        brand: row.brand,
        model: row.model,
        processor: row.processor,
        ram: row.ram_gb,
        storage: row.storage_gb,
        storageType: row.storage_type,
        screenSize: row.screen_size,
        graphics: row.graphics,
        condition: row.condition,
        price: parsePrice(row.price_range),
        originalPrice: parseOriginalPrice(row.price_range),
        stockQuantity: row.stock_quantity,
        specialFeature: row.special_feature,
        warranty: row.warranty_in_months,
        primaryImage: row.image_url_1,
        secondaryImage: row.image_url_2,
        generation: row.generation,
        type: table === 'desktops' ? 'desktop' : 'laptop',
      }));
    }

    return new Response(JSON.stringify({ products, total }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
