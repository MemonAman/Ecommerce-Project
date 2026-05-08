import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    const email = "aman123@gmail.com";
    
    // Find the user and update their role to admin
    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 'admin' },
      { new: true }
    );
    
    if (!user) {
      return NextResponse.json({ 
        message: `User with email ${email} not found. Please sign up first!` 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: `Success! ${email} is now an ADMIN.`,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error', error: error.message }, { status: 500 });
  }
}
