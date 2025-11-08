-- Migration: Create products table and insert sample data
-- Execute this file after the users table is created

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  article_no VARCHAR(50),
  product_service VARCHAR(255) NOT NULL,
  in_price DECIMAL(10, 2) DEFAULT 0.00,
  price DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50),
  in_stock INTEGER DEFAULT 0,
  description TEXT,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_update_products_updated_at ON products;
CREATE TRIGGER trigger_update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_products_updated_at();

-- Insert 20 sample products (replace user_id = 1 with an actual user ID from your database)
INSERT INTO products (article_no, product_service, in_price, price, unit, in_stock, description, user_id) VALUES
  ('ART-001', 'Laptop Dell XPS 15', 850.00, 1299.99, 'pcs', 15, 'High-performance laptop with 16GB RAM and 512GB SSD', 1),
  ('ART-002', 'Wireless Mouse Logitech MX', 45.00, 79.99, 'pcs', 50, 'Ergonomic wireless mouse with precision tracking', 1),
  ('ART-003', 'Mechanical Keyboard RGB', 75.00, 129.99, 'pcs', 30, 'Gaming keyboard with RGB lighting and mechanical switches', 1),
  ('ART-004', 'USB-C Hub 7-in-1', 25.00, 49.99, 'pcs', 40, 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader', 1),
  ('ART-005', 'External SSD 1TB Samsung', 80.00, 139.99, 'pcs', 25, 'Portable external SSD with fast transfer speeds', 1),
  ('ART-006', 'Webcam HD 1080p', 40.00, 69.99, 'pcs', 35, 'Full HD webcam with auto-focus and built-in microphone', 1),
  ('ART-007', 'Monitor 27" 4K LG', 320.00, 499.99, 'pcs', 12, '27-inch 4K UHD monitor with IPS panel', 1),
  ('ART-008', 'Noise Cancelling Headphones', 180.00, 299.99, 'pcs', 20, 'Premium wireless headphones with active noise cancellation', 1),
  ('ART-009', 'Desk Lamp LED Adjustable', 20.00, 39.99, 'pcs', 45, 'LED desk lamp with multiple brightness levels and color temperatures', 1),
  ('ART-010', 'Office Chair Ergonomic', 150.00, 249.99, 'pcs', 10, 'Ergonomic office chair with lumbar support and adjustable height', 1),
  ('ART-011', 'Cable Management Kit', 8.00, 15.99, 'set', 60, 'Complete cable management solution with clips and sleeves', 1),
  ('ART-012', 'Laptop Stand Aluminum', 30.00, 54.99, 'pcs', 28, 'Adjustable aluminum laptop stand for better ergonomics', 1),
  ('ART-013', 'Power Strip Surge Protector', 18.00, 32.99, 'pcs', 42, '6-outlet surge protector with USB charging ports', 1),
  ('ART-014', 'Graphics Tablet Wacom', 200.00, 349.99, 'pcs', 8, 'Professional graphics tablet for digital artists', 1),
  ('ART-015', 'Portable Battery Pack 20000mAh', 28.00, 49.99, 'pcs', 55, 'High-capacity portable charger with fast charging', 1),
  ('ART-016', 'Bluetooth Speaker Portable', 35.00, 59.99, 'pcs', 38, 'Waterproof Bluetooth speaker with 12-hour battery life', 1),
  ('ART-017', 'HDMI Cable 2m Premium', 12.00, 21.99, 'pcs', 75, 'High-speed HDMI cable supporting 4K@60Hz', 1),
  ('ART-018', 'Microphone USB Condenser', 65.00, 109.99, 'pcs', 18, 'Studio-quality USB microphone for podcasting and streaming', 1),
  ('ART-019', 'Ring Light 10" with Tripod', 25.00, 44.99, 'pcs', 32, 'LED ring light with adjustable tripod for content creation', 1),
  ('ART-020', 'Smart Pen Digital', 95.00, 159.99, 'pcs', 15, 'Digital smart pen that converts handwriting to digital text', 1);

-- Verification query (run this to check if data was inserted)
-- SELECT COUNT(*) FROM products;
-- SELECT * FROM products ORDER BY id;
