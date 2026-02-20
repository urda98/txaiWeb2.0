"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Heart } from "lucide-react";
import type { Product } from "@/types/products";

type ProductCardProps = {
  product: Product;
  onFavorite?: (productId: string) => void;
  isFavorite?: boolean;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(price);
}

export default function ProductCard({ product, onFavorite, isFavorite = false }: ProductCardProps) {
  const tagLabel =
    product.tag === "best_seller" ? "MÁS VENDIDO" : product.tag === "new" ? "NUEVO" : null;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(product.id);
  };

  return (
    <article className="group flex flex-col">
      <Link href={`/productos/${product.id}`} className="relative aspect-[2/3] w-full overflow-hidden rounded bg-zinc-100 block">
        {product.imageUrl ? (
          <>
            {/* Imagen principal */}
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className={`object-contain scale-[1.05] transition-all duration-500 ${
                product.hoverImageUrl ? "group-hover:opacity-0" : ""
              }`}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Imagen de hover */}
            {product.hoverImageUrl && (
              <Image
                src={product.hoverImageUrl}
                alt={product.name}
                fill
                className="object-contain scale-[1.05] opacity-0 transition-opacity duration-800 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}
          </>
        ) : (
          <div
            role="presentation"
            className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-400"
          >
            Sin imagen
          </div>
        )}

        {/* Botón corazón para favoritos */}
        {onFavorite && (
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-20 flex h-8 w-8 cursor-pointer items-center justify-center transition-all hover:scale-110"
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                isFavorite
                  ? "fill-[var(--txai-red)] text-[var(--txai-red)]"
                  : "text-gray-800"
              }`}
              strokeWidth={2}
            />
          </button>
        )}

        {/* Botón + al hacer hover (añadir al carrito) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: añadir al carrito
          }}
          className="absolute bottom-2 right-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Añadir al carrito"
        >
          <Plus className="h-5 w-5 text-[var(--foreground)]" strokeWidth={2.5} />
        </button>
      </Link>

      <div className="mt-2 flex flex-col">
        {/* Tag, nombre, precio */}
        {tagLabel && (
          <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
            {tagLabel}
          </p>
        )}
        <Link href={`/productos/${product.id}`} className="mt-1 font-montserrat font-semibold text-[#212B36] hover:underline">
          {product.name}
        </Link>
        <p className="mt-0.5 font-montserrat text-sm font-medium text-[#212B36]">
          {formatPrice(product.price)}
        </p>

        {/* Circulitos de color */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.id}
              className="h-3 w-3 rounded-full border border-zinc-300"
              style={{ backgroundColor: c.hex ?? "#ccc" }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
