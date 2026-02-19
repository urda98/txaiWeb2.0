"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { ProductCategory, ProductFilters } from "@/types/products";

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

export default function ProductListingSection() {
  const [filters, setFilters] = useState<ProductFilters>({ category: "all" });
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const colorDropdownRef = useRef<HTMLDivElement>(null);

  const setCategory = (category: ProductCategory) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const setColor = (color: string | null) => {
    setFilters((prev) => ({ ...prev, color: color ?? undefined }));
    setColorDropdownOpen(false);
  };

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorDropdownRef.current &&
        !colorDropdownRef.current.contains(event.target as Node)
      ) {
        setColorDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="font-montserrat">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
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

        {/* Filtro Color */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="relative" ref={colorDropdownRef}>
            <button
              type="button"
              onClick={() => setColorDropdownOpen((open) => !open)}
              className={`flex items-center gap-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                colorDropdownOpen
                  ? "bg-zinc-200 text-zinc-800"
                  : "text-[var(--txai-red)] hover:bg-zinc-100"
              }`}
            >
              COLOR
              <ChevronDown
                className={`h-4 w-4 transition-transform ${colorDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {colorDropdownOpen && (
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
        </div>

        {/* Aquí irá el grid de cards */}
        <p className="mt-6 text-center text-zinc-500">
          Categoría: {TAB_LABELS[filters.category]}
          {filters.color && ` · Color: ${filters.color}`}
        </p>
      </div>
    </section>
  );
}
