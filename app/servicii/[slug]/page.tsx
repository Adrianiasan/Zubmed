export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceBySlug } from '@/lib/data'

export async function generateMetadata(
  props: PageProps<'/servicii/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.shortDesc,
  }
}

export default async function ServicePage(props: PageProps<'/servicii/[slug]'>) {
  const { slug } = await props.params
  const service = await getServiceBySlug(slug)

  if (!service) notFound()

  return (
    <div className="pt-20 bg-white min-h-screen">

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-4">
        <nav className="flex items-center gap-1.5 text-sm text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Acasă</Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0"><path d="M9 18l6-6-6-6" /></svg>
          <Link href="/servicii" className="hover:text-blue-600 transition-colors">Servicii</Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0"><path d="M9 18l6-6-6-6" /></svg>
          <span className="text-slate-700 font-medium truncate">{service.title}</span>
        </nav>
      </div>

      {/* Hero – imagine + info */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Imagine 1:1 */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-lg shadow-slate-200/60 w-full">
            {service.imageUrl ? (
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-20 text-blue-200">
                  <path d="M12 2C9.24 2 7.08 3.62 5.82 6.02C4.92 7.72 4.5 9.82 4.5 12C4.5 15.5 5.7 19.2 7.88 20.82C8.44 21.24 9.02 21.5 9.5 21.5C10.5 21.5 11 20.56 11 19.5C11 18.44 10.6 16.92 12 16.92C13.4 16.92 13 18.44 13 19.5C13 20.56 13.5 21.5 14.5 21.5C14.98 21.5 15.56 21.24 16.12 20.82C18.3 19.2 19.5 15.5 19.5 12C19.5 9.82 19.08 7.72 18.18 6.02C16.92 3.62 14.76 2 12 2Z" />
                </svg>
              </div>
            )}
          </div>

          {/* Conținut */}
          <div className="flex flex-col gap-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {service.price && (
                <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-base font-semibold px-5 py-2 rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.price}
                </span>
              )}
              {service.duration && (
                <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-base font-medium px-5 py-2 rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.duration}
                </span>
              )}
            </div>

            {/* Titlu + descriere */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
                {service.title}
              </h1>
              <p className="text-slate-600 leading-relaxed text-lg">
                {service.description}
              </p>
            </div>

            {/* Beneficii */}
            <div>
              <h2 className="text-base font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Ce include
              </h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-50 border border-green-200 rounded-full flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-green-600">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm shadow-sm shadow-blue-200"
              >
                Programează-te
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="tel:+40721000000"
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold px-7 py-3 rounded-full transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Sună acum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
              label: 'Siguranță garantată',
              desc: 'Materiale certificate și protocoale de sterilizare stricte.',
            },
            {
              icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
              label: 'Specialiști dedicați',
              desc: 'Medici cu experiență și formare continuă în domeniu.',
            },
            {
              icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
              label: 'Pacient în centru',
              desc: 'Fiecare tratament este personalizat nevoilor tale.',
            },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-blue-600">
                  <path d={icon} />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm mb-0.5">{label}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        <Link
          href="/servicii"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-medium text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Înapoi la toate serviciile
        </Link>
      </div>

    </div>
  )
}
