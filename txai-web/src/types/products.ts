export type ProductCategory = "all" | "female" | "male";

// Coinciden con tu schema (fabric_type, size_type)
export type FabricType = "Cotton" | "Polyester";

export type SizeType = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

// Para los circulitos de color en la card (nombre + hex opcional para pintar el círculo)
export type ColorOption = {
  id: string;
  name: string;
  hex?: string;
};

// Lo que muestra cada card (y lo que luego devolverá el API)
export type Product = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  tag?: "best_seller" | "new" | null;
  price: number;
  fabric: FabricType;
  colors: ColorOption[];
  sizes: SizeType[];
};

// Estado de la búsqueda: tab seleccionado + valores de cada filtro (desplegables)
export type ProductFilters = {
  category: ProductCategory;
  color?: string | null;
  size?: SizeType | null;
  fabric?: FabricType | null;
  productType?: string | null;
  style?: string | null;
  fit?: string | null;
};