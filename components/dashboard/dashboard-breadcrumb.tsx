"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbLabels: Record<string, string> = {
  dashboard: "داشبورد",
  media: "رسانه",
};

export function DashboardBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    return {
      label:
        breadcrumbLabels[segment] ??
        segment.charAt(0).toUpperCase() + segment.slice(1),
      href,
      isLast: index === segments.length - 1,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb) => (
          <div key={breadcrumb.href} className="contents">
            {!breadcrumb.isLast && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    render={
                      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    }
                  ></BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}

            {breadcrumb.isLast && (
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
