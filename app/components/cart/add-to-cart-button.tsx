"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, AlertCircle } from "lucide-react";
import { addToCartAction } from "@/app/actions/cart/cart";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productId: number;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function AddToCartButton({ 
  productId, 
  className = "", 
  size = "sm",
  variant = "default"
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await addToCartAction(productId, 1);
      
      if (result.success) {
        setAdded(true);
        // Reset the added state after 2 seconds
        setTimeout(() => setAdded(false), 2000);
      } else {
        setError(result.error || "Failed to add to cart");
        
        // If user is not authenticated, redirect to signin
        if (result.error?.includes("not authenticated") || result.error?.includes("User not authenticated")) {
          setTimeout(() => {
            router.push("/auth/signin");
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleAddToCart}
        disabled={loading}
        className={className}
        size={size}
        variant={variant}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : added ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Added
          </>
        ) : error ? (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Sign in
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </>
        )}
      </Button>
      
      {error && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600 max-w-xs z-10">
          {error}
        </div>
      )}
    </div>
  );
} 