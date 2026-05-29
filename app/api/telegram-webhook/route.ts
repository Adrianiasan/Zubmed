import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { buildKeyboard, telegramFetch, STATUS_LABELS, TERMINAL_STATUSES } from '@/lib/telegram'

const VALID_STATUSES = ['contactat', 'programat', 'finalizat', 'nu_s_a_prezentat', 'anulat']

// message.text from Telegram is plain text (no HTML tags) — re-add bold formatting
function rebuildAsHtml(plainText: string, newStatus: string): string {
  return plainText
    .replace('📩 Mesaj nou – Zubmed', '📩 <b>Mesaj nou – Zubmed</b>')
    .replace('👤 Nume:', '👤 <b>Nume:</b>')
    .replace('📧 Email:', '📧 <b>Email:</b>')
    .replace('📞 Telefon:', '📞 <b>Telefon:</b>')
    .replace('🦷 Serviciu:', '🦷 <b>Serviciu:</b>')
    .replace('💬 Mesaj:', '💬 <b>Mesaj:</b>')
    .replace(/📊 Status:[\s\S]*$/, `📊 <b>Status:</b> ${STATUS_LABELS[newStatus]}`)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = process.env.TELEGRAM_BOT_TOKEN
    if (!token) return NextResponse.json({ ok: false })

    const cq = body.callback_query
    if (!cq) return NextResponse.json({ ok: true })

    const { id: callbackId, message, data } = cq

    if (!data?.startsWith('s:')) {
      await telegramFetch(token, 'answerCallbackQuery', { callback_query_id: callbackId })
      return NextResponse.json({ ok: true })
    }

    const parts = data.split(':')
    const dbId = parts[1]
    const newStatus = parts[2]

    if (!dbId || !VALID_STATUSES.includes(newStatus)) {
      await telegramFetch(token, 'answerCallbackQuery', { callback_query_id: callbackId })
      return NextResponse.json({ ok: true })
    }

    // Update DB if we have a real ID
    if (dbId !== 'none') {
      try {
        await prisma.contactMessage.update({
          where: { id: dbId },
          data: { status: newStatus },
        })
      } catch (err) {
        console.error('[Webhook] DB update error:', err)
      }
    }

    const chatId = message.chat.id
    const isTerminal = TERMINAL_STATUSES.includes(newStatus)
    const newHtml = rebuildAsHtml(message.text ?? '', newStatus)

    // Delete the original message then re-send with updated status
    await telegramFetch(token, 'deleteMessage', {
      chat_id: chatId,
      message_id: message.message_id,
    })

    await telegramFetch(token, 'sendMessage', {
      chat_id: chatId,
      text: newHtml,
      parse_mode: 'HTML',
      ...(isTerminal ? {} : { reply_markup: buildKeyboard(dbId, newStatus) }),
    })

    await telegramFetch(token, 'answerCallbackQuery', {
      callback_query_id: callbackId,
      text: `✓ ${STATUS_LABELS[newStatus]}`,
    })
  } catch (err) {
    console.error('[Webhook] error:', err)
  }

  return NextResponse.json({ ok: true })
}
