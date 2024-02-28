import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // afterAuth(auth, req, evt) {
  //   if (auth.userId && req.nextUrl.pathname === "/") {
  //     const url = req.nextUrl.clone();
  //     url.pathname = "/dashboard";
  //     return NextResponse.redirect(url);
  //   }
  // },
  publicRoutes: ["/", "/sign-up", "/api/webhooks(.*)"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"]
};
