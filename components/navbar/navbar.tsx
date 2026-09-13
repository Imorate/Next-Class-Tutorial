"use client";

import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <>
      <section className="container mx-auto py-4 h-16">
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                {SITE_CONFIG.farsiName}
              </span>
            </Link>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Link href="/login">ورود</Link>
            </Button>
            <Button size="sm">
              <Link href="/signup">ثبت نام</Link>
            </Button>
          </div>
        </nav>
      </section>
    </>
  );
}
