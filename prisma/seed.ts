import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedUser() {
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
}

export async function main() {
  console.log("hello")
  await seedUser();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
