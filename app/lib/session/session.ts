"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.SECRET_KEY;
const ENCODED_SECRET_KEY = new TextEncoder().encode(SECRET_KEY);

export type JWTPayload = {
  userId: number;
  exp: number;
};

export async function createSession(userId: number): Promise<void> {
  const expiresAt = Date.now() + 3600 * 1000;

  const payload: JWTPayload = {
    userId,
    exp: expiresAt,
  };

  const token = await encrypt(payload);
  const cookie = await cookies();
  cookie.set("session", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600 * 1000,
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
  try {
    const payload = await jwtVerify(token, ENCODED_SECRET_KEY, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (e) {
    console.log(e);
  }
}
