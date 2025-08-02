import { Product } from "@prisma/client";

export interface ProductPaged {
  products: Product[];
  total: number;
  totalPages: number;
  categories: {categoryId: number, count: number, name: string}[];
  brands: {brand: string, count: number}[];
}
