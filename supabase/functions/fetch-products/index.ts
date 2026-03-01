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

    // Use Deno's postgres driver
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

    // Only allow specific tables
    const allowedTables = ['laptops', 'desktops'];
    if (!allowedTables.includes(table)) {
      throw new Error('Invalid table name');
    }

    let query = `SELECT * FROM ${table}`;
    const params: string[] = [];
    
    if (brand) {
      params.push(brand);
      query += ` WHERE LOWER(brand) = LOWER($${params.length})`;
    }

    query += ` ORDER BY row_number LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(String(limit), String(offset));

    const result = await client.queryObject(query, params);
    
    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM ${table}`;
    const countParams: string[] = [];
    if (brand) {
      countParams.push(brand);
      countQuery += ` WHERE LOWER(brand) = LOWER($1)`;
    }
    const countResult = await client.queryObject(countQuery, countParams);
    const total = Number((countResult.rows[0] as any)?.total || 0);

    await client.end();

    // Transform data
    const products = result.rows.map((row: any) => ({
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
      price: row.price_range ? parseInt(row.price_range.split('-')[0]) : 0,
      originalPrice: row.price_range ? parseInt(row.price_range.split('-')[1] || row.price_range.split('-')[0]) : 0,
      stockQuantity: row.stock_quantity,
      specialFeature: row.special_feature,
      warranty: row.warranty_in_months,
      primaryImage: row.image_url_1,
      secondaryImage: row.image_url_2,
      generation: row.generation,
    }));

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
