import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-6 w-30" />
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
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="py-0 gap-1 overflow-hidden">
            <Skeleton className="aspect-square w-full rounded-none" />
            <CardContent className="space-y-2 p-2">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
              <div className="flex items-center justify-between p-2">
                <Skeleton className="h-5 w-10 rounded-full" />
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
