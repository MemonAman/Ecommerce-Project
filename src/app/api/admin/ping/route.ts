import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin-token');
  
  if (adminToken?.value !== 'secure-admin-session-xyz') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const response = NextResponse.json({ success: true });
  
  // Refresh the cookie for another 10 seconds
  response.cookies.set('admin-token', 'secure-admin-session-xyz', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 10 // Dies 10 seconds after the last ping
  });

  return response;
}
