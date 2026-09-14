import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getProducts } from "@/features/product/product.api";
import { hasDiscount } from "@/features/product/product.utils";
import { formatPrice, getPriceWithDiscount } from "@/lib/utils";
import { Percent, ShoppingCart } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "محصولات",
  description: "صفحه محصولات فروشگاه",
};

export default async function ProductsPage() {
  const ProductCollectionResponse = await getProducts();
  const products = ProductCollectionResponse.data ?? [];
  if (products.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingCart />
          </EmptyMedia>
          <EmptyTitle>محصولی یافت نشد</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight">محصولات</h1>
      </div>
      <div
        className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
      >
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="group flex h-full"
            aria-label={`View ${product.name}`}
          >
            <Card className="group py-0 gap-1 overflow-hidden transition-shadow hover:shadow-md">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.media[0].url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.sale !== 0 && (
                  <Badge className="bg-red-700 text-white dark:bg-red-950 dark:text-red-200 absolute left-2 top-2 text-xs">
                    تخفیف دار
                  </Badge>
                )}
              </div>
              <CardContent className="space-y-2 p-2 grow">
                <div className="text-xs text-muted-foreground flex justify-between">
                  <Badge>{product.category.name}</Badge>
                  <Badge variant="outline">{product.brand.name}</Badge>
                </div>
                <h3 className="text-right text-sm font-medium line-clamp-3 h-10">
                  {product.name}
                </h3>
                <div className="p-2 flex justify-between">
                  {hasDiscount(product) && (
                    <Badge className="bg-red-700 text-white dark:bg-red-950 dark:text-red-200 flex justify-items-center gap-1 text-xs">
                      {product.sale}
                      <span>
                        <Percent className="size-3.5" strokeWidth={3} />
                      </span>
                    </Badge>
                  )}
                  <div className="flex flex-col">
                    {hasDiscount(product) && (
                      <div className="text-sm flex justify-center gap-1">
                        <span>
                          {formatPrice(
                            getPriceWithDiscount(product.price, product.sale),
                          )}
                        </span>
                        <span>تومان</span>
                      </div>
                    )}
                    <div className="text-sm flex justify-center gap-1">
                      <span className="line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span>تومان</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
