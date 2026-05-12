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
        token.loginSource = (user as any).loginSource;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).loginSource = token.loginSource;
      }
      return session;
    },
    authorized({ auth, request }) {
      const { nextUrl, cookies } = request;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isLoginRoute = nextUrl.pathname === '/admin/login';

      if (isAdminRoute) {
        if (isLoginRoute) return true;

        const adminToken = cookies.get('admin-token')?.value;
        const secret = process.env.ADMIN_SESSION_TOKEN;
        if (!secret || adminToken !== secret) {
          return Response.redirect(new URL('/admin/login', nextUrl));
        }
        return true;
      }

      // Storefront uses NextAuth
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith('/checkout');
      
      if (isProtected && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig
