import Image from 'next/image'

const values = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Siguranță și calitate',
  },
  {
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    title: 'Echipă specializată',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Tehnologie avansată',
  },
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    title: 'Pacient în centru',
  },
]

const stats = [
  { value: '15+', label: 'ani experiență' },
  { value: '12', label: 'specialiști' },
  { value: '8 000+', label: 'pacienți' },
]

export default function AboutSection() {
  return (
    <section id="despre" className="py-20 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
      <div className="grid lg:grid-cols-2 min-h-[640px] rounded-3xl overflow-hidden shadow-sm border border-slate-100">

        {/* Imagine — full bleed */}
        <div className="relative min-h-[340px] lg:min-h-0">
          <Image
            src="/desprenoi.png"
            alt="Clinica Zubmed"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-50/20" />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 bg-white">
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest mb-3">
            Despre noi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            O clinică în care îți<br /> poți încredința zâmbetul
          </h2>
          <p className="text-slate-500 leading-relaxed mb-8 text-base max-w-lg">
            Fondată acum mai bine de 15 ani, Zubmed oferă îngrijire stomatologică
            de înaltă calitate — de la prevenție la intervenții complexe — într-un
            mediu modern, relaxant și orientat spre pacient.
          </p>

          {/* Values */}
          <ul className="space-y-3 mb-10 w-full">
            {values.map(({ icon, title }) => (
              <li key={title} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white">
                    <path d={icon} />
                  </svg>
                </div>
                <span className="text-slate-700 text-sm font-medium">{title}</span>
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-slate-200">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-blue-600">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
