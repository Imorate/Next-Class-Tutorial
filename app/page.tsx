import BrandGrid from "@/components/brand/brand-grid";
import { CarouselSkeleton } from "@/components/skeleton/CarouselSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <section className="space-y-8">
        <header className="mb-1">
          <p className="text-xl font-bold">برند ها</p>
          <p className="text-muted-foreground">لیست برند های موجود</p>
        </header>
        <Suspense fallback={<CarouselSkeleton />}>
          <BrandGrid />
        </Suspense>
      </section>
    </main>
  );
}
