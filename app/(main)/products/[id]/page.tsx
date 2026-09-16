import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { getProduct } from "@/features/product/product.api";
import { hasDiscount } from "@/features/product/product.utils";
import { formatPrice, getPriceWithDiscount } from "@/lib/utils";
import { Percent } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: PageProps<"/products/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product.name,
    description: `صفحه محصول ${product.name}`,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <main className="container mx-auto px-4 py-8">
      {getBreadcrumb(product.name)}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Card className="overflow-hidden py-0">
          <CardContent className="p-0">
            <div className="relative aspect-square bg-muted">
              <Image
                src={product.media[0].url}
                alt={product.name}
                fill
                priority
                sizes=" (max-width: 640px) 100vw, 50vw "
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col space-y-4">
          <div>
            <div className="flex gap-2">
              <Badge>{product.category.name}</Badge>
              <Badge variant="outline">{product.brand.name}</Badge>
            </div>
            <h1 className="mt-2 mb-10 text-2xl font-bold leading-12">
              {product.name}
            </h1>
          </div>
          <div className="p-2 flex justify-between flex-wrap gap-5 text-xl font-bold">
            {hasDiscount(product) && (
              <Badge className="bg-red-700 text-white dark:bg-red-950 dark:text-red-200 flex justify-items-center gap-1 text-lg h-auto">
                {product.sale}
                <span>
                  <Percent className="size-5" strokeWidth={3} />
                </span>
                تخفیف
              </Badge>
            )}
            <div className="flex gap-5">
              <div className="flex justify-center align-middle gap-1">
                <span className={hasDiscount(product) ? "line-through" : ""}>
                  {formatPrice(product.price)}
                </span>
                <span>تومان</span>
              </div>
              {hasDiscount(product) && (
                <div className="flex justify-center align-middle gap-1">
                  <span>
                    {formatPrice(
                      getPriceWithDiscount(product.price, product.sale),
                    )}
                  </span>
                  <span>تومان</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function getBreadcrumb(productTitle: string) {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            صفحه اصلی
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            محصولات
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{productTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
