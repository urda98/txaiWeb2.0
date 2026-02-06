ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON users
FOR SELECT
USING (auth.uid() = id);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active products"
ON products
FOR SELECT
USING (
  active = true
  OR auth.uid() = user_id
);

CREATE POLICY "Owner can insert products"
ON products
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner can update products"
ON products
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Owner can delete products"
ON products
FOR DELETE
USING (auth.uid() = user_id);


ALTER TABLE variants ENABLE ROW LEVEL SECURITY;

-- SELECT admin/owner
CREATE POLICY "Owner can read variants"
ON variants
FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id
    FROM products
    WHERE products.id = variants.product_id
  )
);

-- Lectura pública de variantes activas (catálogo)
CREATE POLICY "Public read active variants"
ON variants
FOR SELECT
USING (active = true);

-- INSERT
CREATE POLICY "Owner can insert variants"
ON variants
FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id
    FROM products
    WHERE products.id = variants.product_id
  )
);

-- UPDATE
CREATE POLICY "Owner can update variants"
ON variants
FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id
    FROM products
    WHERE products.id = variants.product_id
  )
);

-- DELETE
CREATE POLICY "Owner can delete variants"
ON variants
FOR DELETE
USING (
  auth.uid() IN (
    SELECT user_id
    FROM products
    WHERE products.id = variants.product_id
  )
);


-- Vista pública de variantes (solo activas; el acceso real lo controla RLS en variants)
CREATE VIEW public_variants AS
SELECT
  id,
  product_id,
  price,
  size,
  color,
  length,
  width,
  height,
  (stock > 0) AS in_stock
FROM variants
WHERE active = true;
