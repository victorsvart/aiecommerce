import prisma from "@/lib/prisma";
import { Prisma, Product } from "@prisma/client";
import { Filters } from "../definitions/filters";
import { ProductPaged } from "../definitions/product-paged";

export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany();
}

export async function getProductsByFilters(
  filters: Filters,
): Promise<ProductPaged> {
  const {
    categories,
    brands,
    priceMin = 0,
    priceMax = Infinity,
    sortBy,
    page = 1,
    limit = 10,
  } = filters;

  const where: Prisma.ProductWhereInput = {
    ...(categories && categories.length > 0
      ? { categoryId: { in: categories } }
      : {}),
    ...(brands && brands.length > 0 ? { brand: { in: brands } } : {}),
    price: {
      gte: priceMin,
      lte: priceMax,
    },
  };

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };

  switch (sortBy) {
    case "priceAsc":
      orderBy = { price: "asc" };
      break;
    case "priceDesc":
      orderBy = { price: "desc" };
      break;
    case "nameAsc":
      orderBy = { name: "asc" };
      break;
    case "nameDesc":
      orderBy = { name: "desc" };
      break;
  }

  const skip = (page - 1) * limit;

  const total = await prisma.product.count({ where });
  const totalPages = Math.ceil(total / limit);

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take: limit,
  });


  const allCategories = await prisma.category.findMany({
    where: {
      id: {
        in: products.map((p) => p.categoryId),
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const brandGroups = await prisma.product.groupBy({
    by: ["brand"],
    _count: { _all: true },
    where,
  });

  const categoriesResult = allCategories.map((g) => ({
    categoryId: g.id,
    count: allCategories.length,
    name: g.name,
  }));

  const brandsResult = brandGroups.map((g) => ({
    brand: g.brand,
    count: g._count._all,
  }));


  return {
    products,
    total,
    totalPages,
    categories: categoriesResult,
    brands: brandsResult,
  };
}

export async function getProduct(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
}

export async function createProduct(
  product: Prisma.ProductCreateInput,
): Promise<Product> {
  return await prisma.product.create({
    data: product,
  });
}

export async function updateProduct(
  id: number,
  product: Prisma.ProductUpdateInput,
): Promise<Product> {
  return await prisma.product.update({
    where: {
      id: id,
    },
    data: product,
  });
}
