import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  SECRET_KEY: z.string().min(32, "SECRET_KEY must be at least 32 characters"),
  SAMPLE_USER_PASSWORD: z.string().min(8, "SAMPLE_USER_PASSWORD must be at least 8 characters"),
  OPEN_API_KEY: z.string().min(1, "OPEN_API_KEY is required"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export function validateEnv() {
  const env = envSchema.safeParse(process.env);
  
  if (!env.success) {
    console.error("❌ Invalid environment variables:");
    console.error(env.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  
  return env.data;
}

export const env = validateEnv(); 