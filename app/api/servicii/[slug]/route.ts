import { getServiceBySlug } from '@/lib/data'

export async function GET(
  _req: Request,
  ctx: RouteContext<'/api/servicii/[slug]'>,
) {
  const { slug } = await ctx.params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return Response.json({ error: 'Service not found' }, { status: 404 })
  }

  return Response.json(service)
}
