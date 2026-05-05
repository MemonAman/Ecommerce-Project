import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { products } from '@/data/products';

export async function GET() {
  try {
    await dbConnect();
    
    // Clear existing products (optional, but good for a fresh seed)
    await Product.deleteMany({});
    
    // Insert products from our static file
    // We keep the numeric 'id' for URL compatibility
    const productsToSeed = products.map(p => ({ ...p }));
    
    await Product.insertMany(productsToSeed);
    
    return NextResponse.json({ message: 'Database seeded successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'Error seeding database', error: error.message }, { status: 500 });
  }
}
