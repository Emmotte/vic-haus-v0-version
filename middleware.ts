import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect dashboard route
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // Handle site previews (existing logic)
  const url = req.nextUrl.clone()
  const hostname = req.headers.get("host") || "localhost"

  const VERCEL_URL = process.env.VERCEL_URL
  const MAIN_APP_DOMAINS = ["localhost:3000", "127.0.0.1:3000", VERCEL_URL].filter(Boolean)

  const isMainAppDomain = MAIN_APP_DOMAINS.some((domain) => hostname.includes(domain))

  if (!isMainAppDomain) {
    const parts = hostname.split(".")
    const subdomain = parts.length > 2 ? parts[0] : null

    if (subdomain && subdomain !== "www") {
      url.pathname = `/_sites/${subdomain}${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     * - auth/callback (Supabase OAuth callback)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|auth/callback).*)",
  ],
}
