import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/lib/types'

interface Props {
  service: Service
}

export default function ServiceCard({ service }: Props) {
  return (
    <Link
      href={`/servicii/${service.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/60 transition-all duration-300"
    >
      {/* Imagine 1:1 */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-12 h-12 text-blue-300"
            >
              <path d="M12 2C9.24 2 7.08 3.62 5.82 6.02C4.92 7.72 4.5 9.82 4.5 12C4.5 15.5 5.7 19.2 7.88 20.82C8.44 21.24 9.02 21.5 9.5 21.5C10.5 21.5 11 20.56 11 19.5C11 18.44 10.6 16.92 12 16.92C13.4 16.92 13 18.44 13 19.5C13 20.56 13.5 21.5 14.5 21.5C14.98 21.5 15.56 21.24 16.12 20.82C18.3 19.2 19.5 15.5 19.5 12C19.5 9.82 19.08 7.72 18.18 6.02C16.92 3.62 14.76 2 12 2Z" />
            </svg>
          </div>
        )}

        {/* Preț badge peste imagine */}
        {service.price && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {service.price}
            </span>
          </div>
        )}
      </div>

      {/* Conținut */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 transition-colors leading-snug">
          {service.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-2">
          {service.shortDesc}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
          {service.duration ? (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {service.duration}
            </span>
          ) : (
            <span />
          )}
          <span className="text-xs font-semibold text-blue-600 group-hover:gap-2 flex items-center gap-1 transition-all">
            Detalii
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
