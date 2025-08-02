import z from "zod";

export const SignInForm = z.object({
  username: z.string(),
  password: z.string(),
});

export type SigninFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
