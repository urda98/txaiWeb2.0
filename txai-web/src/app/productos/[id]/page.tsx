import Link from "next/link";

type Props = { params: Promise<{ id: string }> };

export default async function ProductoPage({ params }: Props) {
  const { id } = await params;
  return (
    <main className="min-h-screen px-4 py-8 font-montserrat">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-[var(--txai-red)] hover:underline">
          ← Volver al listado
        </Link>
        <h1 className="mt-4 text-2xl font-bold">Producto {id}</h1>
        <p className="mt-2 text-zinc-600">
          Aquí irá la ficha del producto (imágenes, descripción, tallas, colores, agregar al
          carrito).
        </p>
      </div>
    </main>
  );
}
