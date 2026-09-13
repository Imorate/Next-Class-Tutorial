"use client";

import { Menu, User } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_CONFIG } from "@/lib/constants";

const navigationItems = [
  {
    title: "محصولات",
    href: "/products",
  },
  {
    title: "دسته‌بندی‌ها",
    href: "/categories",
  },
  {
    title: "برندها",
    href: "/brands",
  },
];

export default function Navbar() {
  return (
    <header className="sticky h-16 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {SITE_CONFIG.farsiName}
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex">
          <div className="flex items-center gap-1">
            <Link
              href="/account"
              aria-label="حساب کاربری"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                aria-label="باز کردن منو"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>

              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>منو</SheetTitle>
                </SheetHeader>

                <nav className="mt-6 flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
