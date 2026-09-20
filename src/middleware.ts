import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  const ADMIN_SECRET = process.env.ADMIN_SECRET || 'fallback-dev-secret-do-not-use-in-production';

  try {
    const secretKey = new TextEncoder().encode(ADMIN_SECRET);
    await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/dashboard',
    '/admin/experiences',
    '/admin/projects',
    '/admin/skills',
    '/admin/certifications',
    '/admin/resources',
    '/admin/achievements',
    '/admin/settings'
  ]
};
