import { NextRequest, NextResponse } from 'next/server'

const ROOT = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'tesakara.com'
//const ROOT = 'lvh.me'

export const config = {
  matcher: ['/((?!_next|api|assets|favicon.ico).*)'],
}

function hostOnly(h: string | null) {
  return (h || '').split(':')[0].toLowerCase()
}

export function middleware(req: NextRequest) {
  const host = hostOnly(req.headers.get('host'))
  const path = req.nextUrl.pathname

  // DEBUG
  console.log('[MW]', { host, path, ROOT })

  const isSub =
    host.endsWith('.' + ROOT) &&
    host !== ROOT &&
    host !== 'www.' + ROOT

  if (isSub) {
    const sub = host.slice(0, -('.' + ROOT).length)
    const url = req.nextUrl.clone()
    url.pathname = `/__subdomain/${sub}`
    console.log('[MW] rewrite ->', url.pathname)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}