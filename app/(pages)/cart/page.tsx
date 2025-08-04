import { Metadata } from "next";
import { getCartAction, getCartTotalAction } from "@/app/actions/cart/cart";
import { CartItems } from "@/app/components/cart/cart-items";
import { AuthGuard } from "@/app/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shopping Cart - AiECommerce",
  description: "View and manage your shopping cart",
};

export default async function CartPage() {
  const cart = await getCartAction();
  const total = await getCartTotalAction();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AuthGuard>
            {!cart || cart.items.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-400 mb-4">
                    <ShoppingCart className="h-16 w-16 mx-auto" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                  <p className="text-gray-500 mb-6">Add some products to get started!</p>
                  <Link href="/products">
                    <Button size="lg">
                      Start Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cart Items ({cart.items.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CartItems showSummary={false} />
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(total * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${(total * 1.08).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-4">
                        <Link href="/checkout">
                          <Button className="w-full" size="lg">
                            Proceed to Checkout
                          </Button>
                        </Link>
                        <Link href="/products">
                          <Button variant="outline" className="w-full">
                            Continue Shopping
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </AuthGuard>
        </div>
      </main>
    </div>
  );
} 