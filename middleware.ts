import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return false;

  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    return false;
  }

  const secret = new TextEncoder().encode(authSecret);

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }

  const authed = await isAuthenticated(request);
  if (!authed) {
    const loginUrl = new URL('/admin/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }

  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex');
  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
