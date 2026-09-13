import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CarouselSkeletonProps {
  heightClassName?: string;
}

export function CarouselSkeleton({
  heightClassName = "h-20",
}: CarouselSkeletonProps) {
  return (
    <div className="w-full">
      <div className="flex -ml-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="py-4 min-w-0 shrink-0 basis-1/2 pl-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <div className="overflow-hidden rounded-md border bg-card">
              <Skeleton
                className={cn("w-full rounded-none", heightClassName)}
              />
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
