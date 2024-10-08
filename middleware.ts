// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

 // If user is signed in and the current path is /login or /register redirect the user to /dashboard
 if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
  return NextResponse.redirect(new URL('/dashboard', request.url))
}

// Update the condition for redirecting unauthenticated users
if (!user && request.nextUrl.pathname !== '/' && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register') {
  return NextResponse.redirect(new URL('/login', request.url))
}

return response
}

export const config = {
  matcher: ['/', '/login', '/register', '/dashboard', '/settings'],
}