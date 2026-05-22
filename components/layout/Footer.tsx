import Link from 'next/link'
import Image from 'next/image'

const services = [
  { href: '/servicii/stomatologie-terapeutica', label: 'Stomatologie Terapeutică' },
  { href: '/servicii/chirurgie-dentara', label: 'Chirurgie Dentară' },
  { href: '/servicii/protetica-dentara', label: 'Protetică Dentară' },
  { href: '/servicii/parodontologie', label: 'Parodontologie' },
  { href: '/servicii/stomatologie-estetica', label: 'Stomatologie Estetică' },
]

const quickLinks = [
  { href: '/', label: 'Acasă' },
  { href: '/servicii', label: 'Servicii' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/zubmedlogo.png"
                alt="Zubmed"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Clinică dentară modernă dedicată sănătății și esteticii orale.
              Echipa noastră de specialiști îți oferă îngrijire completă
              într-un mediu confortabil și prietenos.
            </p>
            <div className="flex gap-3">
              {[
                {
                  label: 'Facebook',
                  path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                },
                {
                  label: 'Instagram',
                  path: 'M16 2H8a6 6 0 00-6 6v8a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6zM12 16a4 4 0 110-8 4 4 0 010 8zm4.5-9a1 1 0 110-2 1 1 0 010 2z',
                },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href={label === 'Instagram' ? 'https://www.instagram.com/zubmed.clinica/' : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Servicii</h3>
            <ul className="space-y-2.5">
              {services.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigare rapidă</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                  text: 'Str. Victoriei 69A, Comrat',
                },
                {
                  icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                  text: '+373 67 722 700',
                },
                {
                  icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                  text: 'zubmed@gmail.com',
                },
                {
                  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                  text: 'Luni–Vineri: 08:30–17:00',
                },
              ].map(({ icon, text }) => (
                <li key={text} className="flex gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-400 shrink-0 mt-0.5"
                  >
                    <path d={icon} />
                  </svg>
                  <span className="text-sm text-slate-400">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Zubmed. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Politica de confidențialitate
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Termeni și condiții
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
