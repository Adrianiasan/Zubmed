'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { Review } from '@/lib/types'

const INTERVAL = 4500

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-slate-300'}`}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-7 h-full flex flex-col">
      <StarRating rating={review.rating} />
      <p className="mt-4 mb-6 text-slate-600 leading-relaxed text-sm flex-1">
        &ldquo;{review.comment}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm shrink-0">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-sm text-slate-800">{review.name}</div>
          {review.service && (
            <div className="text-xs text-slate-400">{review.service}</div>
          )}
        </div>
      </div>
    </div>
  )
}

interface Props {
  reviews: Review[]
}

export default function ReviewsSection({ reviews }: Props) {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [dir, setDir] = useState<'left' | 'right'>('left')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const n = reviews.length

  const goTo = useCallback((idx: number, direction: 'left' | 'right') => {
    if (animating) return
    setDir(direction)
    setAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 350)
  }, [animating])

  const next = useCallback(() => goTo((active + 1) % n, 'left'), [active, n, goTo])
  const prev = () => goTo((active - 1 + n) % n, 'right')

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(next, INTERVAL)
  }, [next])

  useEffect(() => {
    restartTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [restartTimer])

  const visible = [
    reviews[active % n],
    reviews[(active + 1) % n],
    reviews[(active + 2) % n],
  ]

  const slideClass = animating
    ? dir === 'left'
      ? 'opacity-0 -translate-x-6'
      : 'opacity-0 translate-x-6'
    : 'opacity-100 translate-x-0'

  return (
    <section id="recenzii" className="py-20 lg:py-28 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Testimoniale
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Ce spun pacienții noștri
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Satisfacția pacienților noștri este cea mai mare recompensă. Iată
            ce spun ei despre experiența la Zubmed.
          </p>
        </div>

        {/* Desktop: 3 cards */}
        <div
          className={`hidden md:grid grid-cols-3 gap-6 transition-all duration-350 ease-out ${slideClass}`}
        >
          {visible.map((review, i) => (
            <ReviewCard key={`${active}-${i}`} review={review} />
          ))}
        </div>

        {/* Mobile: 1 card */}
        <div className={`md:hidden transition-all duration-350 ease-out ${slideClass}`}>
          <ReviewCard review={reviews[active]} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => { prev(); restartTimer() }}
            className="w-10 h-10 bg-white hover:bg-blue-600 hover:text-white border border-blue-100 rounded-full flex items-center justify-center text-slate-500 transition-colors shadow-sm"
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i, i > active ? 'left' : 'right'); restartTimer() }}
                aria-label={`Recenzie ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-blue-600' : 'w-1.5 bg-blue-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => { next(); restartTimer() }}
            className="w-10 h-10 bg-white hover:bg-blue-600 hover:text-white border border-blue-100 rounded-full flex items-center justify-center text-slate-500 transition-colors shadow-sm"
            aria-label="Următor"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
