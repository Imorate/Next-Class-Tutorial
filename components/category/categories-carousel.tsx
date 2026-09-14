import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCategories } from "@/features/category/category.api";
import Image from "next/image";
import Link from "next/link";
import EmptyCarousel from "../carousel/empty-carousel";

export default async function CategoriesCarousel() {
  const categoriesCollectionResponse = await getCategories();
  const categories = categoriesCollectionResponse.data ?? [];
  if (categories.length === 0) {
    return <EmptyCarousel />;
  }
  return (
    <Carousel opts={{ align: "start", direction: "rtl" }} className="w-full">
      <CarouselContent className="-ms-2">
        {categories.map((category) => (
          <CarouselItem
            key={category._id}
            className="px-2 py-4 basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6"
          >
            <Link
              href={`/categories/${category._id}`}
              className="group block overflow-hidden rounded-md border bg-card transition-shadow duration-300 hover:shadow-md"
            >
              <div className="relative h-20 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-2">
                <h3 className="truncate line-clamp-1 text-center text-xs font-medium">
                  {category.name}
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
