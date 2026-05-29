'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const contactSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email('Adresa de email nu este validă').optional().or(z.literal('')),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere'),
})

export type ContactFormState = {
  success?: boolean
  error?: string
  fieldErrors?: Partial<Record<string, string[]>>
}

async function sendTelegramNotification(data: {
  name: string
  email?: string
  phone?: string
  subject?: string
  message: string
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const lines = [
    `📩 *Mesaj nou – Zubmed*`,
    ``,
    `👤 *Nume:* ${data.name}`,
    `📧 *Email:* ${data.email}`,
    data.phone ? `📞 *Telefon:* ${data.phone}` : null,
    data.subject ? `🦷 *Serviciu:* ${data.subject}` : null,
    ``,
    `💬 *Mesaj:*`,
    data.message,
  ].filter(l => l !== null).join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines,
        parse_mode: 'Markdown',
      }),
    })
  } catch {
    // Telegram notification failure should not block form submission
  }
}

export async function submitContact(
  _prev: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: (formData.get('email') as string) || undefined,
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
      await prisma.contactMessage.create({
        data: {
          ...result.data,
          email: result.data.email ?? '',
        },
      })
    }

    await sendTelegramNotification(result.data)

    revalidatePath('/contact')
    return { success: true }
  } catch {
    return {
      error: 'A apărut o eroare. Vă rugăm să încercați din nou.',
    }
  }
}
