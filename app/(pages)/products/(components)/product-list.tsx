"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductListProps {
  products: Product[];
  total: number;
  isGridView: boolean;
  setIsGridView: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  totalPages: number;
}

export default function ProductList({
  products,
  total,
  page,
  totalPages,
}: ProductListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewFromUrl = searchParams.get("view") || "grid";

  const [isGridView, setIsGridView] = useState(viewFromUrl === "grid");

  useEffect(() => {
    const currentView = isGridView ? "grid" : "list";
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") !== currentView) {
      params.set("view", currentView);
      router.replace(`${window.location.pathname}?${params.toString()}`, {});
    }
  }, [isGridView, router]);
  const renderProduct = (product: Product) => (
    <div key={product.id} className="border rounded p-4">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-muted-foreground">{product.brand}</p>
      <p>${product.price}</p>
    </div>
  );

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber.toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
  };
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button
            className={`px-3 py-1 rounded-l border ${
              isGridView ? "bg-blue-600 text-white" : "bg-white"
            }`}
            onClick={() => setIsGridView(true)}
          >
            Grid
          </button>
          <button
            className={`px-3 py-1 rounded-r border ${
              !isGridView ? "bg-blue-600 text-white" : "bg-white"
            }`}
            onClick={() => setIsGridView(false)}
          >
            List
          </button>
        </div>
        <div>
          <span>
            Page {page} of {totalPages} ({total} items)
          </span>
        </div>
      </div>

      <div
        className={
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "flex flex-col space-y-4"
        }
      >
        {products.length > 0 ? (
          products.map(renderProduct)
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center space-x-2">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((idx) => (
          <button
            key={idx + 1}
            onClick={() => goToPage(idx + 1)}
            className={`px-3 py-1 border rounded ${
              page === idx + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
