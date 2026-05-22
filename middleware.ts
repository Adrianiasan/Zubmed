import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/login'
  const session = request.cookies.get('admin_session')?.value
  const expected = btoa(process.env.ADMIN_PASSWORD ?? 'zubmed2025')

  if (pathname.startsWith('/admin') && !isLoginPage) {
    if (!session || session !== expected) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (isLoginPage && session && session === expected) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
