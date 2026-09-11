import BrandGrid from "@/components/brand/brand-grid";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <section className="space-y-8">
        <header className="space-y-2">
          <p className="text-xl font-bold">برند ها</p>
          <p className="text-muted-foreground">لیست برند های موجود</p>
        </header>
        <Suspense fallback={<div>Loading brands...</div>}>
          <BrandGrid />
        </Suspense>
      </section>
    </main>
  );
}
