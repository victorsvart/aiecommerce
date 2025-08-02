"use client";
import { signUp } from "@/app/actions/authentication/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon } from "lucide-react";
import { useActionState } from "react";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signUp, undefined);
  return (
    <>
      <form action={action}>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardAction>
            <Button variant="link">Sign In</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" required />
            </div>
            {state?.errors?.name && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription>
                  {state?.errors?.name?.map((err) => (
                    <p>{err}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" placeholder="johndoe" required />
            </div>
            {state?.errors?.username && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription>
                  {state?.errors?.username?.map((err) => (
                    <p>{err}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="youremail@example.com"
                required
              />
            </div>
            {state?.errors?.email && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription>
                  {state?.errors?.email?.map((err) => (
                    <p>{err}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" name="password" type="password" placeholder="••••••••••" required />
            </div>
            {state?.errors?.password && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription>
                  {state?.errors?.password?.map((err) => (
                    <p>{err}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-4">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing up..." : "Sign Up"}
          </Button>
          <Button variant="outline" className="w-full" disabled={pending}>
            Login with Google
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
