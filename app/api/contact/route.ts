import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
})

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
    await prisma.contactMessage.create({ data: result.data })
  }

  return Response.json({ success: true }, { status: 201 })
}
