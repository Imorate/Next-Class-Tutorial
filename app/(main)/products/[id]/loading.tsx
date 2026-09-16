import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-2" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Card className="overflow-hidden py-0">
          <CardContent className="p-0">
            <Skeleton className="aspect-square w-full rounded-none" />
          </CardContent>
        </Card>
        <div className="flex flex-col space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="mt-2 mb-10 space-y-2">
            <Skeleton className="h-8 w-full max-w-lg" />
            <Skeleton className="h-8 w-4/5 max-w-md" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5 p-2">
            <Skeleton className="h-9 w-28 rounded-full" />
            <div className="flex gap-5">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-7 w-32" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
