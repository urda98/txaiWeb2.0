import HeroCarrousel from "./components/HeroCarrousel";
import ProductListingSection from "./components/ProductListingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroCarrousel />
      <ProductListingSection />
    </main>
  );
}
