import type { Metadata } from 'next'
import BlogCard from '@/components/ui/BlogCard'
import { getPublishedPosts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articole și sfaturi utile despre sănătatea orală, tratamente dentare și noutăți din stomatologia modernă.',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  const categories = Array.from(new Set(posts.map((p) => p.category)))

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5">
            Articole utile
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sfaturi practice de la specialiștii noștri despre sănătatea orală,
            tratamente și noutăți din lumea stomatologiei moderne.
          </p>
        </div>
      </section>

      {categories.length > 1 && (
        <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <span
                key={cat}
                className="shrink-0 text-xs font-medium text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-12 h-12 mx-auto mb-4 text-slate-300"
              >
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p>Nu există articole publicate momentan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
