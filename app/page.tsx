import BrandsCarousel from "@/components/brand/brands-carousel";
import { CarouselSkeleton } from "@/components/skeleton/CarouselSkeleton";
import { Tag } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  description: "صفحه اصلی فروشگاه",
};

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <section className="space-y-8">
        <header className="mb-1">
          <p className="text-xl font-bold inline-flex items-center gap-2">
            <Tag />
            برند ها
          </p>
          <p className="text-muted-foreground">لیست برند های موجود</p>
        </header>
        <Suspense fallback={<CarouselSkeleton />}>
          <BrandsCarousel />
        </Suspense>
      </section>
    </main>
  );
}
