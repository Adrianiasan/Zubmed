import Link from 'next/link'

const contactItems = [
  {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'Adresă',
    value: 'Str. Victoriei 69A, Comrat',
  },
  {
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    label: 'Telefon',
    value: '+373 67 722 700',
  },
  {
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    label: 'Email',
    value: 'zubmed@gmail.com',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Program',
    value: 'Luni–Vineri: 08:30–17:00',
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Suntem aici pentru tine
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Ai o întrebare sau vrei să te programezi? Contactează-ne și îți vom
            răspunde în cel mai scurt timp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="grid grid-cols-1 gap-4 content-start">
            {contactItems.map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5 text-blue-600"
                  >
                    <path d={icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400 mb-1">
                    {label}
                  </div>
                  <div className="text-sm text-slate-700 font-medium leading-relaxed">
                    {value}
                  </div>
                </div>
              </div>
            ))}

            <div className="col-span-2 rounded-2xl overflow-hidden border border-slate-100">
              <iframe
                src="https://maps.google.com/maps?q=46.3019982,28.6594422&hl=ro&z=17&output=embed"
                width="100%"
                height="224"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Trimite-ne un mesaj
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Sau accesează pagina de contact pentru formularul complet și
              programare online.
            </p>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Nume
                  </label>
                  <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-400">
                    Numele tău
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Telefon
                  </label>
                  <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-400">
                    +373 xx xxx xxx
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Mesaj
                </label>
                <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-400 h-24">
                  Mesajul tău...
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-sm"
            >
              Accesează formularul complet
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
      </div>
    </section>
  )
}
