'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getStoredServices, saveServices, getStoredPosts, savePosts } from '@/lib/file-store'
import { saveHeroConfig } from '@/lib/hero'
import { isMongoAvailable } from '@/lib/data'
import type { HeroSlide } from '@/lib/hero'

// Seeds MongoDB from JSON files if collections are empty
async function ensureSeeded() {
  if (!isMongoAvailable()) return
  try {
    const [svcCount, postCount] = await Promise.all([
      prisma.service.count(),
      prisma.blogPost.count(),
    ])
    if (svcCount === 0) {
      const services = getStoredServices()
      for (const s of services) {
        await prisma.service.upsert({
          where: { slug: s.slug },
          update: {},
          create: {
            title: s.title, slug: s.slug, shortDesc: s.shortDesc,
            description: s.description, icon: s.icon,
            imageUrl: s.imageUrl ?? null, price: s.price ?? null,
            duration: s.duration ?? null, benefits: s.benefits,
            featured: s.featured, order: s.order,
          },
        })
      }
    }
    if (postCount === 0) {
      const posts = getStoredPosts()
      for (const p of posts) {
        await prisma.blogPost.upsert({
          where: { slug: p.slug },
          update: {},
          create: {
            title: p.title, slug: p.slug, excerpt: p.excerpt,
            content: p.content, author: p.author, category: p.category,
            imageUrl: p.imageUrl ?? null, published: p.published,
          },
        })
      }
    }
  } catch {}
}

// ─── Auth ───────────────────────────────────────────────
export async function loginAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? 'zubmed2025'
  if (password !== expected) return { error: 'Parolă incorectă' }
  const store = await cookies()
  store.set('admin_session', btoa(expected), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  redirect('/admin')
}

export async function logoutAdmin() {
  const store = await cookies()
  store.delete('admin_session')
  redirect('/admin/login')
}

// ─── Services ───────────────────────────────────────────
export async function createService(data: {
  title: string; slug: string; shortDesc: string; description: string
  icon: string; imageUrl: string; price: string; duration: string
  benefits: string; featured: boolean; order: number
}) {
  const mapped = {
    title: data.title, slug: data.slug, shortDesc: data.shortDesc,
    description: data.description, icon: data.icon || 'tooth',
    imageUrl: data.imageUrl || null, price: data.price || null,
    duration: data.duration || null,
    benefits: data.benefits.split('\n').map(b => b.trim()).filter(Boolean),
    featured: data.featured, order: data.order,
  }
  if (isMongoAvailable()) {
    await ensureSeeded()
    await prisma.service.create({ data: mapped })
  } else {
    const services = getStoredServices()
    services.push({ ...mapped, id: crypto.randomUUID(), imageUrl: mapped.imageUrl ?? undefined, price: mapped.price ?? undefined, duration: mapped.duration ?? undefined, createdAt: new Date() })
    saveServices(services)
  }
  revalidatePath('/servicii')
  revalidatePath('/')
  redirect('/admin/servicii')
}

export async function updateService(id: string, data: {
  title: string; slug: string; shortDesc: string; description: string
  icon: string; imageUrl: string; price: string; duration: string
  benefits: string; featured: boolean; order: number
}) {
  const mapped = {
    title: data.title, slug: data.slug, shortDesc: data.shortDesc,
    description: data.description, icon: data.icon || 'tooth',
    imageUrl: data.imageUrl || null, price: data.price || null,
    duration: data.duration || null,
    benefits: data.benefits.split('\n').map(b => b.trim()).filter(Boolean),
    featured: data.featured, order: data.order,
  }
  if (isMongoAvailable()) {
    await ensureSeeded()
    await prisma.service.upsert({
      where: { slug: data.slug },
      update: mapped,
      create: mapped,
    })
  } else {
    const services = getStoredServices()
    const idx = services.findIndex(s => s.id === id)
    if (idx !== -1) {
      services[idx] = { ...services[idx], ...mapped, imageUrl: mapped.imageUrl ?? undefined, price: mapped.price ?? undefined, duration: mapped.duration ?? undefined }
      saveServices(services)
    }
  }
  revalidatePath('/servicii')
  revalidatePath(`/servicii/${data.slug}`)
  revalidatePath('/')
  redirect('/admin/servicii')
}

export async function deleteService(id: string) {
  if (isMongoAvailable()) {
    await ensureSeeded()
    // Find slug (id may be from file store or MongoDB)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)
    if (isObjectId) {
      await prisma.service.delete({ where: { id } })
    } else {
      const stored = getStoredServices().find(s => s.id === id)
      if (stored) await prisma.service.deleteMany({ where: { slug: stored.slug } })
    }
  } else {
    saveServices(getStoredServices().filter(s => s.id !== id))
  }
  revalidatePath('/servicii')
  revalidatePath('/')
  redirect('/admin/servicii')
}

// ─── Blog ────────────────────────────────────────────────
export async function createBlogPost(data: {
  title: string; slug: string; excerpt: string; content: string
  author: string; category: string; imageUrl: string; published: boolean
}) {
  const mapped = {
    title: data.title, slug: data.slug, excerpt: data.excerpt,
    content: data.content, author: data.author, category: data.category,
    imageUrl: data.imageUrl || null, published: data.published,
  }
  if (isMongoAvailable()) {
    await ensureSeeded()
    await prisma.blogPost.create({ data: mapped })
  } else {
    const posts = getStoredPosts()
    posts.push({ ...mapped, id: crypto.randomUUID(), imageUrl: mapped.imageUrl ?? undefined, createdAt: new Date() })
    savePosts(posts)
  }
  revalidatePath('/blog')
  revalidatePath('/')
  redirect('/admin/blog')
}

export async function updateBlogPost(id: string, data: {
  title: string; slug: string; excerpt: string; content: string
  author: string; category: string; imageUrl: string; published: boolean
}) {
  const mapped = {
    title: data.title, slug: data.slug, excerpt: data.excerpt,
    content: data.content, author: data.author, category: data.category,
    imageUrl: data.imageUrl || null, published: data.published,
  }
  if (isMongoAvailable()) {
    await ensureSeeded()
    await prisma.blogPost.upsert({
      where: { slug: data.slug },
      update: mapped,
      create: mapped,
    })
  } else {
    const posts = getStoredPosts()
    const idx = posts.findIndex(p => p.id === id)
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...mapped, imageUrl: mapped.imageUrl ?? undefined }
      savePosts(posts)
    }
  }
  revalidatePath('/blog')
  revalidatePath(`/blog/${data.slug}`)
  revalidatePath('/')
  redirect('/admin/blog')
}

export async function deleteBlogPost(id: string) {
  if (isMongoAvailable()) {
    await ensureSeeded()
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)
    if (isObjectId) {
      await prisma.blogPost.delete({ where: { id } })
    } else {
      const stored = getStoredPosts().find(p => p.id === id)
      if (stored) await prisma.blogPost.deleteMany({ where: { slug: stored.slug } })
    }
  } else {
    savePosts(getStoredPosts().filter(p => p.id !== id))
  }
  revalidatePath('/blog')
  revalidatePath('/')
  redirect('/admin/blog')
}

// ─── Hero ────────────────────────────────────────────────
export async function updateHeroConfig(slides: HeroSlide[]) {
  await saveHeroConfig(slides)
  revalidatePath('/')
}
