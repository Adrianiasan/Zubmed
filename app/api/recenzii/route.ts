import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getApprovedReviews } from '@/lib/data'

const schema = z.object({
  name: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10),
  service: z.string().optional(),
})

export async function GET() {
  const reviews = await getApprovedReviews()
  return Response.json(reviews)
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return Response.json(
      { error: 'Validation failed', details: result.error.flatten() },
      { status: 422 },
    )
  }

  const isPlaceholder =
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL.includes('username:password')

  if (!isPlaceholder) {
    await prisma.review.create({
      data: { ...result.data, approved: false },
    })
  }

  return Response.json(
    { success: true, message: 'Recenzia ta a fost primită și va fi aprobată în curând.' },
    { status: 201 },
  )
}
