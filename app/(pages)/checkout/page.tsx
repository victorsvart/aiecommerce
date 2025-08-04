import { Metadata } from "next";
import { getCartAction, getCartTotalAction } from "@/app/actions/cart/cart";
import { AuthGuard } from "@/app/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CheckoutForm } from "./components/checkout-form";
import { OrderSummary } from "./components/order-summary";
import { ShoppingCart, CreditCard, Truck, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout - AiECommerce",
  description: "Complete your purchase",
};

// Force dynamic rendering for checkout page
export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const cart = await getCartAction();
  const total = await getCartTotalAction();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="py-12">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  <ShoppingCart className="h-16 w-16 mx-auto" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Add some products to checkout</p>
                <Link href="/products">
                  <Button size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="sm">
                ← Back to Cart
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Checkout</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AuthGuard>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CheckoutForm cart={cart} total={total} />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <OrderSummary cart={cart} total={total} />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="w-8 h-8 text-green-600" />
                      <h3 className="font-semibold">Secure Payment</h3>
                      <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Truck className="w-8 h-8 text-blue-600" />
                      <h3 className="font-semibold">Free Shipping</h3>
                      <p className="text-sm text-gray-600">On orders over $50</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingCart className="w-8 h-8 text-purple-600" />
                      <h3 className="font-semibold">Easy Returns</h3>
                      <p className="text-sm text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AuthGuard>
      </main>
    </div>
  );
} 