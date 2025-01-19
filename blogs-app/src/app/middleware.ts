import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const path = req.nextUrl.pathname;


  if (path.startsWith('/api/blogs')) {
   
    const methodsRequiringAuth = ['POST', 'PUT', 'DELETE'];
    
    if (methodsRequiringAuth.includes(req.method)) {
      if (!token) {
        return NextResponse.json(
          { message: 'Authentication required' }, 
          { status: 401 }
        );
      }
    }
  }

  
  const protectedRoutes = [
    '/blogs/edit',
    '/profile'
  ];

  if (protectedRoutes.some(route => path.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/blogs/:path*',
    '/blogs/',
    '/blogs/edit',
    '/profile'
  ]
};