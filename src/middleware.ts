import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Specify which routes the middleware should run on
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};


