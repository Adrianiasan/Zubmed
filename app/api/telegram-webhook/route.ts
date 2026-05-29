import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { buildTelegramMessage, buildKeyboard, telegramFetch, STATUS_LABELS } from '@/lib/telegram'

const VALID_STATUSES = ['in_asteptare', 'finalizat', 'rejectat']

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = process.env.TELEGRAM_BOT_TOKEN
    if (!token) return NextResponse.json({ ok: false })

    const cq = body.callback_query
    if (!cq) return NextResponse.json({ ok: true })

    const { id: callbackId, message, data } = cq

    // callback_data format: s:DBID:STATUS
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

    // Fetch record and update status
    const record = await prisma.contactMessage.findUnique({ where: { id: dbId } })
    if (!record) {
      await telegramFetch(token, 'answerCallbackQuery', {
        callback_query_id: callbackId,
        text: 'Mesajul nu a fost găsit.',
      })
      return NextResponse.json({ ok: true })
    }

    if (record.status === newStatus) {
      await telegramFetch(token, 'answerCallbackQuery', {
        callback_query_id: callbackId,
        text: `Status deja: ${STATUS_LABELS[newStatus]}`,
      })
      return NextResponse.json({ ok: true })
    }

    await prisma.contactMessage.update({
      where: { id: dbId },
      data: { status: newStatus },
    })

    // Rebuild and edit the Telegram message
    const newText = buildTelegramMessage({ ...record, status: newStatus })
    const newKeyboard = buildKeyboard(dbId, newStatus)

    await telegramFetch(token, 'editMessageText', {
      chat_id: message.chat.id,
      message_id: message.message_id,
      text: newText,
      parse_mode: 'HTML',
      reply_markup: newKeyboard,
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
