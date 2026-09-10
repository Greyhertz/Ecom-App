import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { logout } from "@/actions/auth";
import { CartCounter } from "./cart-counter"; // Import the client piece
import { Button } from "./ui/button";

export async function Navbar() {
  // 1. Get the session on the server
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const userPayload = await decrypt(session);

  return (
    <header className="border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight">
          Shelfmark
        </Link>

        <nav className="hidden gap-6 text-sm text-muted-foreground sm:flex">
          <Link href="/#writing" className="hover:text-foreground">
            Writing
          </Link>
          <Link href="/#desk" className="hover:text-foreground">
            Desk
          </Link>
          <Link href="/#paper" className="hover:text-foreground">
            Paper
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          {/* Client-side cart counter */}
          <CartCounter />

          {/* Server-side Auth logic */}

          {userPayload ? (
            <div className="flex items-center gap-4">
              <Link
                href="/orders"
                className="text-sm hover:underline underline-offset-4"
              >
                My Orders
              </Link>
              <form action={logout}>
                <Button variant="outline" size="sm">
                  Logout
                </Button>
              </form>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
