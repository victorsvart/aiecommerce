# Cart Functionality

This document describes the cart functionality implemented in the AiECommerce application.

## Features

### 1. Database Schema
- **Cart Model**: Stores user cart information
- **CartItem Model**: Stores individual items in the cart with quantities
- **Relationships**: Cart belongs to User, CartItem belongs to Cart and Product

### 2. Cart Store Functions (`app/lib/store/cart-store.ts`)
- `getCart(userId)`: Get user's cart with items
- `createCart(userId)`: Create a new cart for user
- `getOrCreateCart(userId)`: Get existing cart or create new one
- `addToCart(userId, productId, quantity)`: Add product to cart
- `updateCartItemQuantity(userId, productId, quantity)`: Update item quantity
- `removeFromCart(userId, productId)`: Remove item from cart
- `clearCart(userId)`: Clear all items from cart
- `getCartItemCount(userId)`: Get total number of items in cart
- `getCartTotal(userId)`: Calculate cart total

### 3. Cart Actions (`app/actions/cart/cart.ts`)
Server actions for cart operations:
- `addToCartAction(productId, quantity)`: Add item to cart
- `updateCartItemQuantityAction(productId, quantity)`: Update quantity
- `removeFromCartAction(productId)`: Remove item
- `clearCartAction()`: Clear cart
- `getCartAction()`: Get cart data
- `getCartItemCountAction()`: Get item count
- `getCartTotalAction()`: Get cart total

### 4. Components

#### CartIcon (`app/components/cart/cart-icon.tsx`)
- Displays cart icon with item count badge
- Opens cart sheet when clicked
- Auto-refreshes cart count

#### CartItems (`app/components/cart/cart-items.tsx`)
- Displays cart items with images, names, prices
- Quantity controls (+/- buttons)
- Remove item functionality
- Optional summary section

#### AddToCartButton (`app/components/cart/add-to-cart-button.tsx`)
- Reusable button component for adding products to cart
- Loading states and success feedback
- Configurable size and variant

### 5. Pages

#### Cart Page (`app/(pages)/cart/page.tsx`)
- Full cart view with order summary
- Responsive layout
- Empty cart state
- Checkout and continue shopping buttons

### 6. Integration

#### Product List Integration
- Products now have working "Add to cart" buttons
- Uses `AddToCartButton` component
- Shows loading and success states

#### Header Integration
- Cart icon in header shows item count
- Opens cart sheet on click
- Replaces static cart button

### 7. Authentication
- Cart operations require user authentication
- Middleware protects cart routes
- Redirects to signin if not authenticated

## Usage

### Adding Items to Cart
```tsx
import { AddToCartButton } from "@/app/components/cart/add-to-cart-button";

<AddToCartButton productId={product.id} />
```

### Displaying Cart Icon
```tsx
import { CartIcon } from "@/app/components/cart/cart-icon";

<CartIcon />
```

### Showing Cart Items
```tsx
import { CartItems } from "@/app/components/cart/cart-items";

<CartItems showSummary={false} />
```

## Database Migration

The cart functionality requires the following database models:

```sql
-- Cart table
CREATE TABLE "Cart" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER UNIQUE NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CartItem table
CREATE TABLE "CartItem" (
  "id" SERIAL PRIMARY KEY,
  "cartId" INTEGER NOT NULL,
  "productId" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  UNIQUE("cartId", "productId")
);
```

## Testing

1. Sign in to the application
2. Navigate to products page
3. Click "Add to cart" on any product
4. Click the cart icon in the header
5. Verify items appear in cart sheet
6. Test quantity controls and remove functionality
7. Visit `/cart` for full cart view

## Future Enhancements

- Save cart to localStorage for guest users
- Cart persistence across sessions
- Wishlist functionality
- Cart sharing
- Bulk operations
- Cart expiration
- Abandoned cart recovery 