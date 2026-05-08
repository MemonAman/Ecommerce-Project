import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [], // Providers are added in auth.ts
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = (auth?.user as any)?.role === 'admin';
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      
      if (isAdminRoute) {
        if (!isLoggedIn) return false; // Redirect to sign-in
        if (!isAdmin) return Response.redirect(new URL('/', nextUrl)); // Redirect to home if not admin
      }
      
      return true;
    },
  },
} satisfies NextAuthConfig
