import { Suspense } from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { ProductList } from "./components/product-list";
import { ProductActions } from "./components/product-actions";
import { ProductListSkeleton } from "./components/product-list-skeleton";

export const metadata: Metadata = {
  title: "Products Management - Admin",
  description: "Manage products in the admin panel",
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

async function getProducts(searchParams: Promise<{
  page?: string;
  search?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: string;
}>) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const category = params.category || "";
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  const limit = 10;
  const offset = (page - 1) * limit;

  const whereConditions = [];
  
  if (search) {
    whereConditions.push({
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
        { brand: { contains: search, mode: "insensitive" as const } },
      ],
    });
  }
  
  if (category) {
    whereConditions.push({ categoryId: parseInt(category) });
  }

  const where = whereConditions.length > 0 ? { AND: whereConditions } : {};

  // Handle sorting
  let orderBy: Record<string, "asc" | "desc"> | Record<string, Record<string, "asc" | "desc">> = { createdAt: "desc" };
  
  if (sortBy === "name") {
    orderBy = { name: sortOrder as "asc" | "desc" };
  } else if (sortBy === "price") {
    orderBy = { price: sortOrder as "asc" | "desc" };
  } else if (sortBy === "brand") {
    orderBy = { brand: sortOrder as "asc" | "desc" };
  } else if (sortBy === "category") {
    orderBy = { category: { name: sortOrder as "asc" | "desc" } };
  } else if (sortBy === "createdAt") {
    orderBy = { createdAt: sortOrder as "asc" | "desc" };
  }

  const [products, totalProducts, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy,
      take: limit,
      skip: offset,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return {
    products,
    totalProducts,
    categories,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(totalProducts / limit),
      hasNext: page < Math.ceil(totalProducts / limit),
      hasPrev: page > 1,
    },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { products, totalProducts, categories, pagination } = await getProducts(searchParams);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalog ({totalProducts} products)
          </p>
        </div>
        <ProductActions categories={categories} />
      </div>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList 
          products={products} 
          categories={categories}
          pagination={pagination}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

