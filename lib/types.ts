export interface Service {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  icon: string
  imageUrl?: string
  price?: string
  duration?: string
  benefits: string[]
  featured: boolean
  order: number
  createdAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  category: string
  imageUrl?: string
  published: boolean
  createdAt: Date
}

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  service?: string
  approved: boolean
  createdAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  createdAt: Date
}
