"use client";

import { Product } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";
import { AddToCartButton } from "@/app/components/cart/add-to-cart-button";

interface ProductListProps {
  products: Product[];
  total: number;
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

  const searchParamsString = useMemo(() => searchParams.toString(), [searchParams]);

  useEffect(() => {
    const currentView = isGridView ? "grid" : "list";
    const params = new URLSearchParams(searchParamsString);
    if (params.get("view") !== currentView) {
      params.set("view", currentView);
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }
  }, [isGridView, router, searchParamsString]);

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParamsString);
    params.set("page", pageNumber.toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const renderProduct = (product: Product) => (
    <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <p className="text-base font-medium text-primary">${product.price}</p>
        <AddToCartButton productId={product.id} />
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant={isGridView ? "default" : "outline"}
            onClick={() => setIsGridView(true)}
            size="icon"
          >
            <Grid2X2 className="w-4 h-4" />
          </Button>
          <Button
            variant={!isGridView ? "default" : "outline"}
            onClick={() => setIsGridView(false)}
            size="icon"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages} ({total} items)
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
          <p className="text-muted-foreground text-center py-10">
            No products found.
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        <Button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          variant="outline"
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <Button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              variant={pageNum === page ? "default" : "outline"}
            >
              {pageNum}
            </Button>
          );
        })}
        <Button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

