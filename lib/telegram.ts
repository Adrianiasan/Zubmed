export const STATUS_LABELS: Record<string, string> = {
  in_asteptare: '🟡 În așteptare',
  finalizat: '✅ Finalizat',
  rejectat: '❌ Rejectat',
}

function esc(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function buildTelegramMessage(data: {
  name: string
  email?: string | null
  phone?: string | null
  subject?: string | null
  message: string
  status?: string | null
}) {
  const statusKey = data.status ?? 'in_asteptare'
  return [
    `📩 <b>Mesaj nou – Zubmed</b>`,
    ``,
    `👤 <b>Nume:</b> ${esc(data.name)}`,
    data.email ? `📧 <b>Email:</b> ${esc(data.email)}` : null,
    data.phone ? `📞 <b>Telefon:</b> ${esc(data.phone)}` : null,
    data.subject ? `🦷 <b>Serviciu:</b> ${esc(data.subject)}` : null,
    ``,
    `💬 <b>Mesaj:</b>`,
    esc(data.message),
    ``,
    `📊 <b>Status:</b> ${STATUS_LABELS[statusKey] ?? STATUS_LABELS.in_asteptare}`,
  ].filter(Boolean).join('\n')
}

export function buildKeyboard(dbId: string, currentStatus: string) {
  return {
    inline_keyboard: [[
      {
        text: currentStatus === 'in_asteptare' ? '🟡 În așteptare ✓' : '🟡 În așteptare',
        callback_data: `s:${dbId}:in_asteptare`,
      },
      {
        text: currentStatus === 'finalizat' ? '✅ Finalizat ✓' : '✅ Finalizat',
        callback_data: `s:${dbId}:finalizat`,
      },
      {
        text: currentStatus === 'rejectat' ? '❌ Rejectat ✓' : '❌ Rejectat',
        callback_data: `s:${dbId}:rejectat`,
      },
    ]],
  }
}

export async function telegramFetch(token: string, method: string, body: object) {
  return fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
