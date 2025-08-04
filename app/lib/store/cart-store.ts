import prisma from "@/lib/prisma";
import { Cart, CartItem, Product } from "@prisma/client";

export interface CartWithItems extends Cart {
  items: (CartItem & {
    product: Product;
  })[];
}

export async function getCart(userId: number): Promise<CartWithItems | null> {
  return await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function createCart(userId: number): Promise<Cart> {
  return await prisma.cart.create({
    data: { userId },
  });
}

export async function getOrCreateCart(userId: number): Promise<CartWithItems> {
  let cart = await getCart(userId);
  
  if (!cart) {
    const newCart = await createCart(userId);
    cart = await getCart(userId);
  }
  
  return cart!;
}

export async function addToCart(userId: number, productId: number, quantity: number = 1): Promise<CartWithItems> {
  const cart = await getOrCreateCart(userId);
  
  const existingItem = cart.items.find(item => item.productId === productId);
  
  if (existingItem) {
    // Update existing item quantity
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    // Add new item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }
  
  return await getCart(userId) as CartWithItems;
}

export async function updateCartItemQuantity(userId: number, productId: number, quantity: number): Promise<CartWithItems> {
  const cart = await getCart(userId);
  
  if (!cart) {
    throw new Error("Cart not found");
  }
  
  const cartItem = cart.items.find(item => item.productId === productId);
  
  if (!cartItem) {
    throw new Error("Cart item not found");
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
  } else {
    // Update quantity
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
    });
  }
  
  return await getCart(userId) as CartWithItems;
}

export async function removeFromCart(userId: number, productId: number): Promise<CartWithItems> {
  const cart = await getCart(userId);
  
  if (!cart) {
    throw new Error("Cart not found");
  }
  
  const cartItem = cart.items.find(item => item.productId === productId);
  
  if (cartItem) {
    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
  }
  
  return await getCart(userId) as CartWithItems;
}

export async function clearCart(userId: number): Promise<void> {
  const cart = await getCart(userId);
  
  if (cart) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
}

export async function getCartItemCount(userId: number): Promise<number> {
  const cart = await getCart(userId);
  
  if (!cart) {
    return 0;
  }
  
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

export async function getCartTotal(userId: number): Promise<number> {
  const cart = await getCart(userId);
  
  if (!cart) {
    return 0;
  }
  
  return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
} 