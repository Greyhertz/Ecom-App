"use server";

import bcrypt from "bcryptjs";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
// We will create this 'session' utility next

import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  // 1. Validation check
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { success: false, error: "An account with this email already exists." };
  }

  // 2. Hash and Save
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: "user", // Ensure you set a default role
      })
      .returning();

    // 3. Create Session
    await createSession(newUser.id, newUser.role);
    
    return { success: true };
  } catch (error) {
    console.error("[SIGNUP_DATABASE_ERROR]", error);
    return { success: false, error: "Something went wrong on our end. Please try again." };
  }
}

export async function login(formData: FormData) {
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { success: false, error: "Invalid email or password." };
  }

  await createSession(user.id, user.role);
  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
