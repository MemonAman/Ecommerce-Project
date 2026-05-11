import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [], // Providers are added in auth.ts
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userEmail = auth?.user?.email;
      const isAdmin = (auth?.user as any)?.role === 'admin' || userEmail === 'aman123@gmail.com';
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      
      console.log(`[AUTH DEBUG] Path: ${nextUrl.pathname}, LoggedIn: ${isLoggedIn}, Email: ${userEmail}, Admin: ${isAdmin}`);

      if (isAdminRoute) {
        if (!isLoggedIn) {
          console.log("[AUTH DEBUG] Redirecting guest to sign-in");
          return false;
        }
        if (!isAdmin) {
          console.log("[AUTH DEBUG] Redirecting non-admin user to home");
          return Response.redirect(new URL('/', nextUrl));
        }
      }
      
      return true;
    },
  },
} satisfies NextAuthConfig
