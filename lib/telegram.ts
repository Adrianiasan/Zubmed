export const STATUS_LABELS: Record<string, string> = {
  in_asteptare: '🕐 În așteptare',
  contactat: '📞 Contactat',
  programat: '📅 Programat',
  finalizat: '✅ Finalizat',
  nu_s_a_prezentat: '🚫 Nu s-a prezentat',
  anulat: '❌ Anulat',
}

export const TERMINAL_STATUSES = ['finalizat', 'anulat']

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
  const btn = (status: string) => ({
    text: currentStatus === status
      ? STATUS_LABELS[status] + ' ✓'
      : STATUS_LABELS[status],
    callback_data: `s:${dbId}:${status}`,
  })
  return {
    inline_keyboard: [
      [btn('contactat'), btn('programat'), btn('nu_s_a_prezentat')],
      [btn('finalizat'), btn('anulat')],
    ],
  }
}

export async function telegramFetch(token: string, method: string, body: object) {
  return fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
