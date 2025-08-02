import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";

const prisma = new PrismaClient();
const dataFolderPath = "./prisma/seedData/";

async function seedProduct() {
  try {
    const data = fs.readFileSync(dataFolderPath + "products.json", "utf8");
    const products: Prisma.ProductCreateInput[] = JSON.parse(data);

    for (const product of products) {
      const newProduct = await prisma.product.upsert({
        where: { image: product.image },
        update: {},
        create: {
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
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
      },
    });

    console.log(`Sample user ${user.name} created or already exists!`);
  } catch (err) {
    throw err;
  }
}

export async function main() {
  try {
    await seedUser();
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
