import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Zubmed – Clinică Dentară Modernă',
    template: '%s | Zubmed',
  },
  description:
    'Clinică dentară modernă în centrul orașului. Servicii complete de stomatologie, implantologie, ortodonție și estetică dentară. Programează-te online.',
  keywords: [
    'clinica dentara',
    'dentist',
    'implant dentar',
    'ortodontie',
    'albire dentara',
    'zubmed',
  ],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: 'Zubmed',
    title: 'Zubmed – Clinică Dentară Modernă',
    description:
      'Clinică dentară modernă. Servicii complete de stomatologie, implantologie și estetică dentară.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
