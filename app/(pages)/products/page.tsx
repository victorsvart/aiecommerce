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
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-6">
        <aside className="hidden lg:block w-80 shrink-0">
          <ProductFilters categories={categories} brands={brands} />
        </aside>
        <main className="flex-1 space-y-6">
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

function parseNumberArray(value?: string | string[]): number[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(Number).filter((n) => !isNaN(n));
  return value
    .split(",")
    .map(Number)
    .filter((n) => !isNaN(n));
}

function parseStringArray(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(",");
}

