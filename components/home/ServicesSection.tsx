import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/lib/types'

interface Props {
  services: Service[]
}

export default function ServicesSection({ services }: Props) {
  return (
    <section id="servicii" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-14 max-w-7xl mx-auto">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Ce oferim
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Serviciile noastre dentare
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Oferim o gamă completă de tratamente stomatologice, de la prevenție
            la intervenții complexe, folosind echipamente de ultimă generație.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/servicii/${service.slug}`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 block"
            >
              {/* Imagine */}
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-sky-200" />
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Price badge */}
              {service.price && (
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {service.price}
                  </span>
                </div>
              )}

              {/* Text pe imagine */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-white text-base leading-snug mb-1">
                  {service.title}
                </h3>
                <p className="text-white/75 text-xs leading-relaxed line-clamp-2 mb-3">
                  {service.shortDesc}
                </p>
                <div className="flex items-center justify-between">
                  {service.duration ? (
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.duration}
                    </span>
                  ) : <span />}
                  <span className="text-white text-xs font-semibold flex items-center gap-1 group-hover:text-blue-300 transition-colors">
                    Detalii
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/servicii"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold border-2 border-blue-100 hover:border-blue-300 px-8 py-3 rounded-full transition-colors"
          >
            Vezi toate serviciile
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-4 h-4"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
