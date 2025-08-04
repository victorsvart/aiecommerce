import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, Truck } from "lucide-react";
import { CartWithItems } from "@/app/lib/store/cart-store";

interface OrderSummaryProps {
  cart: CartWithItems;
  total: number;
}

export function OrderSummary({ cart, total }: OrderSummaryProps) {
  const subtotal = total;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cart Items */}
        <div className="space-y-3">
          <h4 className="font-semibold">Items ({cart.items.length})</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {item.product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-sm truncate">{item.product.name}</h5>
                  <p className="text-xs text-gray-500">{item.product.brand}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3" />
              Shipping
            </span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Info */}
        {shipping === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-800">
              <Truck className="w-4 h-4" />
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Orders over $50 qualify for free shipping
            </p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-800">
              <Truck className="w-4 h-4" />
              <span className="text-sm font-medium">Standard Shipping</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Add ${(50 - subtotal).toFixed(2)} more for free shipping
            </p>
          </div>
        )}

        {/* Order Protection */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-800">
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium">Order Protection</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Your order is protected by our 30-day return policy
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 