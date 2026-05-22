'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { updateService, deleteService } from '../../actions'

export default function AdminServiceEditPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [defaults, setDefaults] = useState<Record<string, string | boolean | number> | null>(null)

  useEffect(() => {
    fetch(`/api/servicii`)
      .then(r => r.json())
      .then((services: Array<Record<string, unknown>>) => {
        const s = services.find((x) => x.id === id)
        if (s) setDefaults({
          ...s as Record<string, string | boolean | number>,
          benefits: Array.isArray(s.benefits) ? (s.benefits as string[]).join('\n') : '',
        } as Record<string, string | boolean | number>)
      })
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    try {
      await updateService(id, {
        title: fd.get('title') as string,
        slug: fd.get('slug') as string,
        shortDesc: fd.get('shortDesc') as string,
        description: fd.get('description') as string,
        icon: fd.get('icon') as string,
        imageUrl: fd.get('imageUrl') as string,
        price: fd.get('price') as string,
        duration: fd.get('duration') as string,
        benefits: fd.get('benefits') as string,
        featured: fd.get('featured') === 'on',
        order: Number(fd.get('order')),
      })
    } catch {
      setError('Eroare la salvare.')
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Ștergi acest serviciu?')) return
    setDeleting(true)
    try { await deleteService(id) } catch { setDeleting(false) }
  }

  if (!defaults) return <div className="p-8 text-slate-500">Se încarcă...</div>

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Editează serviciu</h1>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field name="title" label="Titlu" required defaultValue={defaults.title as string} />
          <Field name="slug" label="Slug (URL)" required defaultValue={defaults.slug as string} />
        </div>
        <Field name="shortDesc" label="Descriere scurtă" required defaultValue={defaults.shortDesc as string} />
        <Field name="description" label="Descriere completă" as="textarea" rows={4} required defaultValue={defaults.description as string} />
        <Field name="imageUrl" label="URL imagine" defaultValue={defaults.imageUrl as string} placeholder="https://..." />
        <div className="grid grid-cols-2 gap-4">
          <Field name="price" label="Preț" defaultValue={defaults.price as string} />
          <Field name="duration" label="Durată" defaultValue={defaults.duration as string} />
        </div>
        <Field name="benefits" label="Beneficii (câte unul pe linie)" as="textarea" rows={5} defaultValue={defaults.benefits as string} />
        <div className="grid grid-cols-2 gap-4">
          <Field name="order" label="Ordine" type="number" defaultValue={String(defaults.order ?? 0)} />
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" name="featured" id="featured" defaultChecked={!!defaults.featured} className="w-4 h-4 accent-blue-600" />
            <label htmlFor="featured" className="text-sm text-slate-700 font-medium">Featured</label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
            {loading ? 'Se salvează...' : 'Salvează'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
            Anulează
          </button>
          <button type="button" onClick={handleDelete} disabled={deleting} className="ml-auto bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
            {deleting ? 'Se șterge...' : 'Șterge'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ name, label, as = 'input', type = 'text', required, defaultValue, placeholder, rows }: {
  name: string; label: string; as?: 'input' | 'textarea'; type?: string
  required?: boolean; defaultValue?: string; placeholder?: string; rows?: number
}) {
  const cls = "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}{required && ' *'}</label>
      {as === 'textarea'
        ? <textarea name={name} rows={rows ?? 3} required={required} defaultValue={defaultValue} placeholder={placeholder} className={cls} />
        : <input name={name} type={type} required={required} defaultValue={defaultValue} placeholder={placeholder} className={cls} />
      }
    </div>
  )
}
