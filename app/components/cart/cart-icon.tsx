"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getCartItemCountAction } from "@/app/actions/cart/cart";
import { CartItems } from "./cart-items";
import { AuthGuard } from "@/app/components/auth/auth-guard";
import Link from "next/link";

export function CartIcon() {
  const [itemCount, setItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const count = await getCartItemCountAction();
        setItemCount(count);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setItemCount(0);
      }
    };

    fetchCartCount();
    
    // Refresh cart count when the component mounts and when the sheet opens
    const interval = setInterval(fetchCartCount, 5000); // Refresh every 5 seconds
    
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0">
              {itemCount > 99 ? "99+" : itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96 sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <AuthGuard
          fallback={
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-gray-400 mb-4">
                <ShoppingCart className="h-16 w-16" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign in to view cart</h3>
              <p className="text-gray-500 text-center mb-4">You need to be signed in to access your cart.</p>
              <div className="space-y-2">
                <Link href="/auth/signin">
                  <Button size="sm">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="outline" size="sm">Create Account</Button>
                </Link>
              </div>
            </div>
          }
        >
          <CartItems onUpdate={() => {
            getCartItemCountAction().then(setItemCount);
          }} />
        </AuthGuard>
      </SheetContent>
    </Sheet>
  );
} 