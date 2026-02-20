"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import type { ProductCategory, ProductFilters, SizeType, FabricType, Product } from "@/types/products";
import ProductCard from "./ProductCard";

const TAB_LABELS: Record<ProductCategory, string> = {
  all: "TODOS",
  female: "MUJER",
  male: "HOMBRE",
};

// Mock: luego lo traerás del backend (name + hex para el círculo)
const COLOR_OPTIONS: { name: string; hex: string }[] = [
  { name: "Azul", hex: "#1e3a5f" },
  { name: "Negro", hex: "#171717" },
  { name: "Blanco", hex: "#f5f5f5" },
  { name: "Verde", hex: "#2d5a27" },
  { name: "Vino", hex: "#722F37" },
  { name: "Celeste", hex: "#87CEEB" },
  { name: "Gris", hex: "#6b7280" },
];

const SIZE_OPTIONS: SizeType[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

// Mock productos: luego vendrán del backend según filters
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Ambo Leon Classic",
    price: 85900,
    fabric: "Cotton",
    colors: [
      { id: "c1", name: "Vino", hex: "#722F37" },
      { id: "c2", name: "Azul marino", hex: "#1e3a5f" },
      { id: "c3", name: "Celeste", hex: "#87CEEB" },
    ],
    sizes: ["S", "M", "L", "XL"],
    tag: "best_seller",
  },
  {
    id: "2",
    name: "Ambo Tech Jogger",
    price: 104500,
    fabric: "Polyester",
    colors: [
      { id: "c4", name: "Celeste", hex: "#87CEEB" },
      { id: "c5", name: "Gris", hex: "#6b7280" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tag: "best_seller",
  },
  {
    id: "3",
    name: "Ambo Essential",
    price: 78900,
    fabric: "Cotton",
    colors: [
      { id: "c6", name: "Negro", hex: "#171717" },
      { id: "c7", name: "Blanco", hex: "#f5f5f5" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    tag: "new",
  },
  {
    id: "4",
    name: "Ambo Essential",
    price: 78900,
    fabric: "Cotton",
    colors: [
      { id: "c6", name: "Negro", hex: "#171717" },
      { id: "c7", name: "Blanco", hex: "#f5f5f5" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    tag: "new",
  },
];

// Solo uno abierto a la vez
type OpenFilterType = "color" | "size" | "productType" | "style" | "fit" | "fabric" | null;

export default function ProductListingSection() {
  const [filters, setFilters] = useState<ProductFilters>({ category: "all" });
  const [openFilter, setOpenFilter] = useState<OpenFilterType>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const setCategory = (category: ProductCategory) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const setColor = (color: string | null) => {
    setFilters((prev) => ({ ...prev, color: color ?? undefined }));
    setOpenFilter(null);
  };

  const setSize = (size: SizeType | null) => {
    setFilters((prev) => ({ ...prev, size: size ?? undefined }));
    setOpenFilter(null);
  };

  const setProductType = (productType: string | null) => {
    setFilters((prev) => ({ ...prev, productType: productType ?? undefined }));
    setOpenFilter(null);
  };

  const setStyle = (style: string | null) => {
    setFilters((prev) => ({ ...prev, style: style ?? undefined }));
    setOpenFilter(null);
  };

  const setFit = (fit: string | null) => {
    setFilters((prev) => ({ ...prev, fit: fit ?? undefined }));
    setOpenFilter(null);
  };

  const setFabric = (fabric: FabricType | null) => {
    setFilters((prev) => ({ ...prev, fabric: fabric ?? undefined }));
    setOpenFilter(null);
  };

  // Filtros activos (excluyendo category) para mostrar chips y botón "Eliminar todo"
  const activeFilterEntries = ((): { key: keyof Omit<ProductFilters, "category">; label: string; hex?: string }[] => {
    const entries: { key: keyof Omit<ProductFilters, "category">; label: string; hex?: string }[] = [];
    if (filters.color) {
      const opt = COLOR_OPTIONS.find((o) => o.name === filters.color);
      entries.push({ key: "color", label: filters.color, hex: opt?.hex });
    }
    if (filters.size) entries.push({ key: "size", label: filters.size, hex: undefined });
    if (filters.fabric) entries.push({ key: "fabric", label: filters.fabric, hex: undefined });
    if (filters.productType) entries.push({ key: "productType", label: filters.productType, hex: undefined });
    if (filters.style) entries.push({ key: "style", label: filters.style, hex: undefined });
    if (filters.fit) entries.push({ key: "fit", label: filters.fit, hex: undefined });
    return entries;
  })();
  const hasActiveFilters = activeFilterEntries.length > 0;

  const clearAllFilters = () => {
    setFilters((prev) => ({ ...prev, color: undefined, size: undefined, fabric: undefined, productType: undefined, style: undefined, fit: undefined }));
    setOpenFilter(null);
  };

  const removeFilter = (key: keyof Omit<ProductFilters, "category">) => {
    setFilters((prev) => ({ ...prev, [key]: undefined }));
  };

  // Cerrar al hacer click fuera de la barra de filtros
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="font-montserrat w-full">
      <div className="w-full px-4 py-8 md:px-8">
        {/* Tabs */}
        <div className="flex justify-center gap-8 border-b border-zinc-200">
          {(["all", "female", "male"] as const).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setCategory(category)}
              className={`pb-3 text-sm font-medium transition-colors ${
                filters.category === category
                  ? "border-b-2 border-[var(--txai-red)] text-[var(--txai-red)]"
                  : "text-zinc-500 hover:text-[var(--txai-red)]"
              }`}
            >
              {TAB_LABELS[category]}
            </button>
          ))}
        </div>

        {/* Filtros: solo uno abierto a la vez (un solo ref envuelve todos) */}
        <div className="mt-6" ref={filtersRef}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Color */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter(openFilter === "color" ? null : "color")}
                  className={`flex items-center gap-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                    openFilter === "color"
                      ? "bg-zinc-200 text-zinc-800"
                      : "text-[var(--txai-red)] hover:bg-zinc-100"
                  }`}
                >
                  COLOR
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openFilter === "color" ? "rotate-180" : ""}`}
                  />
                </button>
                {openFilter === "color" && (
                  <div className="absolute left-0 top-full z-10 mt-1 min-w-[160px] rounded border border-zinc-200 bg-white py-1 shadow-lg">
                    <button
                      type="button"
                      onClick={() => setColor(null)}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-zinc-50 ${
                        !filters.color ? "font-medium text-[var(--txai-red)]" : "text-zinc-700"
                      }`}
                    >
                      Todos
                    </button>
                    {COLOR_OPTIONS.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setColor(option.name)}
                        className={`group flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
                          filters.color === option.name ? "font-medium text-[var(--txai-red)]" : "text-zinc-700"
                        }`}
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-full border border-zinc-300 transition-shadow group-hover:ring-2 group-hover:ring-zinc-400 group-hover:ring-offset-1"
                          style={{ backgroundColor: option.hex }}
                        />
                        {option.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Size */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter(openFilter === "size" ? null : "size")}
                  className={`flex items-center gap-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                    openFilter === "size"
                      ? "bg-zinc-200 text-zinc-800"
                      : "text-[var(--txai-red)] hover:bg-zinc-100"
                  }`}
                >
                  TALLE
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openFilter === "size" ? "rotate-180" : ""}`}
                  />
                </button>
                {openFilter === "size" && (
                  <div className="absolute left-0 top-full z-10 mt-1 min-w-[160px] rounded border border-zinc-200 bg-white py-1 shadow-lg">
                    <button
                      type="button"
                      onClick={() => setSize(null)}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-zinc-50 ${
                        !filters.size ? "font-medium text-[var(--txai-red)]" : "text-zinc-700"
                      }`}
                    >
                      Todos
                    </button>
                    {SIZE_OPTIONS.map((size) => {
                      const isSelected = filters.size === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSize(size)}
                          className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-zinc-50 ${
                            isSelected ? "font-medium text-[var(--txai-red)]" : "text-zinc-700"
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                              isSelected
                                ? "border-[var(--txai-red)] bg-[var(--txai-red)] text-white"
                                : "border-zinc-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                          </span>
                          {size}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Product Type */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter(openFilter === "productType" ? null : "productType")}
                  className={`flex items-center gap-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                    openFilter === "productType"
                      ? "bg-zinc-200 text-zinc-800"
                      : "text-[var(--txai-red)] hover:bg-zinc-100"
                  }`}
                >
                  TIPO DE PRODUCTO
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openFilter === "productType" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {/* Style */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter(openFilter === "style" ? null : "style")}
                  className={`flex items-center gap-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                    openFilter === "style"
                      ? "bg-zinc-200 text-zinc-800"
                      : "text-[var(--txai-red)] hover:bg-zinc-100"
                  }`}
                >
                  MODELO
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openFilter === "style" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {/* Fit */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter(openFilter === "fit" ? null : "fit")}
                  className={`flex items-center gap-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                    openFilter === "fit"
                      ? "bg-zinc-200 text-zinc-800"
                      : "text-[var(--txai-red)] hover:bg-zinc-100"
                  }`}
                >
                  AJUSTE
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openFilter === "fit" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {/* Fabric */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenFilter(openFilter === "fabric" ? null : "fabric")}
                  className={`flex items-center gap-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                    openFilter === "fabric"
                      ? "bg-zinc-200 text-zinc-800"
                      : "text-[var(--txai-red)] hover:bg-zinc-100"
                  }`}
                >
                  TELA
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openFilter === "fabric" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>
            {/* Contador de productos */}
            <div className="text-sm text-zinc-500">
              {MOCK_PRODUCTS.length} TOTAL
            </div>
          </div>
          {/* Línea separadora */}
          <div className="mt-4 border-b border-zinc-200"></div>
        </div>

        {/* Filtros seleccionados + Eliminar todo */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={clearAllFilters}
              className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
            >
              ELIMINAR TODO
            </button>
            {activeFilterEntries.map(({ key, label, hex }) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 rounded border border-zinc-200 bg-zinc-50 pl-2 pr-1 py-1 text-sm text-zinc-800"
              >
                {key === "color" && hex != null && (
                  <span
                    className="h-3 w-3 shrink-0 rounded-full border border-zinc-300"
                    style={{ backgroundColor: hex }}
                  />
                )}
                <span>{label}</span>
                <button
                  type="button"
                  onClick={() => removeFilter(key)}
                  className="rounded p-0.5 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"
                  aria-label={`Quitar filtro ${label}`}
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Grid de product cards */}
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500">
          {MOCK_PRODUCTS.length} producto{MOCK_PRODUCTS.length !== 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}
