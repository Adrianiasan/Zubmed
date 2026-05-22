'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const contactSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email('Adresa de email nu este validă'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere'),
})

export type ContactFormState = {
  success?: boolean
  error?: string
  fieldErrors?: Partial<Record<string, string[]>>
}

export async function submitContact(
  _prev: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: (formData.get('phone') as string) || undefined,
    subject: (formData.get('subject') as string) || undefined,
    message: formData.get('message') as string,
  }

  const result = contactSchema.safeParse(raw)

  if (!result.success) {
    return {
      error: 'Vă rugăm să corectați erorile de mai jos.',
      fieldErrors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const isPlaceholder =
      !process.env.DATABASE_URL ||
      process.env.DATABASE_URL.includes('username:password')

    if (!isPlaceholder) {
      await prisma.contactMessage.create({ data: result.data })
    }

    revalidatePath('/contact')
    return { success: true }
  } catch {
    return {
      error: 'A apărut o eroare. Vă rugăm să încercați din nou.',
    }
  }
}
