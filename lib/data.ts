import { prisma } from './prisma'
import { getStoredServices, getStoredPosts } from './file-store'
import { mockReviews } from './mock-data'
import type { Service, BlogPost, Review } from './types'

export function isMongoAvailable() {
  return (
    !!process.env.DATABASE_URL &&
    !process.env.DATABASE_URL.includes('username:password')
  )
}

function mapService(r: {
  id: string; title: string; slug: string; description: string
  shortDesc: string; icon: string; imageUrl: string | null
  price: string | null; duration: string | null; benefits: string[]
  featured: boolean; order: number; createdAt: Date
}): Service {
  return {
    id: r.id, title: r.title, slug: r.slug,
    description: r.description, shortDesc: r.shortDesc, icon: r.icon,
    imageUrl: r.imageUrl ?? undefined, price: r.price ?? undefined,
    duration: r.duration ?? undefined, benefits: r.benefits,
    featured: r.featured, order: r.order, createdAt: r.createdAt,
  }
}

function mapPost(r: {
  id: string; title: string; slug: string; content: string
  excerpt: string; author: string; category: string; imageUrl: string | null
  published: boolean; createdAt: Date
}): BlogPost {
  return {
    id: r.id, title: r.title, slug: r.slug, content: r.content,
    excerpt: r.excerpt, author: r.author, category: r.category,
    imageUrl: r.imageUrl ?? undefined, published: r.published,
    createdAt: r.createdAt,
  }
}

// ─── Services ────────────────────────────────────────────
export async function getServices(): Promise<Service[]> {
  if (isMongoAvailable()) {
    try {
      const rows = await prisma.service.findMany({ orderBy: { order: 'asc' } })
      if (rows.length > 0) return rows.map(mapService)
    } catch {}
  }
  return getStoredServices().sort((a, b) => a.order - b.order)
}

export async function getFeaturedServices(): Promise<Service[]> {
  if (isMongoAvailable()) {
    try {
      const rows = await prisma.service.findMany({
        where: { featured: true },
        orderBy: { order: 'asc' },
      })
      if (rows.length > 0) return rows.map(mapService)
    } catch {}
  }
  return getStoredServices().filter(s => s.featured).sort((a, b) => a.order - b.order)
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (isMongoAvailable()) {
    try {
      const row = await prisma.service.findUnique({ where: { slug } })
      if (row) return mapService(row)
    } catch {}
  }
  return getStoredServices().find(s => s.slug === slug) ?? null
}

// ─── Blog ─────────────────────────────────────────────────
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (isMongoAvailable()) {
    try {
      const rows = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
      if (rows.length > 0) return rows.map(mapPost)
    } catch {}
  }
  return getStoredPosts().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (isMongoAvailable()) {
    try {
      const rows = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
      })
      if (rows.length > 0) return rows.map(mapPost)
    } catch {}
  }
  return getStoredPosts()
    .filter(p => p.published)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getLatestPosts(count = 3): Promise<BlogPost[]> {
  return (await getPublishedPosts()).slice(0, count)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isMongoAvailable()) {
    try {
      const row = await prisma.blogPost.findUnique({ where: { slug } })
      if (row) return mapPost(row)
    } catch {}
  }
  return getStoredPosts().find(p => p.slug === slug) ?? null
}

// ─── Reviews ──────────────────────────────────────────────
export async function getApprovedReviews(): Promise<Review[]> {
  return mockReviews.filter(r => r.approved)
}

export type { Service, BlogPost, Review }
