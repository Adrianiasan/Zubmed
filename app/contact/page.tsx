import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactează clinica Zubmed pentru programări, întrebări sau informații. Suntem disponibili Luni–Vineri 09:00–19:00.',
}

const contactDetails = [
  {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'Adresă',
    value: 'Str. Victoriei 69A',
    sub: 'Comrat, Moldova',
    href: 'https://www.google.com/maps/place/S.R.L.+ZUBMED/@46.3018267,28.6591793,143m/data=!3m1!1e3!4m8!3m7!1s0x40c9d911b30f7249:0x81d3d67b3971b3f5!8m2!3d46.3019982!4d28.6594422!9m1!1b1!16s%2Fg%2F11tj3s40nw?entry=ttu&g_ep=EgoyMDI2MDUxMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    label: 'Telefon',
    value: '+373 67 722 700',
    sub: 'Luni–Vineri, 08:30–17:00',
    href: 'tel:+37367722700',
  },
  {
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    label: 'Email',
    value: 'zubmed@gmail.com',
    sub: 'Răspundem în 24h',
    href: 'mailto:zubmed@gmail.com',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Program',
    value: 'Luni–Vineri: 08:30–17:00',
    sub: 'Sâmbătă–Duminică: închis',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-block text-blue-600 font-semibold text-xs uppercase tracking-widest mb-2">
              Contactează-ne
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Suntem aici pentru tine
            </h1>
          </div>
          {/* Formular mare */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-5 sm:p-8 lg:p-12 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Trimite-ne un mesaj</h2>
            <p className="text-slate-500 text-sm mb-8">Completează formularul și te vom contacta în maxim 24 de ore.</p>
            <ContactForm />
          </div>

          {/* Detalii contact sub formular */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {contactDetails.map(({ icon, label, value, sub, href }) => (
              <div key={label} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-blue-600">
                    <path d={icon} />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{label}</div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-800 font-semibold text-sm hover:text-blue-600 transition-colors block truncate">
                      {value}
                    </a>
                  ) : (
                    <div className="text-slate-800 font-semibold text-sm truncate">{value}</div>
                  )}
                  <div className="text-xs text-slate-400 truncate">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hartă full-width */}
      <div className="h-96 w-full">
        <iframe
          src="https://maps.google.com/maps?q=46.3019982,28.6594422&hl=ro&z=17&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Locație Zubmed"
        />
      </div>
    </div>
  )
}
