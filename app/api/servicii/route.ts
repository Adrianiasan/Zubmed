import { NextRequest } from 'next/server'
import { getServices, getFeaturedServices } from '@/lib/data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured') === 'true'

  const services = featured ? await getFeaturedServices() : await getServices()
  return Response.json(services)
}
