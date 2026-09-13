import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { Product } from "@/features/product/product.type";
import { ApiError } from "@/lib/api/types";

export async function getSaleProducts(): Promise<
  BaseCollectionResponse<Product>
> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/sale`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch sale products", response.status);
  }
  return response.json();
}
