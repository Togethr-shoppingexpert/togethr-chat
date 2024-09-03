// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the token exists in local storage
  const token = request.cookies.get('token'); // Adjust based on how you store the token

  // Redirect to login if token is not found
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Continue if token is found
  return NextResponse.next();
}
