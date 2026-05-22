import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getPublishedPosts } from '@/lib/data'

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: PageProps<'/blog/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  }
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const paragraphs = post.content
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  return (
    <div className="pt-20">
      <article>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div>
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Acasă
              </Link>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span className="text-slate-900 font-medium line-clamp-1">
                {post.title}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-slate-400">
                {formatDate(post.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 border-l-4 border-blue-200 pl-4 italic">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mb-10 pb-10 border-b border-slate-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">
                  {post.author}
                </div>
                <div className="text-xs text-slate-500">Specialist Zubmed</div>
              </div>
            </div>

            {post.imageUrl && (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-10">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose prose-slate max-w-none">
              {paragraphs.map((line, i) => {
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                      {line.slice(2)}
                    </h1>
                  )
                }
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-slate-900 mt-7 mb-3">
                      {line.slice(3)}
                    </h2>
                  )
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-lg font-semibold text-slate-900 mt-6 mb-2">
                      {line.slice(4)}
                    </h3>
                  )
                }
                if (line.startsWith('- ') || line.startsWith('* ')) {
                  return (
                    <li key={i} className="text-slate-700 leading-relaxed ml-4 list-disc">
                      {line.slice(2)}
                    </li>
                  )
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={i} className="font-semibold text-slate-900 mt-4">
                      {line.slice(2, -2)}
                    </p>
                  )
                }
                return (
                  <p key={i} className="text-slate-700 leading-relaxed mb-4">
                    {line}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </article>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Ai nevoie de o consultație?
          </h3>
          <p className="text-slate-600 mb-6 text-sm">
            Echipa Zubmed este pregătită să te ajute. Programează-te acum.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
          >
            Programează-te
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-4 h-4"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-4 h-4"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Înapoi la Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
