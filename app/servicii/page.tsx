export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import ServiceCard from '@/components/ui/ServiceCard'
import { getServices } from '@/lib/data'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Servicii',
  description:
    'Descoperă gama completă de servicii dentare Zubmed: stomatologie generală, implant dentar, ortodonție, albire și estetică dentară.',
}

export default async function ServiciiPage() {
  const services = await getServices()

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="inline-block text-blue-600 font-semibold text-xs uppercase tracking-widest mb-3">
              Ce oferim
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Serviciile noastre
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Tratamente complete, de la prevenție la intervenții complexe —
              toate într-un cabinet modern, cu specialiști dedicați.
            </p>
          </div>
        </div>
      </section>

      {/* Grid servicii */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Ai nevoie de o consultație?
          </h2>
          <p className="text-slate-500 mb-8">
            Echipa noastră de specialiști este pregătită să îți răspundă la
            orice întrebare și să găsești cel mai potrivit tratament.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm shadow-sm shadow-blue-200"
            >
              Programează-te acum
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
            <a
              href="tel:+37367722700"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold px-7 py-3 rounded-full transition-colors text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Sună acum
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
