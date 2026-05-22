'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Cât de des ar trebui să merg la dentist?',
    a: 'Recomandăm vizite de control și igienizare la fiecare 6 luni. Pacienții cu risc crescut (diabet, fumători, persoane cu boli parodontale) pot necesita vizite mai frecvente, la 3-4 luni.',
  },
  {
    q: 'Este dureroasă extracția dentară?',
    a: 'Folosim anestezie locală modernă care elimină durerea în timpul procedurii. Există un ușor disconfort în primele 24-48 de ore după intervenție, gestionabil cu antiinflamatoare obișnuite.',
  },
  {
    q: 'Cât durează un implant dentar?',
    a: 'Procesul complet durează 3-6 luni și implică: inserarea implantului, o perioadă de osteointegrare (vindecarea osului), montarea bontului și a coroanei finale. Implantul în sine durează toată viața cu îngrijire corespunzătoare.',
  },
  {
    q: 'Aparatul dentar doare?',
    a: 'Montarea aparatelor fixe nu doare, însă în primele zile după montare sau ajustare există o sensibilitate la presiune. Aceasta dispare de obicei în 3-5 zile. Alinierele transparente sunt, în general, mai confortabile.',
  },
  {
    q: 'De la ce vârstă pot copiii purta aparat dentar?',
    a: 'Prima consultație ortodontică este recomandată în jurul vârstei de 7 ani, când medicul poate evalua dezvoltarea dentiției. Tratamentul activ cu aparat fix se începe de obicei după erupția dinților permanenți, în jur de 11-13 ani.',
  },
  {
    q: 'Acceptați asigurări de sănătate?',
    a: 'Lucrăm cu mai mulți asigurători privați. Vă rugăm să ne contactați pentru a verifica dacă asigurarea dumneavoastră este inclusă în lista partenerilor noștri.',
  },
  {
    q: 'Cum mă pot programa?',
    a: 'Puteți suna la +373 67 722 700, trimite un email la zubmed@gmail.com sau completa formularul de pe pagina de contact. Răspundem în maximum 24 de ore lucrătoare.',
  },
  {
    q: 'Este albirea dentară sigură?',
    a: 'Albirea profesională realizată de medicul stomatolog este complet sigură pentru smalțul dentar. Gelurile folosite sunt certificate și aplicate controlat. Sunt posibile sensibilități temporare în 24-48 de ore.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Întrebări frecvente
          </h2>
          <p className="text-slate-500">
            Răspunsuri la cele mai comune întrebări ale pacienților noștri.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium text-slate-900 text-sm sm:text-base">
                  {q}
                </span>
                <span
                  className={`w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-3.5 h-3.5 text-blue-600"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
