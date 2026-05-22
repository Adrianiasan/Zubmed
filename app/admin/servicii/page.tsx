import Link from 'next/link'
import { getServices } from '@/lib/data'
import { deleteService } from '../actions'
import DeleteButton from '../components/DeleteButton'

export default async function AdminServiciiPage() {
  const services = await getServices()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Servicii</h1>
        <Link
          href="/admin/servicii/nou"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          + Serviciu nou
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-slate-500 font-medium">Titlu</th>
              <th className="text-left px-5 py-3.5 text-slate-500 font-medium hidden md:table-cell">Preț</th>
              <th className="text-left px-5 py-3.5 text-slate-500 font-medium hidden md:table-cell">Ordine</th>
              <th className="text-left px-5 py-3.5 text-slate-500 font-medium">Featured</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {services.map(service => (
              <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-900">{service.title}</div>
                  <div className="text-xs text-slate-400">{service.slug}</div>
                </td>
                <td className="px-5 py-4 text-slate-600 hidden md:table-cell">{service.price ?? '—'}</td>
                <td className="px-5 py-4 text-slate-600 hidden md:table-cell">{service.order}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${service.featured ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {service.featured ? 'Da' : 'Nu'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/servicii/${service.id}`} className="text-blue-600 hover:underline text-xs font-medium">Editează</Link>
                    <DeleteButton action={deleteService.bind(null, service.id)} confirmMessage="Ștergi serviciul?" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
