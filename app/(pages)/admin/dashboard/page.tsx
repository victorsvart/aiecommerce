import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the e-commerce platform",
};

export default async function AdminDashboard() {
  // Get basic statistics
  const [totalProducts, totalCategories, totalUsers] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.user.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to the admin panel. Here you can manage your e-commerce platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Products in your catalog
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Product categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Product Management</h3>
              <p className="text-sm text-gray-600">
                Add, edit, or remove products from your catalog.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">User Management</h3>
              <p className="text-sm text-gray-600">
                Manage user accounts and permissions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Settings</h3>
              <p className="text-sm text-gray-600">
                Configure platform settings and preferences.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Platform Status</h3>
              <p className="text-sm text-green-600">✅ All systems operational</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Database</h3>
              <p className="text-sm text-gray-600">PostgreSQL - Connected</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Environment</h3>
              <p className="text-sm text-gray-600">
                {process.env.NODE_ENV === "production" ? "Production" : "Development"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 