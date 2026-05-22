'use client'

import { useTransition } from 'react'

interface Props {
  action: () => Promise<void>
  confirmMessage: string
}

export default function DeleteButton({ action, confirmMessage }: Props) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm(confirmMessage)) return
    startTransition(() => action())
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="text-red-500 hover:underline text-xs font-medium disabled:opacity-50"
    >
      {pending ? 'Se șterge...' : 'Șterge'}
    </button>
  )
}
