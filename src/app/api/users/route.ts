import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    
    // Check if user is admin
    if (!session || (session.user as any).role !== 'admin') {
      // Small exception for aman123@gmail.com for now
      if (session?.user?.email !== 'aman123@gmail.com') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
      }
    }

    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
  }
}
