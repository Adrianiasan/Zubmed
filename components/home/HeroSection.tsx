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
      setCurrent((prev) => (prev + 1) % slides.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src + i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
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

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
