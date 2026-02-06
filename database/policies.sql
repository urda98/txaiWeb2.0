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

ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can view own favorites"
ON user_favorites
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "User can add own favorites"
ON user_favorites
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can remove own favorites"
ON user_favorites
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

ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

/* SELECT */
CREATE POLICY "User can read own carts"
ON carts
FOR SELECT
USING (auth.uid() = user_id);

/* INSERT */
CREATE POLICY "User can create cart"
ON carts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

/* UPDATE */
CREATE POLICY "User can update own cart"
ON carts
FOR UPDATE
USING (auth.uid() = user_id);

/* DELETE */
CREATE POLICY "User can delete own cart"
ON carts
FOR DELETE
USING (auth.uid() = user_id);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

/* SELECT */
CREATE POLICY "User can read own cart items"
ON cart_items
FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id
    FROM carts
    WHERE carts.id = cart_items.cart_id
  )
);

/* INSERT */
CREATE POLICY "User can add items to own cart"
ON cart_items
FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id
    FROM carts
    WHERE carts.id = cart_items.cart_id
  )
);

/* UPDATE */
CREATE POLICY "User can update own cart items"
ON cart_items
FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id
    FROM carts
    WHERE carts.id = cart_items.cart_id
  )
);

/* DELETE */
CREATE POLICY "User can delete own cart items"
ON cart_items
FOR DELETE
USING (
  auth.uid() IN (
    SELECT user_id
    FROM carts
    WHERE carts.id = cart_items.cart_id
  )
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

/* SELECT */
CREATE POLICY "User can read own orders"
ON orders
FOR SELECT
USING (auth.uid() = user_id);

/* INSERT */
CREATE POLICY "User can create own order"
ON orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

/* SELECT */
CREATE POLICY "User can read own order items"
ON order_items
FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id
    FROM orders
    WHERE orders.id = order_items.order_id
  )
);

/* INSERT */
CREATE POLICY "User can insert order items"
ON order_items
FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id
    FROM orders
    WHERE orders.id = order_items.order_id
  )
);
