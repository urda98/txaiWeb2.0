'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    title: "COLECCIÓN 2026",
    subtitle: "Confort que te acompaña todo el día",
    image: "/assets/telasTxai.png",
    cta: "COMPRAR AHORA",
    objectFit: "cover",
    objectPosition: "center center",
  },
  {
    id: 2,
    title: "NUEVOS DISEÑOS",
    subtitle: "Tecnología textil de alto rendimiento",
    image: "/assets/mujeres.png",
    cta: "VER MUJER",
    objectFit: "cover",
    objectPosition: "50% -30%",
  },
  {
    id: 3,
    title: "TXAI",
    subtitle: "Elegancia en cada guardia",
    image: "/assets/txaiPortada.png",
    cta: "COMPRAR AHORA",
    objectFit: "cover",
    objectPosition: "50% -10%",
  }
];

export default function HeroCarrousel() {
  return (
    <div className="relative overflow-hidden h-[100vh] h-[100dvh]">
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
        className="!h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative">
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                style={{
                  objectFit: banner.objectFit as 'cover' | 'contain' | 'fill',
                  objectPosition: banner.objectPosition ?? "center center",
                }}
                priority={banner.id === 1}
              />
              {/* Overlay oscuro para legibilidad del texto */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            {/* Contenido centrado (desplazado hacia abajo) */}
            <div className="absolute inset-0 flex items-center justify-center pt-[40vh] text-center px-4 z-10">
              <div className="max-w-3xl space-y-6">
                <h2 className="text-white text-4xl md:text-7xl font-bold tracking-tight font-cinzel">
                  {banner.title}
                </h2>
                <p className="text-white/90 text-lg md:text-2xl font-light font-montserrat">
                  {banner.subtitle}
                </p>
                <div className="pt-4">
                  <button className="bg-white text-[var(--txai-red)] px-8 py-4 rounded-md font-bold font-montserrat hover:bg-[var(--txai-red)] hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">
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