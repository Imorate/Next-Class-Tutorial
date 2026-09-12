import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  wrapperClassName?: string;
}

export default function EmptyCarousel({
  title = "آیتمی یافت نشد",
  description = "هیچ آیتمی برای نمایش وجود ندارد",
  className,
  wrapperClassName,
}: EmptyStateProps) {
  return (
    <section className={cn("w-full my-4", wrapperClassName)}>
      <div
        className={cn(
          "flex flex-col gap-3 min-h-36 items-center justify-center rounded-md border border-dashed bg-muted/30",
          className,
        )}
      >
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
