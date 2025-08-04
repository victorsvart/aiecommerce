import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Mail, Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed - AiECommerce",
  description: "Your order has been successfully placed",
};

export default function CheckoutSuccessPage() {
  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center py-12">
            <CardContent>
              <div className="mb-6">
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 mb-4">
                  Thank you for your purchase. Your order has been successfully placed.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Order Number</p>
                  <p className="text-xl font-mono font-bold text-gray-900">#{orderNumber}</p>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg">
                    <Mail className="w-8 h-8 text-blue-600" />
                    <h3 className="font-semibold text-sm">Email Confirmation</h3>
                    <p className="text-xs text-gray-600 text-center">
                      Check your email for order details
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg">
                    <Package className="w-8 h-8 text-green-600" />
                    <h3 className="font-semibold text-sm">Processing</h3>
                    <p className="text-xs text-gray-600 text-center">
                      We&apos;re preparing your order
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg">
                    <Truck className="w-8 h-8 text-purple-600" />
                    <h3 className="font-semibold text-sm">Shipping</h3>
                    <p className="text-xs text-gray-600 text-center">
                      You&apos;ll get tracking info soon
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">What&apos;s Next?</h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Order Processing</h3>
                      <p className="text-xs text-gray-600">
                        We&apos;ll process your order within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Shipping Notification</h3>
                      <p className="text-xs text-gray-600">
                        You&apos;ll receive tracking information via email
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Delivery</h3>
                      <p className="text-xs text-gray-600">
                        Your order will arrive in 3-5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/products" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/orders" className="flex-1">
                  <Button className="w-full">
                    <Package className="w-4 h-4 mr-2" />
                    View Orders
                  </Button>
                </Link>
              </div>

              {/* Support Info */}
              <div className="mt-8 pt-6 border-t">
                <p className="text-xs text-gray-500 mb-2">
                  Need help? Contact our support team
                </p>
                <div className="flex justify-center gap-4 text-xs">
                  <a href="/help" className="text-blue-600 hover:underline">
                    Help Center
                  </a>
                  <a href="/contact" className="text-blue-600 hover:underline">
                    Contact Us
                  </a>
                  <a href="/returns" className="text-blue-600 hover:underline">
                    Returns
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 