import prisma from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";

export async function getUserById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserByUsername(username: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { username },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return await prisma.user.create({
    data,
  });
}

export async function updateUserById(
  id: number,
  data: Prisma.UserUpdateInput,
): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id },
  });
}
