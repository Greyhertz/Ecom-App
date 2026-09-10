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
  // 1. Extract the data from the form
  const name = formData.get("name") as string
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 2. We need to scramble the password before saving
  // QUESTION: Which variable should we scramble?
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert into the database
  // We use our 'db' and 'users' table
  const [newUser] = await db.insert(users)
    .values({
      name: name,
      email: email,
      password: hashedPassword,
    })
    .returning(); // This gives us back the user we just created (including their ID)

  // 4. Give them their "Wristband" (Session)
  await createSession(newUser.id);

  // 5. Send them home
  redirect("/");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Find the user in the database
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. CHECK THE PASSWORD
  // Remember: user.password is HASHED. The 'password' variable is PLAIN TEXT.
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // 3. Create session and redirect
  await createSession(user.id);
  redirect("/");
}

export async function logout() {
const cookieStore = await cookies()
cookieStore.delete("session")
redirect("/login")
}