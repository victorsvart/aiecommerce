"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, CreditCard, Lock } from "lucide-react";
import { CartWithItems } from "@/app/lib/store/cart-store";
import { clearCartAction } from "@/app/actions/cart/cart";

interface CheckoutFormProps {
  cart: CartWithItems;
  total: number;
}

export function CheckoutForm({ total }: CheckoutFormProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/failure
    const isSuccessful = Math.random() > 0.1; // 90% success rate

    if (isSuccessful) {
      try {
        // Clear the cart after successful payment
        await clearCartAction();
        setIsSuccess(true);
        
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          router.push("/checkout/success");
        }, 2000);
      } catch {
        setError("Failed to clear cart after payment");
        setIsProcessing(false);
      }
    } else {
      setError("Payment failed. Please try again with a different card.");
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>
        <div className="animate-pulse">
          <p className="text-sm text-gray-500">Redirecting to confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Billing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Billing Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="123 Main St"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="New York"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              placeholder="10001"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              className="pl-10"
              maxLength={19}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-blue-800">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Secure Payment</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Pay ${(total * 1.08).toFixed(2)}
          </>
        )}
      </Button>
    </form>
  );
} 