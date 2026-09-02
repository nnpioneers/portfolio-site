import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Authentication Middleware
 * 
 * Intercepts requests to enforce Protected Route architecture.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define route types
  const publicRoutes = ['/', '/about', '/services', '/portfolio', '/startup-hub', '/contact', '/login', '/registration'];
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const adminRoutes = ['/admin'];

  // Check token (Phase 3: Real JWT Validation)
  const token = request.cookies.get('nnp_auth_token')?.value;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute || isAdminRoute) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'nnp_mock_secret'
      );
      
      const { payload } = await jwtVerify(token, secret);
      
      if (isAdminRoute && payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      
    } catch (error) {
      // Invalid or expired token
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      
      // We should ideally clear the invalid cookies, but Next.js middleware allows 
      // setting cookies on the response, so we do it here.
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('nnp_auth_token');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  // Pass-through for public or valid authenticated routes
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
