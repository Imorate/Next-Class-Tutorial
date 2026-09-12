import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getBrands } from "@/features/brand/brand.api";
import Image from "next/image";
import Link from "next/link";

export default async function BrandGrid() {
  const brandsCollectionResponse = await getBrands();
  const brands = brandsCollectionResponse.data;
  return (
    <Carousel opts={{ align: "start", direction: "rtl" }} className="w-full">
      <CarouselContent className="-ml-2">
        {brands.map((brand) => (
          <CarouselItem
            key={brand._id}
            className="pl-2 py-4 md:pl-4 basis-1/3 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6"
          >
            <Link
              href={`/brand/${brand._id}`}
              className="group block overflow-hidden rounded-md border bg-card transition-shadow duration-300 hover:shadow-md"
            >
              <div className="relative h-20 w-full overflow-hidden">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <div className="px-2 py-2">
                <h3 className="truncate line-clamp-1 text-center text-xs font-medium">
                  {brand.name}
                </h3>
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
