-- Supabase Schema for Essenzae Laux

-- 1. Create Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL,
  amazonUrl TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Analytics Tracking Table (Handles both page views and clicks)
CREATE TABLE product_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku_id TEXT REFERENCES products(id) ON DELETE CASCADE, -- Nullable for page_views
  event_type TEXT NOT NULL, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Daily Analytics Aggregation View
CREATE OR REPLACE VIEW daily_product_clicks AS
SELECT 
  sku_id,
  DATE(created_at) as click_date,
  COUNT(*) as total_clicks
FROM product_clicks
GROUP BY sku_id, DATE(created_at);

-- Set up Row Level Security (RLS) - Basic public read/write since it's an internal admin tool
-- Warning: In a real production environment with public access, you should restrict write access!
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public all access to products (Admin only)" ON products FOR ALL USING (true);

CREATE POLICY "Allow public insert to product_clicks" ON product_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read to product_clicks" ON product_clicks FOR SELECT USING (true);
