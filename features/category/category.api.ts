import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { ApiError } from "@/lib/api/types";
import { Category } from "./category.type";

export async function getCategories(): Promise<
  BaseCollectionResponse<Category>
> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch categories", response.status);
  }
  return response.json();
}
