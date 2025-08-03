import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session/session";

const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/products"];

function isPublicPath(path: string): boolean {
  return publicRoutes.some(
    (publicRoute) => path === publicRoute || path.startsWith(publicRoute + "/"),
  );
}

function isAdminPath(path: string): boolean {
  return path.startsWith("/admin/");
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublic = isPublicPath(path);
  const isAdmin = isAdminPath(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (process.env.NODE_ENV === "development") {
    console.log("session", session);
  }

  // Handle admin routes - require authentication
  if (isAdmin) {
    if (!session?.payload?.userId) {
      return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    }
    // Role verification will be handled by the admin layout component
  }

  // Handle protected routes (non-public, non-admin)
  if (!isPublic && !isAdmin && !session?.payload?.userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  // Redirect authenticated users away from auth pages
  const isAuthPage = path.startsWith("/auth/");
  if (isAuthPage && session?.payload?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|_next/|.*\\.(?:png|jpg|jpeg|svg|webp|ico|json)$).*)",
  ],
};

