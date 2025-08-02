"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  categoryId: number;
  count: number;
  name: string;
}
interface Brand {
  brand: string;
  count: number;
}

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
}

export default function ProductFilters({
  categories,
  brands,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategories =
    searchParams.get("categories")?.split(",").map(Number) || [];
  const initialBrands = searchParams.get("brands")?.split(",") || [];
  const initialMin = Number(searchParams.get("min") ?? 0);
  const initialMax = Number(searchParams.get("max") ?? 1000);
  const initialSortBy = searchParams.get("sortBy") ?? "featured";

  const [selectedCategories, setSelectedCategories] =
    useState<number[]>(initialCategories);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMin,
    initialMax,
  ]);
  const [sortBy, setSortBy] = useState(initialSortBy);

  // Update URL query on filter change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));
    if (selectedBrands.length > 0)
      params.set("brands", selectedBrands.join(","));
    if (priceRange[0] > 0) params.set("min", priceRange[0].toString());
    if (priceRange[1] < 1000) params.set("max", priceRange[1].toString());
    if (sortBy !== "featured") params.set("sortBy", sortBy);
    params.set("page", "1"); // reset page on filter change

    router.push(`/products?${params.toString()}`);
  }, [selectedCategories, selectedBrands, priceRange, sortBy]);

  // Handlers for toggling filters
  const toggleCategory = (id: number) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );

  return (
    <div className="space-y-6">
      <section>
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul>
          {categories.map(({ categoryId, count, name}) => (
            <li key={categoryId}>
              <label className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(categoryId)}
                  onChange={() => toggleCategory(categoryId)}
                />
                <span>{`${name} (${count})`}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Brands</h3>
        <ul>
          {brands.map(({ brand, count }) => (
            <li key={brand}>
              <label className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span>{`${brand} (${count})`}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            className="border rounded px-2 py-1 w-20"
            value={priceRange[0]}
            min={0}
            max={priceRange[1]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <span>-</span>
          <input
            type="number"
            className="border rounded px-2 py-1 w-20"
            value={priceRange[1]}
            min={priceRange[0]}
            max={1000}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="featured">Featured</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A-Z</option>
          <option value="nameDesc">Name: Z-A</option>
        </select>
      </section>
    </div>
  );
}
