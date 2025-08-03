import { ShoppingCart, User, Heart, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./(components)/search";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <MobileNav />
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AiECommerce
                </span>
              </a>
            </div>

            <SearchBar></SearchBar>

            {/* Icons */}
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

          {/* Desktop Nav */}
          <div className="hidden md:block border-t">
            <NavigationMenu className="py-2">
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <a
                    href="/products"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                  >
                    All Products
                  </a>
                </NavigationMenuItem>
                {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    <a
                      href={category.href}
                      className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                    >
                      {category.name}
                    </a>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <a
                    href="/products/sale"
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Sale
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3 border-b bg-white/50 dark:bg-slate-800/50">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <a
            href="/"
            className="hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <a
            href="/products"
            className="hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            Products
          </a>
        </nav>
      </div>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AiECommerce</span>
              </div>
              <p className="text-slate-400">
                The future of intelligent e-commerce, powered by advanced AI
                technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="/returns"
                    className="hover:text-white transition-colors"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    className="hover:text-white transition-colors"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="/account"
                    className="hover:text-white transition-colors"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href="/orders"
                    className="hover:text-white transition-colors"
                  >
                    Order History
                  </a>
                </li>
                <li>
                  <a
                    href="/wishlist"
                    className="hover:text-white transition-colors"
                  >
                    Wishlist
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/press"
                    className="hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 mt-8 text-center text-slate-400">
            <p>&copy; 2025 AiECommerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
