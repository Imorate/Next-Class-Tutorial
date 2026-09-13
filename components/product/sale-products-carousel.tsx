import EmptyCarousel from "@/components/carousel/empty-carousel";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getSaleProducts } from "@/features/product/product.api";
import { formatPrice, getPriceWithDiscount } from "@/lib/utils";
import { Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SaleProductsCarousel() {
  const saleProductsCollectionResponse = await getSaleProducts();
  const saleProducts = saleProductsCollectionResponse.data ?? [];
  if (saleProducts.length === 0) {
    return <EmptyCarousel />;
  }
  return (
    <Carousel opts={{ align: "start", direction: "rtl" }} className="w-full">
      <CarouselContent className="-ms-2">
        {saleProducts.map((product) => (
          <CarouselItem
            key={product._id}
            className="px-2 py-4 basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6"
          >
            <Link
              href={`/product/${product._id}`}
              className="group block overflow-hidden rounded-md border bg-card transition-shadow duration-300 hover:shadow-md"
            >
              <div className="relative h-50 w-full overflow-hidden">
                <Image
                  src={product.media[0].url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-2">
                <Badge variant="secondary">{product.category.name}</Badge>
              </div>
              <div className="p-2">
                <h3 className="text-right text-xs font-medium">
                  {product.name}
                </h3>
              </div>
              <div className="p-2 flex justify-between">
                <Badge className="bg-red-700 text-white dark:bg-red-950 dark:text-red-200 flex justify-items-center gap-1 text-xs">
                  {product.sale}
                  <span>
                    <Percent className="size-3.5" strokeWidth={3} />
                  </span>
                </Badge>
                <div className="flex flex-col">
                  <div className="text-sm flex justify-center gap-1">
                    <span>
                      {formatPrice(
                        getPriceWithDiscount(product.price, product.sale),
                      )}
                    </span>
                    <span>تومان</span>
                  </div>
                  <div className="text-sm flex justify-center gap-1">
                    <span className="line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span>تومان</span>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
