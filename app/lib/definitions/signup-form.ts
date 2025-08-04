import z from "zod";

export const SignUpForm = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username is too long"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
});

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
