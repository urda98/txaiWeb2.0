ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON profiles
FOR SELECT
USING (auth.uid() = id);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anónimos y usuarios: productos activos con al menos una variante con stock; admin ve todos
CREATE POLICY "Public read active products with stock"
ON products
FOR SELECT
USING (
  (active = true AND EXISTS (
    SELECT 1 FROM variants v
    WHERE v.product_id = products.id AND v.active = true AND v.stock > 0
  ))
  OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Solo el dueño (admin) puede crear/editar/eliminar productos
CREATE POLICY "Admin can insert products"
ON products
FOR INSERT
WITH CHECK (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admin can update products"
ON products
FOR UPDATE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admin can delete products"
ON products
FOR DELETE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

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

-- Anónimos y usuarios: solo variantes activas y con stock; admin ve todas
CREATE POLICY "Public read active variants with stock"
ON variants
FOR SELECT
USING (
  (active = true AND stock > 0)
  OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Solo el dueño (admin) puede crear/editar/eliminar variantes
CREATE POLICY "Admin can insert variants"
ON variants
FOR INSERT
WITH CHECK (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admin can update variants"
ON variants
FOR UPDATE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admin can delete variants"
ON variants
FOR DELETE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
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

-- ========== AMBASSADORS ==========
ALTER TABLE ambassadors ENABLE ROW LEVEL SECURITY;

-- Validar código en checkout: cualquiera puede leer embajadores activos (solo para lookup por code).
-- Un embajador con user_id puede ver su propio registro (para dashboard después).
CREATE POLICY "Read active ambassadors or own ambassador row"
ON ambassadors
FOR SELECT
USING (is_active = true OR user_id = auth.uid());

-- Solo admins crean/editan/eliminan embajadores (códigos, descuentos, activar/desactivar).
CREATE POLICY "Admin can insert ambassadors"
ON ambassadors
FOR INSERT
WITH CHECK (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admin can update ambassadors"
ON ambassadors
FOR UPDATE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

CREATE POLICY "Admin can delete ambassadors"
ON ambassadors
FOR DELETE
USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- ========== ORDERS ==========
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Cliente ve sus órdenes; embajador ve las órdenes donde se usó su código (para dashboard).
CREATE POLICY "User can read own orders or orders with own ambassador code"
ON orders
FOR SELECT
USING (
  auth.uid() = user_id
  OR orders.ambassador_id IN (
    SELECT id FROM ambassadors WHERE user_id = auth.uid()
  )
);

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
