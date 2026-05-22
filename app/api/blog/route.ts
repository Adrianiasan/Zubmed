import { getAllBlogPosts } from '@/lib/data'

export async function GET() {
  const posts = await getAllBlogPosts()
  return Response.json(posts)
}
