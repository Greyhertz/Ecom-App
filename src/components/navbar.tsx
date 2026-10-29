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
import { User, ShoppingBag, Settings, Plus, LogOut } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";
import { NavbarShell } from "./navbar-shell";
import { DesktopNav } from "./desktop-nav";
import { Press } from "./motion";

export async function Navbar() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const userPayload = await decrypt(session);

  const userName = typeof userPayload?.name === "string" ? userPayload.name : "";
  const userEmail = typeof userPayload?.email === "string" ? userPayload.email : "";
  const userRole = typeof userPayload?.role === "string" ? userPayload.role : "";
  const userInitial = (userName || userEmail || "S").charAt(0).toUpperCase();

  return (
    <NavbarShell>
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-2 px-3 sm:h-16 sm:gap-5 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Mobile menu */}
        <div className="md:hidden">
          <MobileNavigation isLoggedIn={Boolean(userPayload)} isAdmin={userRole === "admin"} />
        </div>

        {/* Brand */}
        <Press scale={0.95} className="min-w-0 shrink">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2 sm:gap-3"
            aria-label="Shelfmark home"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent font-serif text-base font-semibold text-accent-foreground transition-transform duration-200 group-hover:rotate-[-4deg] sm:size-9 lg:size-10 lg:text-lg">
              S
            </span>
            <span className="truncate font-serif text-lg font-semibold tracking-tight sm:text-xl">
              Shelfmark
            </span>
          </Link>
        </Press>

        {/* Desktop navigation */}
        <DesktopNav isLoggedIn={Boolean(userPayload)} isAdmin={userRole === "admin"} />

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <CartCounter />

          {userPayload ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full border-border/70 bg-background shadow-none transition-transform active:scale-90"
                  aria-label="Open profile menu"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-[11px] font-medium text-background">
                    {userInitial}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-[min(16rem,calc(100vw-1.5rem))] rounded-2xl border-border/70 bg-background/95 p-1.5 shadow-xl backdrop-blur-xl"
              >
                <DropdownMenuLabel className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
                      {userInitial}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{userName || "Account"}</p>
                      <p className="mt-0.5 truncate text-xs font-normal text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer rounded-xl px-3 py-3 text-sm">
                    <ShoppingBag className="mr-3 size-4 text-muted-foreground" />
                    My orders
                  </Link>
                </DropdownMenuItem>

                {userRole === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/add-product"
                      className="cursor-pointer rounded-xl px-3 py-3 text-sm"
                    >
                      <Plus className="mr-3 size-4 text-muted-foreground" />
                      Add product
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer rounded-xl px-3 py-3 text-sm">
                    <Settings className="mr-3 size-4 text-muted-foreground" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <form action={logout} className="w-full">
                    <button
                      type="submit"
                      className="flex w-full items-center rounded-xl px-3 py-3 text-sm text-destructive focus:outline-none"
                    >
                      <LogOut className="mr-3 size-4" />
                      Log out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="rounded-full px-4 text-xs">
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="hidden sm:block">
                <Button size="sm" className="rounded-full px-4 text-xs shadow-sm">
                  Create account
                </Button>
              </Link>
              <Link href="/login" className="sm:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-full transition-transform active:scale-90"
                  aria-label="Login"
                >
                  <User className="size-5" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </NavbarShell>
  );
}