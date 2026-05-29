import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { buildKeyboard, telegramFetch, STATUS_LABELS, TERMINAL_STATUSES } from '@/lib/telegram'

const VALID_STATUSES = ['contactat', 'programat', 'finalizat', 'nu_s_a_prezentat', 'anulat']

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

    // Try to update DB if we have a real ID
    if (dbId !== 'none') {
      try {
        const record = await prisma.contactMessage.findUnique({ where: { id: dbId } })
        if (record?.status === newStatus) {
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
      } catch (err) {
        console.error('[Webhook] DB update error:', err)
      }
    }

    // Edit the Telegram message visually
    const currentText: string = message.text ?? ''
    const newText = currentText.replace(
      /📊 Status:[\s\S]*$/,
      `📊 <b>Status:</b> ${STATUS_LABELS[newStatus]}`,
    )

    const isTerminal = TERMINAL_STATUSES.includes(newStatus)

    await telegramFetch(token, 'editMessageText', {
      chat_id: message.chat.id,
      message_id: message.message_id,
      text: newText,
      parse_mode: 'HTML',
      reply_markup: isTerminal
        ? { inline_keyboard: [] }
        : buildKeyboard(dbId, newStatus),
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
