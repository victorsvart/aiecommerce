import { NextRequest, NextResponse } from "next/server";
import { getCartAction, getCartItemCountAction, getCartTotalAction } from "@/app/actions/cart/cart";

export async function GET() {
  try {
    const [cart, itemCount, total] = await Promise.all([
      getCartAction(),
      getCartItemCountAction(),
      getCartTotalAction(),
    ]);

    return NextResponse.json({
      cart,
      itemCount,
      total,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
} 