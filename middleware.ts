import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session/session";

const protectedRoutes = ["/", "/products"];
const publicRoutes = ["/auth/signin", "/auth/signup"];

// copied from nextjs's docs for fast dev | TODO: barely reviewed, should check it out again
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = (await decrypt(cookie));
  if (process.env.NODE_ENV == "development") {
    console.log("session", session);
  }


  if (isProtectedRoute && !session?.payload?.userId) {
    return NextResponse.redirect(new URL("auth/signin", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.payload?.userId &&
    !req.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
