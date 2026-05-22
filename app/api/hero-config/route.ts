import { NextResponse } from 'next/server'
import { getHeroConfigAsync } from '@/lib/hero'

export async function GET() {
  return NextResponse.json(await getHeroConfigAsync())
}
