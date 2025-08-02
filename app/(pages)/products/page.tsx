"use server";

import { Filters } from "@/app/lib/definitions/filters";
import { getProductsByFilters } from "@/app/lib/store/product-store";
import React from "react";
import ProductFilters from "./(components)/product-filter";
import ProductList from "./(components)/product-list";

interface ProductsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // hack to get searchParams from url. Next bitches about this all the time and idk why
  searchParams = await searchParams;
    const page = parseInt((searchParams?.page as string) || "1", 10);

  const filters: Filters = {
    categories: parseNumberArray(searchParams?.categories),
    brands: parseStringArray(searchParams?.brands),
    priceMin: Number(searchParams?.min ?? 0),
    priceMax: Number(searchParams?.max ?? 1000),
    sortBy: (searchParams?.sortBy as string) || "featured",
    page,
    limit: 12,
  };

  const { products, total, totalPages, categories, brands } =
    await getProductsByFilters(filters);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <ProductFilters categories={categories} brands={brands} />
        </aside>

        {/* Product List Section */}
        <main className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Browse Products
          </h1>
          <ProductList
            products={products}
            total={total}
            page={page}
            totalPages={totalPages}
          />
        </main>
      </div>
    </div>
  );
}

// --- Helpers ---
function parseNumberArray(value?: string | string[]): number[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(Number).filter((n) => !isNaN(n));
  return value.split(",").map(Number).filter((n) => !isNaN(n));
}

function parseStringArray(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(",");
}

