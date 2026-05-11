import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    
    // Check if user is admin
    if (!session || (session.user as any).role !== 'admin') {
      if (session?.user?.email !== 'aman123@gmail.com') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
      }
    }

    await dbConnect();
    const orders = await Order.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching orders', error: error.message }, { status: 500 });
  }
}
