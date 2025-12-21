import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

const ADMIN_SESSION_COOKIE = 'keyable_admin_session';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);

    // If no session, redirect to login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Simple token validation (check if token exists and is not expired)
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
      const [timestamp] = decoded.split(':');
      const tokenTime = parseInt(timestamp);
      const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

      if (Date.now() - tokenTime > SESSION_EXPIRY) {
        // Token expired, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete(ADMIN_SESSION_COOKIE);
        return response;
      }
    } catch {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete(ADMIN_SESSION_COOKIE);
      return response;
    }

    return NextResponse.next();
  }

  // If on login page and already authenticated, redirect to admin
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);
    if (sessionCookie) {
      try {
        const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
        const [timestamp] = decoded.split(':');
        const tokenTime = parseInt(timestamp);
        const SESSION_EXPIRY = 24 * 60 * 60 * 1000;

        if (Date.now() - tokenTime < SESSION_EXPIRY) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch {
        // Invalid token, continue to login
      }
    }
    return NextResponse.next();
  }

  // Skip api, static files, and Next.js internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt'
  ) {
    return NextResponse.next();
  }

  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to default locale
  const locale = detectLocale(request) || defaultLocale;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  );
}

function detectLocale(request: NextRequest): string | null {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return null;

  const preferredLocale = acceptLanguage.split(',')[0]?.split('-')[0];
  if (preferredLocale && locales.includes(preferredLocale as typeof locales[number])) {
    return preferredLocale;
  }
  return null;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
