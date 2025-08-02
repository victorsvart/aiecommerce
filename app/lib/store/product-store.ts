import prisma from "@/lib/prisma";
import { Prisma, Product } from "@prisma/client";

export async function getProducts(): Promise<Product[> {
  return await prisma.product.findMany();
}

export async function getProduct(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
}

export async function createProduct(product: Prisma.ProductCreateInput): Promise<Product> {
  return await prisma.product.create({
    data: product,
  });
}

export async function updateProduct(id: number, product: Prisma.ProductUpdateInput): Promise<Product> {
  return await prisma.product.update({
    where: {
      id: id,
    },
    data: product,
  });
}
