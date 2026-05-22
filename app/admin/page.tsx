import Link from 'next/link'
import { getServices } from '@/lib/data'
import { getPublishedPosts } from '@/lib/data'

export default async function AdminDashboard() {
  const [services, posts] = await Promise.all([getServices(), getPublishedPosts()])

  const cards = [
    { label: 'Servicii', count: services.length, href: '/admin/servicii', color: 'bg-blue-500', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: 'Articole blog', count: posts.length, href: '/admin/blog', color: 'bg-emerald-500', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { label: 'Imagini Hero', count: 2, href: '/admin/hero', color: 'bg-violet-500', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {cards.map(({ label, count, href, color, icon }) => (
          <Link key={href} href={href} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-center gap-5">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                <path d={icon} />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{count}</div>
              <div className="text-sm text-slate-500">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Servicii recente</h2>
            <Link href="/admin/servicii/nou" className="text-xs text-blue-600 font-medium hover:underline">+ Adaugă</Link>
          </div>
          <ul className="space-y-2">
            {services.slice(0, 5).map(s => (
              <li key={s.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-700">{s.title}</span>
                <Link href={`/admin/servicii/${s.id}`} className="text-xs text-blue-600 hover:underline">Edit</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Articole recente</h2>
            <Link href="/admin/blog/nou" className="text-xs text-blue-600 font-medium hover:underline">+ Adaugă</Link>
          </div>
          <ul className="space-y-2">
            {posts.slice(0, 5).map(p => (
              <li key={p.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-700 truncate max-w-[200px]">{p.title}</span>
                <Link href={`/admin/blog/${p.id}`} className="text-xs text-blue-600 hover:underline">Edit</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
