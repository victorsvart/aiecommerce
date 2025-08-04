import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  SECRET_KEY: z.string().min(32, "SECRET_KEY must be at least 32 characters"),
  SAMPLE_USER_PASSWORD: z.string().min(8, "SAMPLE_USER_PASSWORD must be at least 8 characters"),
  OPEN_API_KEY: z.string().min(1, "OPEN_API_KEY is required"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export function validateEnv() {
  try {
    const env = envSchema.safeParse(process.env);
    
    if (!env.success) {
      console.error("❌ Invalid environment variables:");
      console.error(env.error.flatten().fieldErrors);
      
      // In production, don't throw errors that would break SSR
      if (process.env.NODE_ENV === "production") {
        console.error("Environment validation failed in production");
        return {
          DATABASE_URL: process.env.DATABASE_URL || "",
          SECRET_KEY: process.env.SECRET_KEY || "",
          SAMPLE_USER_PASSWORD: process.env.SAMPLE_USER_PASSWORD || "",
          OPEN_API_KEY: process.env.OPEN_API_KEY || "",
          NODE_ENV: process.env.NODE_ENV || "production",
        };
      }
      
      throw new Error("Invalid environment variables");
    }
    
    return env.data;
  } catch (error) {
    console.error("Environment validation error:", error);
    
    // Return fallback values in production to prevent SSR errors
    if (process.env.NODE_ENV === "production") {
      return {
        DATABASE_URL: process.env.DATABASE_URL || "",
        SECRET_KEY: process.env.SECRET_KEY || "",
        SAMPLE_USER_PASSWORD: process.env.SAMPLE_USER_PASSWORD || "",
        OPEN_API_KEY: process.env.OPEN_API_KEY || "",
        NODE_ENV: process.env.NODE_ENV || "production",
      };
    }
    
    throw error;
  }
}

export const env = validateEnv(); 