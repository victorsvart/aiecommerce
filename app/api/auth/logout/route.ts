import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true });
    
    // Clear the session cookie
    response.cookies.delete("session");
    
    return response;
  } catch (error) {
    console.error("Error in /api/auth/logout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 