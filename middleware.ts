import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/api/auth/login' || path === '/api/auth/register';

  // Get the token from the Authorization header
  const token = request.headers.get('Authorization')?.split(' ')[1];

  // If the path is public, allow the request
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If there's no token and the path is not public, return unauthorized
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key'
    );
    const { payload } = await jwtVerify(token, secret);

    // Add user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.sub as string);
    requestHeaders.set('x-user-email', payload.email as string);

    // Return response with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // If the token is invalid, return unauthorized
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/api/:path*',
  ],
}; 