'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { updateBlogPost, deleteBlogPost } from '../../actions'

export default function AdminBlogEditPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [defaults, setDefaults] = useState<Record<string, string | boolean> | null>(null)

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then((posts: Array<Record<string, unknown>>) => {
        const p = posts.find(x => x.id === id)
        if (p) setDefaults(p as Record<string, string | boolean>)
      })
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    try {
      await updateBlogPost(id, {
        title: fd.get('title') as string,
        slug: fd.get('slug') as string,
        excerpt: fd.get('excerpt') as string,
        content: fd.get('content') as string,
        author: fd.get('author') as string,
        category: fd.get('category') as string,
        imageUrl: fd.get('imageUrl') as string,
        published: fd.get('published') === 'on',
      })
    } catch {
      setError('Eroare la salvare.')
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Ștergi acest articol?')) return
    setDeleting(true)
    try { await deleteBlogPost(id) } catch { setDeleting(false) }
  }

  if (!defaults) return <div className="p-8 text-slate-500">Se încarcă...</div>

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Editează articol</h1>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
        <Field name="title" label="Titlu" required defaultValue={defaults.title as string} />
        <div className="grid grid-cols-2 gap-4">
          <Field name="slug" label="Slug (URL)" required defaultValue={defaults.slug as string} />
          <Field name="category" label="Categorie" required defaultValue={defaults.category as string} />
        </div>
        <Field name="author" label="Autor" required defaultValue={defaults.author as string} />
        <Field name="imageUrl" label="URL imagine" defaultValue={defaults.imageUrl as string} />
        <Field name="excerpt" label="Rezumat" as="textarea" rows={3} required defaultValue={defaults.excerpt as string} />
        <Field name="content" label="Conținut (Markdown)" as="textarea" rows={12} required defaultValue={defaults.content as string} />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="published" id="published" defaultChecked={!!defaults.published} className="w-4 h-4 accent-blue-600" />
          <label htmlFor="published" className="text-sm text-slate-700 font-medium">Publicat</label>
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
