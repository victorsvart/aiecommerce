"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const routes = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Products", path: "/admin/products" },
  { name: "Users", path: "/admin/users" },
  { name: "Settings", path: "/admin/settings" },
];

interface User {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          
          // Check if user has admin role
          if (userData.role !== "ADMIN") {
            window.location.href = "/";
            return;
          }
        } else {
          // Redirect to signin if not authenticated
          window.location.href = "/auth/signin";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = "/auth/signin";
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don&apos;t have permission to access this area.</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
          <div className="text-sm text-gray-300">
            <p>Welcome, {user.name}</p>
            <p className="text-blue-400">Role: {user.role}</p>
          </div>
        </div>
        <nav className="flex flex-col space-y-2">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`p-2 rounded hover:bg-gray-700 transition ${
                pathname === route.path ? "bg-gray-700" : ""
              }`}
            >
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-2">
          <Link
            href="/"
            className="p-2 rounded hover:bg-gray-700 transition text-sm block"
          >
            ← Back to Site
          </Link>
          <button
            onClick={async () => {
              try {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/auth/signin";
              } catch (error) {
                console.error("Logout error:", error);
              }
            }}
            className="p-2 rounded hover:bg-gray-700 transition text-sm block w-full text-left text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
          <div className="text-sm text-gray-600">
            Admin Dashboard
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600">
              {user.email}
            </div>
            <Avatar>
              <AvatarImage src="/user.jpg" alt="User profile" />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}

