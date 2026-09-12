import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="flex -ml-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="min-w-0 shrink-0 basis-1/2 pl-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <div className="overflow-hidden rounded-md border bg-card">
              <Skeleton className="h-20 w-full rounded-none" />
              <div className="px-2 py-1.5">
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
