"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

const ENCODED_SECRET_KEY = new TextEncoder().encode(env.SECRET_KEY);

export type JWTPayload = {
  userId: number;
  exp: number;
  iat: number;
};

export async function createSession(userId: number): Promise<void> {
  const expiresAt = Date.now() + 3600 * 1000; // 1 hour

  const payload: JWTPayload = {
    userId,
    exp: expiresAt,
    iat: Date.now(),
  };

  const token = await encrypt(payload);
  const cookie = await cookies();
  cookie.set("session", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 3600, // 1 hour in seconds
  });
}

async function encrypt(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(ENCODED_SECRET_KEY);
}

export async function decrypt(token: string | undefined = "") {
  if (!token) return null;
  
  try {
    const payload = await jwtVerify(token, ENCODED_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.log("JWT Decrypt Error:", e);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get("session")?.value;
  if (!token) return false;

  const session = await decrypt(token);
  return !!session?.payload?.userId;
}

export async function getCurrentUserId(): Promise<number | null> {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  const session = await decrypt(token);
  if (!session?.payload?.userId || typeof session.payload.userId !== 'number') {
    return null;
  }
  
  return session.payload.userId;
}

