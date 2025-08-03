"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Category {
  categoryId: number;
  count: number;
  name: string;
}
interface Brand {
  id: string;
  brand: string;
  count: number;
}

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
}

export default function ProductFilters({ categories, brands }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategories = searchParams.get("categories")?.split(",").map(Number) || [];
  const initialBrands = searchParams.get("brands")?.split(",") || [];
  const initialMin = Number(searchParams.get("min") ?? 0);
  const initialMax = Number(searchParams.get("max") ?? 1000);
  const initialSortBy = searchParams.get("sortBy") ?? "featured";

  const [selectedCategories, setSelectedCategories] = useState<number[]>(initialCategories);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMin, initialMax]);
  const [sortBy, setSortBy] = useState(initialSortBy);

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));
    if (selectedBrands.length > 0)
      params.set("brands", selectedBrands.join(","));
    if (priceRange[0] > 0) params.set("min", priceRange[0].toString());
    if (priceRange[1] < 1000) params.set("max", priceRange[1].toString());
    if (sortBy !== "featured") params.set("sortBy", sortBy);
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  }, [selectedCategories, selectedBrands, priceRange, sortBy, router]);

  const toggleCategory = (id: number) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-3 space-y-4">
          <h3 className="text-lg font-semibold">Categories</h3>
          <Separator />
          <div className="space-y-2">
            {categories.map(({ categoryId, name, count }) => (
              <Label key={categoryId} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCategories.includes(categoryId)}
                  onCheckedChange={() => toggleCategory(categoryId)}
                />
                <span className="text-sm">{`${name} (${count})`}</span>
              </Label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-3 space-y-4">
          <h3 className="text-lg font-semibold">Brands</h3>
          <Separator />
          <div className="space-y-2">
            {brands.map(({ id, brand, count }) => (
              <Label key={id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <span className="text-sm">{`${brand} (${count})`}</span>
              </Label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Price Range</h3>
          <Separator />
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-24"
            />
            <span className="text-sm">to</span>
            <Input
              type="number"
              min={priceRange[0]}
              max={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-24"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-lg font-semibold">Sort By</h3>
          <Separator />
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
              <SelectItem value="nameAsc">Name: A-Z</SelectItem>
              <SelectItem value="nameDesc">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}

