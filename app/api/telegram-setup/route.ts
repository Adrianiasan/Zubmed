import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  const allowedKey = process.env.ADMIN_PASSWORD ?? 'zubmed2025'
  if (key !== allowedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) return NextResponse.json({ error: 'No TELEGRAM_BOT_TOKEN env var' }, { status: 500 })

  const host = req.nextUrl.origin
  const webhookUrl = `${host}/api/telegram-webhook`

  const [setRes, infoRes] = await Promise.all([
    fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: webhookUrl }),
    }),
    fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`),
  ])

  const setData = await setRes.json()
  const infoData = await infoRes.json()

  return NextResponse.json({ webhookUrl, set: setData, info: infoData })
}
