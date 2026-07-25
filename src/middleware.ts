import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Authentication Middleware
 * 
 * Intercepts requests to enforce Protected Route architecture.
 * Currently configured in "pass-through" mode for Phase 2.1 UI preservation.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define route types
  const publicRoutes = ['/', '/about', '/services', '/portfolio', '/startup-hub', '/contact', '/login', '/registration'];
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const adminRoutes = ['/admin'];

  // Check token (Mock logic for V2.1)
  const token = request.cookies.get('nnp_auth_token')?.value;

  // Protect private routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (adminRoutes.some(route => pathname.startsWith(route))) {
    // Requires JWT decoding to check role, not doing this in V2.1B since we only have mocked token
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Phase 2.1: Enforce Protection
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
