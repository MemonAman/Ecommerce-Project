import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Cart from '@/models/Cart';
import { auth } from '@/auth';

// GET the current user's cart
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ items: [] });
    }

    await dbConnect();
    const cart = await Cart.findOne({ userId: session.user.email });
    
    return NextResponse.json(cart || { items: [] });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching cart', error: error.message }, { status: 500 });
  }
}

// SAVE/UPDATE the current user's cart
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { items: newItems } = await req.json();
    await dbConnect();

    // 1. Fetch existing cart
    let existingCart = await Cart.findOne({ userId: session.user.email });

    if (!existingCart) {
      // Create new if none exists
      existingCart = await Cart.create({ userId: session.user.email, items: newItems });
    } else {
      // Overwrite existing items with the source of truth from the client
      existingCart.items = newItems;
      await existingCart.save();
    }

    return NextResponse.json(existingCart);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error saving cart', error: error.message }, { status: 500 });
  }
}
