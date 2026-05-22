'use client'

import { useState, useEffect } from 'react'
import { updateHeroConfig } from '../actions'
import type { HeroSlide } from '@/lib/hero'

const defaultSlide = (): HeroSlide => ({ src: '', alt: '', device: 'all' })

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/hero-config')
      .then(r => r.json())
      .then(setSlides)
      .catch(() => setSlides([
        { src: '/zubmed_hero1.png', alt: 'Zubmed – Clinică Dentară Modernă', device: 'all' },
        { src: '/zubmed_hero2.png', alt: 'Zubmed – Cabinet Stomatologic', device: 'all' },
      ]))
  }, [])

  async function handleSave() {
    setLoading(true)
    await updateHeroConfig(slides)
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateSlide(i: number, field: keyof HeroSlide, value: string) {
    setSlides(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s))
  }

  function addSlide() {
    setSlides(prev => [...prev, defaultSlide()])
  }

  function removeSlide(i: number) {
    setSlides(prev => prev.filter((_, idx) => idx !== i))
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Imagini Hero</h1>
      <p className="text-slate-500 text-sm mb-8">
        Gestionează imaginile din slider-ul principal. Poți seta imagini diferite pentru desktop și telefon.
      </p>

      <div className="space-y-4 mb-6">
        {slides.map((slide, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-700">Slide {i + 1}</span>
              <button onClick={() => removeSlide(i)} className="text-red-400 hover:text-red-600 text-xs font-medium">
                Șterge
              </button>
            </div>

            {slide.src && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  URL imagine (din /public sau URL extern)
                </label>
                <input
                  type="text"
                  value={slide.src}
                  onChange={e => updateSlide(i, 'src', e.target.value)}
                  placeholder="/zubmed_hero1.png sau https://..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Text alternativ</label>
                <input
                  type="text"
                  value={slide.alt}
                  onChange={e => updateSlide(i, 'alt', e.target.value)}
                  placeholder="Descriere imagine"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Afișare pe</label>
                <select
                  value={slide.device}
                  onChange={e => updateSlide(i, 'device', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">Toate dispozitivele</option>
                  <option value="desktop">Doar desktop</option>
                  <option value="mobile">Doar telefon</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addSlide} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
          + Adaugă slide
        </button>
        <button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
          {loading ? 'Se salvează...' : saved ? '✓ Salvat!' : 'Salvează config'}
        </button>
      </div>
    </div>
  )
}
