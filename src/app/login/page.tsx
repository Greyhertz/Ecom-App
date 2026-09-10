import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
// import { Link } from "lucide-react";
import { redirect } from "next/dist/client/components/navigation";
import Link from "next/link";

export default function LoginForm() {

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <form action={login}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">Create account</Button>
            <div className="text-sm text-center text-muted-foreground">
              No account yet?{" "}
              <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}