import type { Service, BlogPost, Review } from './types'

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Stomatologie Generală',
    slug: 'stomatologie-generala',
    shortDesc: 'Îngrijire completă pentru sănătatea orală zilnică.',
    description:
      'Oferim consultații complete, detartraj profesional, obturații estetice și tratamente preventive. Echipa noastră se asigură că fiecare vizită este confortabilă și eficientă, punând accent pe prevenție și educație dentară.',
    icon: 'tooth',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80',
    price: 'De la 150 MDL',
    duration: '30–60 min',
    benefits: [
      'Consultație și diagnostic complet',
      'Detartraj și periaj profesional',
      'Obturații din compozit estetic',
      'Tratamente preventive',
      'Educație pentru igienă orală',
    ],
    featured: true,
    order: 1,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'Implant Dentar',
    slug: 'implant-dentar',
    shortDesc: 'Soluția permanentă pentru dinții lipsă.',
    description:
      'Implanturile dentare reprezintă cea mai modernă și durabilă soluție pentru înlocuirea dinților lipsă. Folosim implanturi de ultimă generație și tehnici minim invazive pentru un rezultat estetic și funcțional perfect.',
    icon: 'implant',
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80',
    price: 'De la 8 000 MDL',
    duration: '60–90 min',
    benefits: [
      'Implant titan de calitate superioară',
      'Procedură minim invazivă',
      'Rezultat estetic natural',
      'Durabilitate pe termen lung',
      'Recuperare rapidă',
    ],
    featured: true,
    order: 2,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    title: 'Ortodonție',
    slug: 'ortodontie',
    shortDesc: 'Aliniere perfectă pentru un zâmbet de vis.',
    description:
      'Tratamentele ortodontice moderne corectează alinierea dinților și mușcătura, îmbunătățind atât estetica cât și funcția masticatorie. Oferim aparate fixe metalice și ceramice, cât și alinere transparente.',
    icon: 'braces',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
    price: 'De la 12 000 MDL',
    duration: '12–24 luni',
    benefits: [
      'Aparat fix metalic sau ceramic',
      'Alinere transparente',
      'Monitorizare lunară',
      'Plan de tratament personalizat',
      'Rezultate estetice excelente',
    ],
    featured: true,
    order: 3,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    title: 'Albire Dentară',
    slug: 'albire-dentara',
    shortDesc: 'Zâmbet strălucitor în doar o ședință.',
    description:
      'Albirea dentară profesională oferă rezultate vizibile imediat, cu până la 8 nuanțe mai albe. Folosim tehnici avansate de albire cu lumină LED și geluri certificate, sigure pentru smalțul dentar.',
    icon: 'whitening',
    imageUrl: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=600&q=80',
    price: 'De la 2 500 MDL',
    duration: '60–90 min',
    benefits: [
      'Până la 8 nuanțe mai albe',
      'Tehnologie LED avansată',
      'Procedură sigură pentru smalț',
      'Rezultate imediate',
      'Include kit pentru acasă',
    ],
    featured: true,
    order: 4,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    title: 'Estetică Dentară',
    slug: 'estetica-dentara',
    shortDesc: 'Transformă-ți zâmbetul cu fațete și coroane.',
    description:
      'Estetica dentară îmbină tehnica cu arta pentru a crea zâmbete perfecte. Oferim fațete din porțelan sau compozit, coroane estetice și remodelare dentară pentru rezultate naturale și durabile.',
    icon: 'smile',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
    price: 'De la 3 500 MDL',
    duration: '2–3 ședințe',
    benefits: [
      'Fațete din porțelan sau compozit',
      'Coroane ceramice integrate',
      'Remodelare estetică',
      'Rezultat natural și durabil',
      'Plan vizualizat digital',
    ],
    featured: true,
    order: 5,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    title: 'Pedodonție',
    slug: 'pedodontie',
    shortDesc: 'Îngrijire blândă și specializată pentru cei mici.',
    description:
      'Departamentul de pedodonție este dedicat sănătății dentare a copiilor, de la primul dinte până la dentiția permanentă. Cabinetul este amenajat special pentru a face vizita la dentist o experiență plăcută.',
    icon: 'child',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
    price: 'De la 120 MDL',
    duration: '30–45 min',
    benefits: [
      'Cabinet adaptat copiilor',
      'Tehnici non-invazive',
      'Sigilări preventive',
      'Fluorizare profesională',
      'Educație dentară pentru copii',
    ],
    featured: true,
    order: 6,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '7',
    title: 'Chirurgie Orală',
    slug: 'chirurgie-orala',
    shortDesc: 'Intervenții chirurgicale precise și sigure.',
    description:
      'Serviciile de chirurgie orală includ extracții simple și complicate, extracții de măsele de minte, chisturi dentare și intervenții pre-implantare. Folosim tehnici minim invazive pentru recuperare rapidă.',
    icon: 'surgery',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80',
    price: 'De la 500 MDL',
    duration: '30–90 min',
    benefits: [
      'Anestezie locală modernă',
      'Tehnici minim invazive',
      'Recuperare rapidă',
      'Extracții de molari incluși',
      'Îngrijire postoperatorie completă',
    ],
    featured: false,
    order: 7,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '8',
    title: 'Parodontologie',
    slug: 'parodontologie',
    shortDesc: 'Sănătatea gingiilor, fundația zâmbetului tău.',
    description:
      'Parodontologia tratează bolile gingiilor și țesuturilor de susținere a dinților. Diagnosticăm și tratăm gingivita și parodontita folosind tehnici non-chirurgicale și chirurgicale.',
    icon: 'gum',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
    price: 'De la 350 MDL',
    duration: '45–60 min',
    benefits: [
      'Chiuretaj supragingival și subgingival',
      'Tratament parodontal chirurgical',
      'Igienizare profesională periodică',
      'Sfaturi personalizate de igienă',
      'Monitorizare regulată',
    ],
    featured: false,
    order: 8,
    createdAt: new Date('2024-01-01'),
  },
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cum să menții o igienă orală perfectă acasă',
    slug: 'igiena-orala-perfecta-acasa',
    excerpt:
      'Descoperă secretele unui zâmbet sănătos: tehnica corectă de periaj, importanța aței dentare și produsele recomandate de specialiștii noștri.',
    content: `
# Cum să menții o igienă orală perfectă acasă

O igienă orală corectă este fundația unui zâmbet sănătos și durabil. Iată recomandările specialiștilor Zubmed pentru o rutină zilnică eficientă.

## Periajul dentar corect

Periajul dinților trebuie efectuat de cel puțin două ori pe zi, dimineața și seara înainte de culcare. Folosiți o periuță cu peri moi sau medii și pastă de dinți cu fluor.

**Tehnica recomandată:**
1. Plasați periuța la 45° față de gingie
2. Efectuați mișcări circulare sau verticale mici
3. Periați fiecare suprafață timp de 2-3 secunde
4. Nu uitați de suprafața interioară și de masticație
5. Periajul complet durează minimum 2 minute

## Ața dentară – un pas esențial

Ața dentară elimină resturile alimentare și placa bacteriană dintre dinți, zone pe care periuța nu le poate atinge. Utilizați zilnic, înainte de periaj, pentru rezultate optime.

## Apa de gură

Apa de gură cu fluor sau antibacteriană completează rutina de igienă orală, reducând bacteriile și protejând smalțul. Folosiți după periaj, nu în locul lui.

## Vizite regulate la dentist

Chiar și cu o igienă impecabilă acasă, vizitele de control la 6 luni sunt esențiale pentru detectarea timpurie a problemelor dentare.
    `,
    author: 'Dr. Elena Marinescu',
    category: 'Igienă orală',
    imageUrl:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
    published: true,
    createdAt: new Date('2024-11-15'),
  },
  {
    id: '2',
    title: 'Tot ce trebuie să știi despre implanturile dentare',
    slug: 'ghid-complet-implant-dentar',
    excerpt:
      'Implantul dentar este cea mai modernă soluție pentru înlocuirea dinților lipsă. Află cum funcționează procedura, cât durează recuperarea și la ce rezultate te poți aștepta.',
    content: `
# Tot ce trebuie să știi despre implanturile dentare

Implantul dentar reprezintă standardul de aur în stomatologia modernă pentru înlocuirea dinților lipsă. La Zubmed, folosim implanturi de ultimă generație pentru rezultate optime.

## Ce este un implant dentar?

Un implant dentar este un șurub din titan biocompatibil care se inseră în osul maxilar, înlocuind rădăcina dintelui natural. Peste implant se montează o coroană ceramică ce reproduce perfect aspectul dintelui natural.

## Procedura pas cu pas

**Evaluarea inițială:** Radiografie panoramică sau CT pentru evaluarea osului disponibil.

**Inserarea implantului:** Procedură chirurgicală minim invazivă sub anestezie locală.

**Osteointegrarea:** Perioada de 3-6 luni în care implantul se integrează în os.

**Montarea coroanei:** Confecționarea și cimentarea coroanei estetice finale.

## Avantajele implanturilor dentare

- Aspect și funcție identice cu dintele natural
- Durabilitate de 20+ ani cu îngrijire corespunzătoare
- Protejează osul alveolar
- Nu afectează dinții vecini
- Confort maxim în masticație
    `,
    author: 'Dr. Alexandru Popescu',
    category: 'Implantologie',
    imageUrl:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
    published: true,
    createdAt: new Date('2024-10-22'),
  },
  {
    id: '3',
    title: 'Când este momentul potrivit pentru aparat dentar?',
    slug: 'cand-sa-incepi-tratamentul-ortodontic',
    excerpt:
      'Vârsta optimă pentru tratament ortodontic, semnele că ai nevoie de aparat și opțiunile moderne disponibile – de la aparate fixe la alinere transparente.',
    content: `
# Când este momentul potrivit pentru aparat dentar?

Tratamentul ortodontic nu are o vârstă limită – de la copii la adulți, corecția dentiției aduce beneficii estetice și funcționale semnificative.

## Vârsta optimă pentru tratament

**Copii (7-12 ani):** Tratamentul timpuriu poate ghida dezvoltarea corectă a maxilarelor și reduce complexitatea tratamentului ulterior.

**Adolescenți (12-18 ani):** Perioada ideală pentru aparat fix – osul este flexibil, iar dinții permanenți sunt deja erupți.

**Adulți:** Nu există limită de vârstă! Alinierele transparente sunt deosebit de populare în rândul adulților.

## Semne că ai nevoie de tratament ortodontic

- Dinți suprapuși sau strânși
- Diasteme (spații între dinți)
- Mușcătură incorectă (adâncă, deschisă sau inversă)
- Dificultăți la masticație sau vorbire
- Asimetrie facială
    `,
    author: 'Dr. Ioana Constantin',
    category: 'Ortodonție',
    imageUrl:
      'https://images.unsplash.com/photo-1598256989014-de8ccb4e2e5d?w=800&q=80',
    published: true,
    createdAt: new Date('2024-09-10'),
  },
  {
    id: '4',
    title: 'Albirea dentară profesională vs. produse de acasă',
    slug: 'albire-dentara-profesionala-vs-acasa',
    excerpt:
      'Compară eficiența albirii profesionale cu produsele disponibile în farmacie. Ce alegi pentru un zâmbet strălucitor și sănătos?',
    content: `
# Albirea dentară profesională vs. produse de acasă

Toți ne dorim un zâmbet strălucitor, dar care metodă de albire este cu adevărat eficientă și sigură?

## Albirea profesională la cabinet

**Avantaje:**
- Rezultate imediate – până la 8 nuanțe mai albe într-o singură ședință
- Gel cu concentrație controlată, aplicat de specialist
- Protecție completă a gingiilor
- Rezultate uniforme și durabile

**Procedura:** Aplicarea unui gel special activat cu lumină LED pentru 45-60 de minute. Complet nedureroasă cu minime sensibilități post-procedură.

## Produse de albire de acasă

Benzile, gelurile și pasta de albire disponibile în comerț conțin concentrații reduse de peroxid, oferind rezultate limitate.

## Recomandarea specialistului

Cea mai eficientă abordare combină albirea profesională la cabinet cu un kit de mentenanță personalizat pentru acasă. Aceasta prelungește rezultatele cu 12-18 luni.
    `,
    author: 'Dr. Elena Marinescu',
    category: 'Estetică dentară',
    imageUrl:
      'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=800&q=80',
    published: true,
    createdAt: new Date('2024-08-05'),
  },
]

export const mockReviews: Review[] = [
  {
    id: '1',
    name: 'Maria Ionescu',
    rating: 5,
    comment:
      'Experiență excelentă! Medicul a fost extrem de profesionist și atent. Am venit pentru un implant și am fost impresionată de tehnica modernă și de rezultatul final. Recomand cu căldură!',
    service: 'Implant Dentar',
    approved: true,
    createdAt: new Date('2024-11-20'),
  },
  {
    id: '2',
    name: 'Andrei Popa',
    rating: 5,
    comment:
      'Am venit cu frică la dentist după mulți ani de absență. Echipa Zubmed a fost incredibil de răbdătoare și înțelegătoare. Acum vin regulat la control fără nicio anxietate.',
    service: 'Stomatologie Generală',
    approved: true,
    createdAt: new Date('2024-10-15'),
  },
  {
    id: '3',
    name: 'Cristina Dumitrescu',
    rating: 5,
    comment:
      'Albirea dentară a depășit așteptările! Rezultatul este natural și strălucitor. Personalul este amabil și profesionist. Cabinet modern, cu echipamente de ultimă generație.',
    service: 'Albire Dentară',
    approved: true,
    createdAt: new Date('2024-09-28'),
  },
  {
    id: '4',
    name: 'Bogdan Radu',
    rating: 5,
    comment:
      'Am adus întreaga familie la Zubmed – soția, copiii și eu. Toți am primit îngrijire de calitate. Pedodontul a fost extraordinar cu copiii, care acum abia așteaptă vizitele la dentist.',
    service: 'Pedodonție',
    approved: true,
    createdAt: new Date('2024-08-12'),
  },
  {
    id: '5',
    name: 'Ana-Maria Stancu',
    rating: 5,
    comment:
      'Tratamentul ortodontic cu alinere transparente a fost o revelație. Discret, confortabil și cu rezultate vizibile de la prima lună. Dr. Constantin este un specialist desăvârșit.',
    service: 'Ortodonție',
    approved: true,
    createdAt: new Date('2024-07-30'),
  },
  {
    id: '6',
    name: 'Mihai Gheorghe',
    rating: 5,
    comment:
      'Fațetele ceramice au transformat complet zâmbetul meu. Am investit în estetica dentară și nu regret nicio clipă. Rezultatul este absolut natural și impresionant.',
    service: 'Estetică Dentară',
    approved: true,
    createdAt: new Date('2024-06-18'),
  },
]
