'use client'

import { useState } from 'react'
import Image from 'next/image'

const images = [
  {
    src: '/030d5bcb-c480-4983-b8f9-a0d6fa220dfa.png',
    alt: 'Clinica Zubmed',
    label: 'Clinica Zubmed',
  },
  {
    src: '/8844b16e-8bef-44ca-a2d0-cef04040bc92.png',
    alt: 'Cabinet stomatologic',
    label: 'Cabinet stomatologic',
  },
  {
    src: '/402383ae-13e9-41e0-94b2-eb1530b38f39 (2).png',
    alt: 'Echipamente moderne',
    label: 'Echipamente moderne',
  },
  {
    src: '/4418638e-13a9-4db5-b910-ce34728403d4.png',
    alt: 'Tratament dentar',
    label: 'Tratament dentar',
  },
  {
    src: '/ab2a402b-8554-4596-ac25-2a3824248bba.png',
    alt: 'Îngrijire profesională',
    label: 'Îngrijire profesională',
  },
  {
    src: '/logochatgpt.png',
    alt: 'Zubmed',
    label: 'Zubmed',
  },
]

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="galerie" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Galerie
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Clinica noastră
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Descoperă spațiile moderne și echipamentele de ultimă generație din
            cadrul clinicii Zubmed.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-100 cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-end">
                <span className="text-white text-sm font-medium p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {img.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            onClick={() => setLightbox(null)}
            aria-label="Închide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev arrow */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length) }}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              fill
              className="object-contain"
            />
          </div>

          {/* Next arrow */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length) }}
            aria-label="Următor"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                className={`h-1.5 rounded-full transition-all ${
                  i === lightbox ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
