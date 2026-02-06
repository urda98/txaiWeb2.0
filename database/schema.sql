-- Tipos ENUM
CREATE TYPE fabric_type AS ENUM ('Cotton', 'Polyester');

CREATE TYPE size_type AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

CREATE TYPE order_status_type AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

CREATE TYPE cart_status_type AS ENUM ('active', 'completed', 'abandoned');

CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');

CREATE TYPE role_type AS ENUM ('admin', 'user');

CREATE TYPE discount_type AS ENUM ('0', '10', '20', '30');

CREATE TABLE profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL UNIQUE,
    role role_type NOT NULL DEFAULT 'user',
    gender gender_type NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    birth_date date NOT NULL,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Productos son gestionados solo por el dueño (admin). user_id = perfil del dueño de la empresa.
CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    fabric fabric_type NOT NULL,
    care_instructions text,
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

CREATE TABLE user_favorites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

CREATE TABLE variants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size size_type NOT NULL,
    color text NOT NULL,
    stock integer NOT NULL DEFAULT 0,
    price numeric(10,2) NOT NULL,
    length numeric(6,2) NOT NULL,
    width numeric(6,2) NOT NULL,
    height numeric(6,2) NOT NULL,
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    UNIQUE (product_id, size, color)
);

CREATE TABLE carts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status cart_status_type DEFAULT 'active',
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    UNIQUE (user_id) WHERE status = 'active'
);

CREATE TABLE cart_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id uuid NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    variant_id uuid NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
    quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

CREATE TABLE ambassadors (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text NOT NULL UNIQUE,
    name text NOT NULL,
    discount discount_type NOT NULL,
    is_active boolean DEFAULT true,
    user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    UNIQUE (user_id)
);

CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    ambassador_id uuid REFERENCES ambassadors(id) ON DELETE SET NULL,
    discount_percent discount_type DEFAULT '0',
    final_total numeric(10,2) NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    status order_status_type DEFAULT 'pending',
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

CREATE TABLE order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variant_id uuid NOT NULL REFERENCES variants(id),
    quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price numeric(10,2) NOT NULL,
    created_at timestamptz DEFAULT NOW(),
    UNIQUE (order_id, variant_id)
);


-- Triggers para actualizar updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER ambassadors_updated_at
  BEFORE UPDATE ON ambassadors
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER variants_updated_at
  BEFORE UPDATE ON variants
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();