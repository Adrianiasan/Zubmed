'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { HeroSlide } from '@/lib/hero'

interface Props {
  slides: HeroSlide[]
}

const INTERVAL = 5000

export default function HeroSection({ slides: allSlides }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const slides = allSlides.filter(s =>
    s.device === 'all' || (isMobile ? s.device === 'mobile' : s.device === 'desktop')
  ).length > 0
    ? allSlides.filter(s => s.device === 'all' || (isMobile ? s.device === 'mobile' : s.device === 'desktop'))
    : allSlides

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden py-24">
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-8" style={{ aspectRatio: '4/3' }}>
        {slides.map((slide, i) => (
          <div
            key={slide.src + i}
            className={`absolute inset-0 rounded-3xl overflow-hidden shadow-xl transition-opacity duration-1000 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
