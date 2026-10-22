// src/lib/admin.ts
import "server-only";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function isAdmin() {
  const session = (await cookies()).get("session")?.value;
  const user = await decrypt(session);

  console.log("DEBUG: Decrypted Session:", user); // This will now show the email!

  const ADMIN_EMAILS = ["greyhert120@gmail.com"];
  const isAuthorized = !!(
    user?.email && ADMIN_EMAILS.includes(user.email as string)
  );

  console.log("DEBUG: Is User Admin?", isAuthorized, "Email:", user?.email);
  // Use optional chaining and ensure it's a string
  return isAuthorized;
}
