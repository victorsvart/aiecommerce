import z from "zod";

export const SignUpForm = z.object({
  name: z.string().min(2, "Name is too short"),
  username: z.string().min(2, "Username is too short"),
  email: z.email(),
  password: z.string().min(4, "Password is too short"),
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
