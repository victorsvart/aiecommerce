"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createProductAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const brand = formData.get("brand") as string;
    const image = formData.get("image") as string;
    const categoryId = parseInt(formData.get("categoryId") as string);

    if (!name || !description || !price || !brand || !image || !categoryId) {
      throw new Error("All fields are required");
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        brand,
        image,
        categoryId,
      },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProductAction(formData: FormData) {
  try {
    const id = parseInt(formData.get("id") as string);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const brand = formData.get("brand") as string;
    const image = formData.get("image") as string;
    const categoryId = parseInt(formData.get("categoryId") as string);

    if (!id || !name || !description || !price || !brand || !image || !categoryId) {
      throw new Error("All fields are required");
    }

    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        brand,
        image,
        categoryId,
      },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProductAction(formData: FormData) {
  try {
    const id = parseInt(formData.get("id") as string);

    if (!id) {
      throw new Error("Product ID is required");
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
} 