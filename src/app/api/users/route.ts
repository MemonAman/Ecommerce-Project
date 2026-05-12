import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { auth } from '@/auth';

import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('admin-token');
    
    if (adminToken?.value !== 'secure-admin-session-xyz') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
  }
}
