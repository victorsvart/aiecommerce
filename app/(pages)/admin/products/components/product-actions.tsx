"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateProductDialog } from "./create-product-dialog";
import { Category } from "@prisma/client";

interface ProductActionsProps {
  categories: Category[];
}

export function ProductActions({ categories }: ProductActionsProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsCreateDialogOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Product
      </Button>

      <CreateProductDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        categories={categories}
      />
    </>
  );
} 