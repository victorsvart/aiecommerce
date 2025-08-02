import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function ProductsLayout({ children }: {children: React.ReactNode}) {
  const categories = [
    { name: "Electronics", href: "/products/electronics" },
    { name: "Clothing", href: "/products/clothing" },
    { name: "Books", href: "/products/books" },
    { name: "Home & Garden", href: "/products/home-garden" },
    { name: "Sports & Outdoors", href: "/products/sports" },
    { name: "Beauty & Health", href: "/products/beauty" },
  ];

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Categories</h2>
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="text-sm hover:text-primary transition-colors py-2"
            >
              {category.name}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          {/* top bar */}
          <div className="h-16 flex items-center justify-between">
            {/* logo */}
            <div className="flex items-center space-x-4">
              <MobileNav />
              <a href="/" className="text-2xl font-bold">
                Store
              </a>
            </div>

            {/* search  */}
            <div className="flex-1 max-w-md mx-4 md:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 pr-4"
                />
              </div>
            </div>

            {/* header */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0">
                  3
                </Badge>
              </Button>
            </div>
          </div>

          {/* desktop navbar */}
          <div className="hidden md:block border-t">
            <NavigationMenu className="py-2">
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <a href="/products" className="text-sm font-medium hover:text-primary transition-colors">
                    All Products
                  </a>
                </NavigationMenuItem>
                {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    <a
                      href={category.href}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {category.name}
                    </a>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <a href="/products/sale" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                    Sale
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-3 border-b bg-muted/30">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-foreground transition-colors">Products</a>
        </nav>
      </div>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="/returns" className="hover:text-foreground transition-colors">Returns</a></li>
                <li><a href="/shipping" className="hover:text-foreground transition-colors">Shipping Info</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/account" className="hover:text-foreground transition-colors">My Account</a></li>
                <li><a href="/orders" className="hover:text-foreground transition-colors">Order History</a></li>
                <li><a href="/wishlist" className="hover:text-foreground transition-colors">Wishlist</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="/careers" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="/press" className="hover:text-foreground transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Social Media</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Aiecommerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
