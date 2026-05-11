import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    
    // Admin check
    if (!session || (session.user as any).role !== 'admin') {
      if (session?.user?.email !== 'aman123@gmail.com') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
      }
    }

    await dbConnect();

    // 1. Total Revenue (Sum of all paid or processed orders)
    const revenueData = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // 2. Total Orders
    const totalOrders = await Order.countDocuments();

    // 3. Total Customers (Role: user)
    const totalCustomers = await User.countDocuments({ role: 'user' });

    // 4. Pending Shipments (Status: Pending or Processing)
    const pendingShipments = await Order.countDocuments({ 
      status: { $in: ['Pending', 'Processing'] } 
    });

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      pendingShipments
    });
  } catch (error: any) {
    console.error('Stats Error:', error);
    return NextResponse.json({ message: 'Error calculating stats', error: error.message }, { status: 500 });
  }
}
