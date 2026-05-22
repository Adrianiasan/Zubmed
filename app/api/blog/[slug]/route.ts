import { getPostBySlug } from '@/lib/data'

export async function GET(
  _req: Request,
  ctx: RouteContext<'/api/blog/[slug]'>,
) {
  const { slug } = await ctx.params
  const post = await getPostBySlug(slug)

  if (!post) {
    return Response.json({ error: 'Post not found' }, { status: 404 })
  }

  return Response.json(post)
}
