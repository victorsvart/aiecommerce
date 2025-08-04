"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/app/lib/session/session";
import {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getCart,
  getCartItemCount,
  getCartTotal,
} from "@/app/lib/store/cart-store";

export async function addToCartAction(productId: number, quantity: number = 1) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    await addToCart(userId, productId, quantity);
    revalidatePath("/cart");
    revalidatePath("/products");
    
    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to add item to cart";
    return { success: false, error: errorMessage };
  }
}

export async function updateCartItemQuantityAction(productId: number, quantity: number) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    await updateCartItemQuantity(userId, productId, quantity);
    revalidatePath("/cart");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating cart item:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update cart item";
    return { success: false, error: errorMessage };
  }
}

export async function removeFromCartAction(productId: number) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    await removeFromCart(userId, productId);
    revalidatePath("/cart");
    
    return { success: true };
  } catch (error) {
    console.error("Error removing from cart:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to remove item from cart";
    return { success: false, error: errorMessage };
  }
}

export async function clearCartAction() {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    await clearCart(userId);
    revalidatePath("/cart");
    
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to clear cart";
    return { success: false, error: errorMessage };
  }
}

export async function getCartAction() {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return null;
    }
    
    return await getCart(userId);
  } catch (error) {
    console.error("Error getting cart:", error);
    return null;
  }
}

export async function getCartItemCountAction() {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return 0;
    }
    
    return await getCartItemCount(userId);
  } catch (error) {
    console.error("Error getting cart item count:", error);
    return 0;
  }
}

export async function getCartTotalAction() {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return 0;
    }
    
    return await getCartTotal(userId);
  } catch (error) {
    console.error("Error getting cart total:", error);
    return 0;
  }
} 