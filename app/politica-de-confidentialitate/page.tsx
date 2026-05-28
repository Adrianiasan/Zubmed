import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politica de confidențialitate – Zubmed',
  description: 'Politica de confidențialitate a clinicii dentare Zubmed. Aflați cum colectăm, utilizăm și protejăm datele dumneavoastră personale.',
}

export default function PoliticaConfidentialitate() {
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
            Politica de confidențialitate
          </h1>
          <p className="text-slate-500 text-sm">
            Ultima actualizare: mai 2025
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introducere</h2>
            <p className="text-slate-600 leading-relaxed">
              Clinica dentară <strong>Zubmed</strong> (denumită în continuare „Compania", „noi" sau „clinica"), cu sediul în
              Str. Victoriei 69A, Comrat, Republica Moldova, se angajează să protejeze confidențialitatea datelor
              dumneavoastră personale. Prezenta politică descrie ce date colectăm, cum le utilizăm și care sunt
              drepturile dumneavoastră.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Datele pe care le colectăm</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Colectăm date personale în momentul în care:
            </p>
            <ul className="space-y-2 text-slate-600">
              {[
                'Completați formularul de contact sau de programare de pe site-ul nostru',
                'Ne contactați telefonic sau prin email',
                'Vă înregistrați ca pacient la clinică',
                'Navigați pe site-ul nostru (date de navigare colectate prin cookie-uri tehnice)',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-slate-600 leading-relaxed mt-3">
              Categoriile de date colectate includ: <strong>nume complet, număr de telefon, adresă de email</strong>,
              mesajul transmis, date medicale relevante tratamentului stomatologic (colectate exclusiv la clinică),
              și date tehnice (adresă IP, tip browser).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Scopul prelucrării datelor</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Datele personale sunt prelucrate în scopuri precum:
            </p>
            <ul className="space-y-2 text-slate-600">
              {[
                'Gestionarea programărilor și consultațiilor stomatologice',
                'Răspunsul la întrebările și solicitările transmise prin formularul de contact',
                'Trimiterea de confirmări sau remindere de programare',
                'Îndeplinirea obligațiilor legale și contabile',
                'Îmbunătățirea serviciilor și a experienței pe site',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Temeiul legal al prelucrării</h2>
            <p className="text-slate-600 leading-relaxed">
              Prelucrăm datele dumneavoastră pe baza: <strong>consimțământului</strong> exprimat la transmiterea
              formularului, <strong>executării unui contract</strong> (prestarea serviciilor medicale),
              <strong> obligației legale</strong> (legislație medicală și fiscală) și <strong>interesului
              legitim</strong> al clinicii de a-și desfășura activitatea.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Păstrarea datelor</h2>
            <p className="text-slate-600 leading-relaxed">
              Datele personale sunt păstrate atât timp cât este necesar pentru îndeplinirea scopurilor menționate
              sau conform cerințelor legale (de exemplu, dosarele medicale se păstrează minimum <strong>10 ani</strong>
              conform legislației din Republica Moldova). Datele transmise prin formularul de contact se șterg
              în termen de <strong>2 ani</strong> de la ultimul contact.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Partajarea datelor cu terți</h2>
            <p className="text-slate-600 leading-relaxed">
              Nu vindem și nu transferăm datele dumneavoastră personale unor terți în scopuri comerciale.
              Datele pot fi transmise exclusiv: laboratoarelor dentare partenere (strict pentru realizarea
              lucrărilor protetice), autorităților publice (la cerere legală), și furnizorilor de servicii IT
              care asigură funcționarea site-ului (cu clauze de confidențialitate stricte).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Drepturile dumneavoastră</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Aveți dreptul să:
            </p>
            <ul className="space-y-2 text-slate-600">
              {[
                'Accesați datele personale pe care le deținem despre dumneavoastră',
                'Solicitați rectificarea datelor inexacte',
                'Solicitați ștergerea datelor („dreptul de a fi uitat"), în limitele legii',
                'Vă opuneți prelucrării sau solicitați restricționarea acesteia',
                'Retrageți consimțământul în orice moment',
                'Depuneți o plângere la autoritatea competentă din Republica Moldova',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Cookie-uri</h2>
            <p className="text-slate-600 leading-relaxed">
              Site-ul nostru utilizează exclusiv cookie-uri tehnice esențiale pentru funcționarea corectă
              (de exemplu, sesiunea de navigare). Nu utilizăm cookie-uri de marketing sau de tracking terț.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Securitatea datelor</h2>
            <p className="text-slate-600 leading-relaxed">
              Implementăm măsuri tehnice și organizatorice adecvate pentru protecția datelor dumneavoastră
              împotriva accesului neautorizat, pierderii sau divulgării: conexiune HTTPS, acces restricționat
              la sisteme, personal instruit privind confidențialitatea.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Pentru orice întrebare sau exercitarea drepturilor dumneavoastră, ne puteți contacta la:
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
