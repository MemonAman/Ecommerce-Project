import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const id = parseInt(params.id);
    const product = await Product.findOne({ id: id });
    
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching product', error: error.message }, { status: 500 });
  }
}
