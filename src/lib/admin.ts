import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function isAdmin() {
  const session = (await cookies()).get("session")?.value;
  const user = await decrypt(session);
  
  // Replace with your email!
  const ADMIN_EMAILS = ["greyhert120@gmail.com"]; 
  
  // You would ideally fetch this from the DB, but this works for now
  return user?.email && ADMIN_EMAILS.includes(user.email as string);
} 