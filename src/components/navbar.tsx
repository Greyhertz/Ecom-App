import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { logout } from "@/actions/auth";
import { CartCounter } from "./cart-counter";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  User,
  ShoppingBag,
  Settings,
  Plus,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

export async function Navbar() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const userPayload = await decrypt(session);

  const userName =
    typeof userPayload?.name === "string" ? userPayload.name : "";

  const userEmail =
    typeof userPayload?.email === "string" ? userPayload.email : "";

  const userInitial = (userName || userEmail || "S")
    .charAt(0)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="Shelfmark home"
        >
          <span className="flex size-9 items-center justify-center rounded-md border border-foreground bg-foreground text-sm font-semibold text-background transition-transform duration-200 group-hover:rotate-[-4deg]">
            S
          </span>

          <span className="hidden sm:block">
            <span className="block font-serif text-[17px] font-semibold tracking-[-0.02em]">
              Shelfmark
            </span>

            <span className="block text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Curated essentials
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center rounded-full border border-border/70 bg-muted/30 p-1">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-background hover:text-foreground"
            >
              Home
            </Link>

            <Link
              href="/collections"
              className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-background hover:text-foreground"
            >
              Collections
            </Link>

            {userPayload && (
              <Link
                href="/orders"
                className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-background hover:text-foreground"
              >
                Orders
              </Link>
            )}

            {userPayload && (
              <Link
                href="/admin/add-product"
                className="group flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-background hover:text-foreground"
              >
                Studio
                <ArrowUpRight className="size-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <CartCounter />

          {userPayload ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full border-border/70 bg-background shadow-none"
                  aria-label="Open profile menu"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-[11px] font-medium text-background">
                    {userInitial}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-64 rounded-xl border-border/70 bg-background/95 p-1.5 shadow-xl backdrop-blur-xl"
              >
                <DropdownMenuLabel className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                      {userInitial}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {userName || "Account"}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] font-normal text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href="/orders"
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-xs"
                  >
                    <ShoppingBag className="mr-3 size-4 text-muted-foreground" />
                    My Orders
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/add-product"
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-xs"
                  >
                    <Plus className="mr-3 size-4 text-muted-foreground" />
                    Add Product
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-xs"
                  >
                    <Settings className="mr-3 size-4 text-muted-foreground" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <form action={logout}>
                  <DropdownMenuItem asChild>
                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-xs text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-3 size-4" />
                      Logout
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-1.5 sm:flex">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-4 text-xs"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  size="sm"
                  className="rounded-full px-4 text-xs shadow-sm"
                >
                  Create account
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile account/login fallback */}
          {!userPayload && (
            <Link href="/login" className="sm:hidden">
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-full"
                aria-label="Login"
              >
                <User className="size-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}