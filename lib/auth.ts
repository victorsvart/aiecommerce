import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "./prisma";

export interface AuthenticatedUser {
  id: number;
  username: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

export async function getAuthenticatedUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    const token = request.cookies.get("session")?.value;
    
    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    
    if (!payload.userId || typeof payload.userId !== "number") {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

export function requireAuth(handler: (request: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = await getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    
    return handler(request, user);
  };
}

export function requireAdmin(handler: (request: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = await getAuthenticatedUser(request);
    
    if (!user) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    
    if (user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    return handler(request, user);
  };
}

export function withAuth(handler: (request: NextRequest, user: AuthenticatedUser | null) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = await getAuthenticatedUser(request);
    return handler(request, user);
  };
} 