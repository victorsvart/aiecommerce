import { hashPassword } from "@/app/lib/brypt/password-utils";
import prisma from "@/lib/prisma";

async function seedUser() {
  const user = await prisma.user.upsert({
    where: { email: "svart@aiecommerce.com" },
    update: {},
    create: {
      name: "Victor Moraes",
      username: "victormoraes",
      email: "svart@aiecommerce.com",
      password: await hashPassword(process.env.SAMPLE_USER_PASSWORD as string),
    },
  });

  console.log(`Sample user ${user.name} created or already exists!`);
}

export async function main() {
  await seedUser();
}

