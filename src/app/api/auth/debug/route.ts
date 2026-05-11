import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  
  return NextResponse.json({
    isLoggedIn: !!session,
    user: session?.user || null,
    role: (session?.user as any)?.role || "No role found",
    session: session
  });
}
