'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

// Array de datos de los banners
const banners = [
  {
    id: 1,
    title: "TXAI ESSENTIALS",
    subtitle: "Elegancia en cada guardia",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
    cta: "COMPRAR AHORA",
  },
  {
    id: 2,
    title: "NUEVOS DISEÑOS",
    subtitle: "Tecnología textil de alto rendimiento",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    cta: "VER HOMBRE",
  },
  {
    id: 3,
    title: "COLECCIÓN 2026",
    subtitle: "Confort que te acompaña todo el día",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    cta: "VER MUJER",
  }
];

export default function HeroCarrousel() {
  return (
    <div className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="h-[500px] md:h-[700px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative">
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={banner.id === 1}
              />
              {/* Overlay oscuro para legibilidad del texto */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            {/* Contenido centrado */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
              <div className="max-w-3xl space-y-6">
                <h2 className="text-white text-4xl md:text-7xl font-bold tracking-tight font-cinzel">
                  {banner.title}
                </h2>
                <p className="text-white/90 text-lg md:text-2xl font-light font-montserrat">
                  {banner.subtitle}
                </p>
                <div className="pt-4">
                  <button className="bg-white text-[var(--txai-red)] px-8 py-4 rounded-md font-bold font-montserrat hover:bg-[#6a1419] transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                    {banner.cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}