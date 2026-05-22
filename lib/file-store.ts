import fs from 'fs'
import path from 'path'
import type { Service, BlogPost } from './types'

const dataDir = path.join(process.cwd(), 'data')
const servicesPath = path.join(dataDir, 'services.json')
const postsPath = path.join(dataDir, 'blog-posts.json')

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
}

function readJson<T>(filePath: string): T[] {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return []
  }
}

function writeJson(filePath: string, data: unknown): void {
  ensureDir()
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function getStoredServices(): Service[] {
  const raw = readJson<Record<string, unknown>>(servicesPath)
  return raw.map(r => ({
    id: r.id as string,
    title: r.title as string,
    slug: r.slug as string,
    description: r.description as string,
    shortDesc: r.shortDesc as string,
    icon: r.icon as string,
    imageUrl: (r.imageUrl as string | null | undefined) ?? undefined,
    price: (r.price as string | null | undefined) ?? undefined,
    duration: (r.duration as string | null | undefined) ?? undefined,
    benefits: r.benefits as string[],
    featured: r.featured as boolean,
    order: r.order as number,
    createdAt: new Date(r.createdAt as string),
  }))
}

export function saveServices(services: Service[]): void {
  writeJson(servicesPath, services)
}

export function getStoredPosts(): BlogPost[] {
  const raw = readJson<Record<string, unknown>>(postsPath)
  return raw.map(r => ({
    id: r.id as string,
    title: r.title as string,
    slug: r.slug as string,
    content: r.content as string,
    excerpt: r.excerpt as string,
    author: r.author as string,
    category: r.category as string,
    imageUrl: (r.imageUrl as string | null | undefined) ?? undefined,
    published: r.published as boolean,
    createdAt: new Date(r.createdAt as string),
  }))
}

export function savePosts(posts: BlogPost[]): void {
  writeJson(postsPath, posts)
}
