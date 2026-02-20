"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  Star,
  Plus,
  Shirt,
  Package,
  Cloud,
  Wind,
} from "lucide-react";
import type { ColorOption } from "@/types/products";

// Tallas mostradas en PDP (incluye 2XL–6XL para la referencia)
const SIZE_OPTIONS: string[] = ["S", "M", "L", "XL"];

// --- Mock: producto detallado para la PDP ---
const GALLERY_IMAGES = [
  "/assets/hombre.png",
  "/assets/hombre1.png",
  "/assets/hombre.png",
  "/assets/hombre1.png",
  "/assets/hombre.png",
  "/assets/hombre1.png",
];

const CORE_COLORS: ColorOption[] = [
  { id: "c1", name: "Azul marino", hex: "#1e3a5f" },
  { id: "c2", name: "Negro", hex: "#171717" },
  { id: "c3", name: "Gris oscuro", hex: "#4b5563" },
  { id: "c4", name: "Gris", hex: "#6b7280" },
  { id: "c5", name: "Azul", hex: "#2563eb" },
  { id: "c6", name: "Vino", hex: "#722F37" },
  { id: "c7", name: "Verde oscuro", hex: "#166534" },
];

const LIMITED_COLORS: ColorOption[] = [
  { id: "c8", name: "Burgundy", hex: "#9f1239" },
  { id: "c9", name: "Verde claro", hex: "#22c55e" },
  { id: "c10", name: "Rosa", hex: "#ec4899" },
  { id: "c11", name: "Azul claro", hex: "#0ea5e9" },
  { id: "c12", name: "Rojo", hex: "#dc2626" },
  { id: "c13", name: "Púrpura", hex: "#7c3aed" },
  { id: "c14", name: "Teal", hex: "#14b8a6" },
  { id: "c15", name: "Azul navy alt", hex: "#1e40af" },
  { id: "c16", name: "Fucsia", hex: "#d946ef" },
  { id: "c17", name: "Naranja", hex: "#ea580c" },
];


const FEATURES = [
  { icon: Shirt, label: "AJUSTE CLÁSICO" },
  { icon: Package, label: "3 BOLSILLOS" },
  { icon: Cloud, label: "RIDICULAMENTE SUAVE" },
  { icon: Wind, label: "ANTIARRUGAS" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

type Props = { params: Promise<{ id: string }> };

export default function ProductoPage({ params }: Props) {
  const { id } = use(params);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState<string>("c1");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<"details" | "fabric" | null>(null);

  const mainImage = GALLERY_IMAGES[mainImageIndex];
  const productName = "Leon Three-Pocket Scrub Top™";
  const price = 59698;
  const reviewCount = 12023;
  const embroideryFrom = 11368;
  const breadcrumbs = [
    { label: "Para hombre", href: "/" },
    { label: "Uniformes médicos", href: "/" },
    { label: "Casacas de uniforme médico", href: "/" },
  ];
  const relatedProduct = {
    name: "Tansen Jogger Scrub Pants™",
    color: "Azul marino",
    imageUrl: "/assets/hombre1.png",
    href: "/productos/2",
  };

  return (
    <main
      className="min-h-screen bg-white font-montserrat pt-[120px] pb-16"
      data-product-id={id}
    >
      {/* Breadcrumbs: sin separación izquierda */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-zinc-600">
        {breadcrumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-1">
            <Link href={b.href} className="hover:text-[#212B36] hover:underline">
              {b.label}
            </Link>
            {i < breadcrumbs.length - 1 && (
              <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
            )}
          </span>
        ))}
      </nav>

      {/* Layout: imagen a la izquierda, ficha a la derecha (flex para forzar lado a lado) */}
      <div className="w-full max-w-[1600px] pl-10 pr-4 sm:pr-6">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-10 md:items-start">
          {/* Columna izquierda: galería — ~60% en desktop */}
          <div className="flex min-w-0 shrink-0 gap-2 md:gap-3 md:basis-[60%] md:max-w-[60%]">
          {/* Thumbnails verticales */}
          <div className="flex shrink-0 flex-col gap-1.5 sm:gap-2">
            {GALLERY_IMAGES.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMainImageIndex(i)}
                className={`relative aspect-square w-14 overflow-hidden rounded border-2 transition-colors sm:w-16 ${
                  mainImageIndex === i
                    ? "border-emerald-600"
                    : "border-transparent hover:border-zinc-300"
                }`}
              >
                <Image src={src} alt={`Vista ${i + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>

          {/* Card imagen principal: ancho limitado (ajustar max-w para más/menos ancho) */}
          <div className="relative min-w-0 flex-1 overflow-hidden bg-zinc-100 max-w-[800px] lg:max-w-[1000px]">
            <div className="relative w-full aspect-[3/4] max-h-[90vh]">
              <button
                type="button"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white"
                onClick={() =>
                  setMainImageIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))
                }
              >
                <ChevronRight className="h-5 w-5 rotate-180 text-[#212B36]" />
              </button>
              <Image
                src={mainImage}
                alt={productName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white"
                onClick={() =>
                  setMainImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
                }
              >
                <ChevronRight className="h-5 w-5 text-[#212B36]" />
              </button>
            </div>
          </div>
          </div>
          {/* Columna derecha: ficha — ~40% en desktop, siempre a la derecha de la imagen */}
          <div className="flex min-w-0 shrink-0 flex-col md:basis-[40%] md:min-w-[280px] md:grow-0 md:pl-2 lg:min-w-[320px]">
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-2xl font-semibold text-[#212B36] lg:text-3xl">{productName}</h1>
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className="shrink-0 p-1"
                aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                <Heart
                  className={`h-6 w-6 ${
                    isFavorite ? "fill-[var(--txai-red)] text-[var(--txai-red)]" : "text-zinc-600"
                  }`}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-sm text-zinc-600">({reviewCount.toLocaleString("es-AR")} Reseñas)</span>
            </div>

            <p className="mt-3 text-2xl font-semibold text-[#212B36]">{formatPrice(price)}</p>

            {/* CORE Colors */}
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                CORE Azul marino
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {CORE_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColorId(c.id)}
                    className={`relative h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      selectedColorId === c.id ? "border-[#212B36]" : "border-zinc-300"
                    }`}
                    style={{ backgroundColor: c.hex ?? "#ccc" }}
                    title={c.name}
                  >
                    {selectedColorId === c.id && (
                      <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* LIMITED EDITION Colors */}
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                LIMITED EDITION
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {LIMITED_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColorId(c.id)}
                    className={`relative h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      selectedColorId === c.id ? "border-[#212B36]" : "border-zinc-300"
                    }`}
                    style={{ backgroundColor: c.hex ?? "#ccc" }}
                    title={c.name}
                  >
                    {selectedColorId === c.id && (
                      <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Talla */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-700">TALLA</span>
                <Link href="#" className="text-sm text-[#212B36] underline hover:no-underline">
                  Tabla de tallas
                </Link>
              </div>
              <div className="mt-2 grid grid-cols-6 gap-2">
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`rounded border py-2 text-sm font-medium transition-colors ${
                      selectedSize === s
                        ? "border-[#212B36] bg-[#212B36] text-white"
                        : "border-zinc-300 bg-white text-[#212B36] hover:border-zinc-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Personalización */}
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-700">
                PERSONALIZAR
              </p>
              <button
                type="button"
                className="mt-2 flex w-full items-center justify-between rounded border border-zinc-300 bg-white px-4 py-3 text-left text-sm text-[#212B36] hover:border-zinc-400"
              >
                <span>Agregar bordado</span>
                <span className="text-zinc-600">
                  De {formatPrice(embroideryFrom)} <ChevronRight className="inline h-4 w-4" />
                </span>
              </button>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="mt-6 w-full rounded bg-[#212B36] py-4 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#323d4a] disabled:opacity-60"
              disabled={!selectedSize}
            >
              {selectedSize ? "AGREGAR A LA BOLSA" : "SELECCIONA UNA TALLA"}
            </button>

            <p className="mt-3 text-xs text-zinc-500">
              Aranceles e impuestos aplicados al momento de pagar
            </p>

            {/* Completa el conjunto */}
            <div className="mt-8 border-t border-zinc-200 pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                COMPLETA EL CONJUNTO
              </p>
              <Link
                href={relatedProduct.href}
                className="mt-3 flex items-center gap-3 rounded border border-zinc-200 p-3 hover:border-zinc-300 hover:bg-zinc-50"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-zinc-100">
                  <Image
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="font-medium text-[#212B36]">{relatedProduct.name}</p>
                  <p className="text-sm text-zinc-600">{relatedProduct.color}</p>
                </div>
              </Link>
            </div>

            {/* Accordion: Detalles y ajuste / Tela y cuidados */}
            <div className="mt-6 space-y-0 border-t border-zinc-200 pt-6">
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-[#212B36]"
                onClick={() => setOpenAccordion(openAccordion === "details" ? null : "details")}
              >
                DETALLES Y AJUSTE
                <Plus
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    openAccordion === "details" ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openAccordion === "details" && (
                <p className="pb-3 text-sm text-zinc-600">
                  Corte clásico. Tres bolsillos, manga corta, tejido suave y antiarrugas. Ideal para
                  uso médico y laboratorios.
                </p>
              )}

              <button
                type="button"
                className="flex w-full items-center justify-between border-t border-zinc-100 py-3 text-left text-sm font-medium text-[#212B36]"
                onClick={() => setOpenAccordion(openAccordion === "fabric" ? null : "fabric")}
              >
                TELA Y CUIDADOS
                <Plus
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    openAccordion === "fabric" ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openAccordion === "fabric" && (
                <p className="border-t border-zinc-100 pb-3 pt-0 text-sm text-zinc-600">
                  Poliéster y algodón. Lavar a máquina en frío, no usar secadora, planchar a baja
                  temperatura.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Franja de características (full width) */}
      <div className="mt-16 grid grid-cols-2 gap-6 border-t border-zinc-200 px-4 pt-10 md:grid-cols-4 sm:px-6">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-[#212B36]">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-600">
                {label}
              </p>
            </div>
          ))}
        </div>
    </main>
  );
}