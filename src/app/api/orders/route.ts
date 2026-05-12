import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
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
    const orders = await Order.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching orders', error: error.message }, { status: 500 });
  }
}
