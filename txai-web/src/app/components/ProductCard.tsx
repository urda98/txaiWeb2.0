"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/types/products";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(price);
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const tagLabel =
    product.tag === "best_seller" ? "MÁS VENDIDO" : product.tag === "new" ? "NUEVO" : null;

  const goToProduct = () => router.push(`/productos/${product.id}`);

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded bg-zinc-100">
        <button
          type="button"
          onClick={goToProduct}
          className="absolute inset-0 z-0 block h-full w-full cursor-pointer border-0 bg-transparent p-0"
          aria-label={`Ver ${product.name}`}
        >
          <span className="sr-only">Ver detalle</span>
        </button>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="pointer-events-none object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            role="presentation"
            className="pointer-events-none flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-400"
          >
            Sin imagen
          </div>
        )}

        {/* Botón + al hacer hover (añadir al carrito) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: añadir al carrito
          }}
          className="absolute bottom-2 right-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Añadir al carrito"
        >
          <Plus className="h-5 w-5 text-[var(--foreground)]" strokeWidth={2.5} />
        </button>
      </div>

      <Link href={`/productos/${product.id}`} className="mt-2 flex flex-col">
        {/* Tag, nombre, precio */}
        {tagLabel && (
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--txai-red)]">
            {tagLabel}
          </p>
        )}
        <h3 className="mt-1 font-montserrat font-semibold text-[var(--foreground)]">
          {product.name}
        </h3>
        <p className="mt-0.5 font-montserrat text-sm font-medium text-[var(--foreground)]">
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
      </Link>
    </article>
  );
}
