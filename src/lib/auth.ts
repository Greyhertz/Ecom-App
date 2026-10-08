// src/lib/auth.ts
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAuthenticatedUser() {
  const session = (await cookies()).get("session")?.value;
  const sessionData = await decrypt(session);

  if (!sessionData?.userId) return null;

  // Fetch the user from DB to get the email for admin check
  return await db.query.users.findFirst({
    where: eq(users.id, sessionData.userId as string),
  });
}