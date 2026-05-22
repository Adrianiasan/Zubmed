import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/data'
import { deleteBlogPost } from '../actions'
import DeleteButton from '../components/DeleteButton'

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Blog</h1>
        <Link href="/admin/blog/nou" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          + Articol nou
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-slate-500 font-medium">Titlu</th>
              <th className="text-left px-5 py-3.5 text-slate-500 font-medium hidden md:table-cell">Autor</th>
              <th className="text-left px-5 py-3.5 text-slate-500 font-medium hidden md:table-cell">Categorie</th>
              <th className="text-left px-5 py-3.5 text-slate-500 font-medium">Status</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-900 truncate max-w-[240px]">{post.title}</div>
                  <div className="text-xs text-slate-400">{post.slug}</div>
                </td>
                <td className="px-5 py-4 text-slate-600 hidden md:table-cell">{post.author}</td>
                <td className="px-5 py-4 text-slate-600 hidden md:table-cell">{post.category}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${post.published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                    {post.published ? 'Publicat' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/blog/${post.id}`} className="text-blue-600 hover:underline text-xs font-medium">Editează</Link>
                    <DeleteButton action={deleteBlogPost.bind(null, post.id)} confirmMessage="Ștergi articolul?" />
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
