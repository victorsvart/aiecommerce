import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session/session";

const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/products"];

function isPublicPath(path: string): boolean {
  return publicRoutes.some(
    (publicRoute) => path === publicRoute || path.startsWith(publicRoute + "/"),
  );
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublic = isPublicPath(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (process.env.NODE_ENV === "development") {
    console.log("session", session);
  }

  if (!isPublic && !session?.payload?.userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

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

