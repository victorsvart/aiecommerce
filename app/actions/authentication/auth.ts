"use server";
import { hashPassword, verifyPassword } from "@/app/lib/brypt/password-utils";
import { SignInForm, SigninFormState } from "@/app/lib/definitions/signin-form";
import { SignUpForm, SignupFormState } from "@/app/lib/definitions/signup-form";
import { createSession } from "@/app/lib/session/session";
import { createUser, getUserByUsername } from "@/app/lib/store/user-store";
import { redirect } from "next/navigation";

const authCommonError: string = "Invalid username or password"; // for ambiguity

export async function signIn(_state: SigninFormState, formData: FormData) {
  const result = await SignInForm.safeParseAsync({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors };
  }

  const { username, password } = result.data;

  const user = await getUserByUsername(username);

  if (!user) {
    return { message: authCommonError };
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    return { message: authCommonError };
  }

  await createSession(user.id);
  redirect("/");
}

export async function signUp(_state: SignupFormState, formData: FormData) {
  const result = await SignUpForm.safeParseAsync({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors };
  }

  const { name, username, email, password } = result.data;
  const hashedPassword = await hashPassword(password);
  const user = await createUser({
    name,
    username,
    email,
    password: hashedPassword,
  });

  await createSession(user.id);
  redirect("/");
}
