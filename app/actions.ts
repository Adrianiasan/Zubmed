'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { buildTelegramMessage, buildKeyboard, telegramFetch } from '@/lib/telegram'

const contactSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email('Adresa de email nu este validă').optional().or(z.literal('')),
  phone: z.string().min(6, 'Numărul de telefon este obligatoriu'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere'),
})

export type ContactFormState = {
  success?: boolean
  error?: string
  fieldErrors?: Partial<Record<string, string[]>>
}

async function sendTelegramNotification(
  data: { name: string; email?: string; phone: string; subject?: string; message: string },
  dbId?: string | null,
) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const text = buildTelegramMessage({ ...data, status: 'in_asteptare' })
  const replyMarkup = buildKeyboard(dbId ?? 'none', 'in_asteptare')

  try {
    await telegramFetch(token, 'sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
    })
  } catch (err) {
    console.error('[Telegram] send error:', err)
  }
}

export async function submitContact(
  _prev: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: (formData.get('email') as string) || undefined,
    phone: formData.get('phone') as string,
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
    let dbId: string | null = null

    const isPlaceholder =
      !process.env.DATABASE_URL ||
      process.env.DATABASE_URL.includes('username:password')

    if (!isPlaceholder) {
      try {
        const record = await prisma.contactMessage.create({
          data: {
            name: result.data.name,
            email: result.data.email ?? '',
            phone: result.data.phone,
            subject: result.data.subject,
            message: result.data.message,
            status: 'in_asteptare',
          },
        })
        dbId = record.id
      } catch (dbErr) {
        console.error('[Contact] Prisma error:', dbErr)
      }
    }

    await sendTelegramNotification(result.data, dbId)

    revalidatePath('/contact')
    return { success: true }
  } catch (err) {
    console.error('[Contact] Unexpected error:', err)
    return {
      error: 'A apărut o eroare. Vă rugăm să încercați din nou.',
    }
  }
}
