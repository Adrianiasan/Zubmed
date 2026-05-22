import fs from 'fs'
import path from 'path'

export interface HeroSlide {
  src: string
  alt: string
  device: 'all' | 'desktop' | 'mobile'
}

const configPath = path.join(process.cwd(), 'data', 'hero-config.json')

const defaultSlides: HeroSlide[] = [
  { src: '/zubmed_hero1.png', alt: 'Zubmed – Clinică Dentară Modernă', device: 'all' },
  { src: '/zubmed_hero2.png', alt: 'Zubmed – Cabinet Stomatologic', device: 'all' },
]

function readFromFile(): HeroSlide[] {
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  } catch {
    return defaultSlides
  }
}

function writeToFile(slides: HeroSlide[]): void {
  try {
    const dir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(configPath, JSON.stringify(slides, null, 2))
  } catch {
    // read-only filesystem (Vercel) — handled by MongoDB path
  }
}

function isMongoAvailable() {
  return (
    !!process.env.DATABASE_URL &&
    !process.env.DATABASE_URL.includes('username:password')
  )
}

export async function getHeroConfigAsync(): Promise<HeroSlide[]> {
  if (isMongoAvailable()) {
    try {
      const { prisma } = await import('./prisma')
      const setting = await prisma.setting.findUnique({ where: { key: 'hero-config' } })
      if (setting) return JSON.parse(setting.value)
    } catch {}
  }
  return readFromFile()
}

// Synchronous version for backwards compatibility (dev only)
export function getHeroConfig(): HeroSlide[] {
  return readFromFile()
}

export async function saveHeroConfig(slides: HeroSlide[]): Promise<void> {
  if (isMongoAvailable()) {
    try {
      const { prisma } = await import('./prisma')
      await prisma.setting.upsert({
        where: { key: 'hero-config' },
        update: { value: JSON.stringify(slides) },
        create: { key: 'hero-config', value: JSON.stringify(slides) },
      })
      return
    } catch {}
  }
  writeToFile(slides)
}
