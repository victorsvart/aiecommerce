import { Prisma, PrismaClient, Product } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";

const prisma = new PrismaClient();
const dataFolderPath = "./prisma/seedData/";

async function seedCategory() {
  try {
    const data = fs.readFileSync(dataFolderPath + "categories.json", "utf8");
    const categories: Prisma.CategoryCreateInput[] = JSON.parse(data);

    for (const category of categories) {
      const newCategory = await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: {
          name: category.name,
        },
      });
      console.log(`Category ${newCategory.name} created!`);
    }
  } catch (err) {
    throw err;
  }
}

async function seedProduct() {
  try {
    const data = fs.readFileSync(dataFolderPath + "products.json", "utf8");
    const products: Product[] = JSON.parse(data);

    for (const product of products) {
      const category = await prisma.category.findUnique({
        where: { id: product.categoryId },
      });

      if (!category) {
        console.warn(`Category ID ${product.categoryId} not found. Skipping product: ${product.name}`);
        continue;
      }

      const newProduct = await prisma.product.upsert({
        where: { image: product.image },
        update: {},
        create: {
          name: product.name,
          description: product.description,
          price: product.price,
          brand: product.brand,
          image: product.image,
          category: {
            connect: { id: category.id },
          },
        },
      });

      console.log(`Product ${newProduct.name} created!`);
    }
  } catch (err) {
    throw err;
  }
}

async function seedUser() {
  try {
    // Create regular user
    const user = await prisma.user.upsert({
      where: { email: "svart@aiecommerce.com" },
      update: {},
      create: {
        name: "Victor Moraes",
        username: "victormoraes",
        email: "svart@aiecommerce.com",
        password: await bcrypt.hash(
          process.env.SAMPLE_USER_PASSWORD as string,
          10,
        ),
        role: "USER",
      },
    });

    console.log(`Sample user ${user.name} created or already exists!`);

    // Create admin user
    const admin = await prisma.user.upsert({
      where: { email: "admin@aiecommerce.com" },
      update: {},
      create: {
        name: "Admin User",
        username: "adminuser",
        email: "admin@aiecommerce.com",
        password: await bcrypt.hash(
          process.env.SAMPLE_USER_PASSWORD as string,
          10,
        ),
        role: "ADMIN",
      },
    });

    console.log(`Admin user ${admin.name} created or already exists!`);
  } catch (err) {
    throw err;
  }
}

export async function main() {
  try {
    await seedUser();
    await seedCategory();
    await seedProduct();
  } catch (err) {
    console.error("Seed failed:", err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
