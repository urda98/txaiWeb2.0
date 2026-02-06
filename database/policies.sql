ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
On usersFOR SELECTUSING (auth.uid() = id);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY  "Public can read active products"
ON products FOR SELECT USING (active = TRUE);