import BrandsCarousel from "@/components/brand/brands-carousel";
import { CarouselSkeleton } from "@/components/carousel/carousel-skeleton";
import CategoriesCarousel from "@/components/category/categories-carousel";
import SaleProductsCarousel from "@/components/product/sale-products-carousel";
import { BadgePercent, TableOfContents, Tag } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  description: "صفحه اصلی فروشگاه",
};

export default function Home() {
  return (
    <main className="container mx-auto py-8 space-y-8">
      <section>
        <header className="mb-1">
          <p className="text-xl font-bold inline-flex items-center gap-2">
            <BadgePercent />
            محصولات تخفیف خورده
          </p>
        </header>
        <Suspense fallback={<CarouselSkeleton />}>
          <SaleProductsCarousel />
        </Suspense>
      </section>
      <section>
        <header className="mb-1">
          <p className="text-xl font-bold inline-flex items-center gap-2">
            <TableOfContents />
            دسته بندی ها
          </p>
        </header>
        <Suspense fallback={<CarouselSkeleton />}>
          <CategoriesCarousel />
        </Suspense>
      </section>
      <section>
        <header className="mb-1">
          <p className="text-xl font-bold inline-flex items-center gap-2">
            <Tag />
            برند ها
          </p>
        </header>
        <Suspense fallback={<CarouselSkeleton />}>
          <BrandsCarousel />
        </Suspense>
      </section>
    </main>
  );
}
