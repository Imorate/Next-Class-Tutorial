import BrandsCarousel from "@/components/brand/brands-carousel";
import { CarouselSkeleton } from "@/components/carousel/carousel-skeleton";
import CategoriesCarousel from "@/components/category/categories-carousel";
import ProductCategoryCarousel from "@/components/product/product-category-carousel";
import SaleProductsCarousel from "@/components/product/sale-products-carousel";
import {
  BadgePercent,
  Laptop,
  Smartphone,
  TableOfContents,
  Tag,
} from "lucide-react";
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
        <Suspense fallback={<CarouselSkeleton heightClassName="h-84" />}>
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
      <section>
        <header className="mb-1">
          <p className="text-xl font-bold inline-flex items-center gap-2">
            <Laptop />
            محصولات لپ تاپ
          </p>
        </header>
        <Suspense fallback={<CarouselSkeleton heightClassName="h-84" />}>
          <ProductCategoryCarousel category="laptop" />
        </Suspense>
      </section>
      <section>
        <header className="mb-1">
          <p className="text-xl font-bold inline-flex items-center gap-2">
            <Smartphone />
            محصولات گوشی همراه
          </p>
        </header>
        <Suspense fallback={<CarouselSkeleton heightClassName="h-84" />}>
          <div className="w-auto">
            <ProductCategoryCarousel category="mobile" />
          </div>
        </Suspense>
      </section>
    </main>
  );
}
