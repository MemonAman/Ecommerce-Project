import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordCorrect) return null;
        
        console.log(`[AUTH DEBUG] Authorize for ${user.email}, DB Role: ${user.role}`);

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          loginSource: credentials.loginSource || 'website',
        };
      },
    }),
  ],
})
