import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termeni și condiții – Zubmed',
  description: 'Termenii și condițiile de utilizare a site-ului și serviciilor clinicii dentare Zubmed.',
}

export default function TermeniSiConditii() {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-600 transition-colors mb-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Înapoi acasă
          </Link>
          <span className="inline-block text-blue-600 font-semibold text-xs uppercase tracking-widest mb-3">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Termeni și condiții
          </h1>
          <p className="text-slate-500 text-sm">
            Ultima actualizare: mai 2025
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Despre acest document</h2>
            <p className="text-slate-600 leading-relaxed">
              Prezentul document stabilește termenii și condițiile de utilizare a site-ului web
              <strong> zubmed.md</strong> (denumit în continuare „site-ul"), operat de clinica dentară
              <strong> Zubmed</strong>, cu sediul în Str. Victoriei 69A, Comrat, Republica Moldova.
              Prin accesarea și utilizarea site-ului, acceptați în întregime acești termeni.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Utilizarea site-ului</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Site-ul este destinat exclusiv informării despre serviciile clinicii și facilitării contactului
              cu aceasta. Vă angajați să nu utilizați site-ul pentru:
            </p>
            <ul className="space-y-2 text-slate-600">
              {[
                'Activități ilegale sau frauduloase',
                'Transmiterea de conținut ofensator, fals sau dăunător',
                'Interferarea cu funcționarea tehnică a site-ului',
                'Colectarea automată de date fără acordul nostru scris',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Programări și formularul de contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Formularul de contact de pe site facilitează trimiterea unei cereri de programare sau a
              unei întrebări. Completarea formularului <strong>nu garantează automat o programare</strong> —
              aceasta se confirmă ulterior de personalul clinicii prin telefon sau email. Vă rugăm să
              furnizați informații corecte și complete pentru a putea fi contactați.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Conținut medical — Disclaimer</h2>
            <p className="text-slate-600 leading-relaxed">
              Informațiile publicate pe site (articole de blog, descrieri de servicii, întrebări frecvente)
              au caracter <strong>strict informativ și educațional</strong>. Acestea nu reprezintă consultație
              medicală și nu înlocuiesc diagnosticul sau recomandările unui medic stomatolog. Orice decizie
              medicală trebuie luată în urma unei consultații directe cu un specialist calificat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Proprietate intelectuală</h2>
            <p className="text-slate-600 leading-relaxed">
              Întregul conținut al site-ului — inclusiv texte, imagini, logo-uri, grafice, design și cod sursă —
              este proprietatea exclusivă a <strong>Zubmed</strong> sau este utilizat cu acordul titularilor
              de drepturi. Reproducerea, distribuirea sau utilizarea oricărui conținut fără acordul scris
              al Zubmed este interzisă.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Limitarea răspunderii</h2>
            <p className="text-slate-600 leading-relaxed">
              Zubmed nu poate fi ținută responsabilă pentru eventuale erori sau omisiuni în informațiile
              publicate pe site, pentru întreruperi temporare ale accesului la site cauzate de factori
              tehnici sau de forță majoră, sau pentru utilizarea inadecvată a informațiilor medicale
              prezentate în scop informativ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Linkuri externe</h2>
            <p className="text-slate-600 leading-relaxed">
              Site-ul poate conține linkuri către resurse externe (ex. Google Maps). Zubmed nu controlează
              și nu este responsabilă pentru conținutul, politicile de confidențialitate sau practicile
              site-urilor terțe. Accesarea acestora se face pe propria răspundere.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Modificarea termenilor</h2>
            <p className="text-slate-600 leading-relaxed">
              Zubmed își rezervă dreptul de a modifica oricând acești termeni și condiții. Modificările
              intră în vigoare la data publicării pe site. Utilizarea în continuare a site-ului după
              publicarea modificărilor constituie acceptarea noilor termeni.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Legislație aplicabilă</h2>
            <p className="text-slate-600 leading-relaxed">
              Prezenții termeni sunt guvernați de legislația <strong>Republicii Moldova</strong>.
              Orice litigiu apărut în legătură cu utilizarea site-ului va fi soluționat pe cale amiabilă
              sau, în caz de eșec, de instanțele competente din Republica Moldova.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Pentru întrebări referitoare la acești termeni, ne puteți contacta la:
            </p>
            <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <p className="text-slate-700 text-sm"><strong>Zubmed</strong> – Clinică Dentară</p>
              <p className="text-slate-600 text-sm">Str. Victoriei 69A, Comrat, Republica Moldova</p>
              <p className="text-slate-600 text-sm">
                Email:{' '}
                <a href="mailto:zubmed@gmail.com" className="text-blue-600 hover:underline">
                  zubmed@gmail.com
                </a>
              </p>
              <p className="text-slate-600 text-sm">
                Telefon:{' '}
                <a href="tel:+37367722700" className="text-blue-600 hover:underline">
                  +373 67 722 700
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
