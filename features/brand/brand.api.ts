import { Brand } from "@/features/brand/brand.type";
import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { ApiError } from "@/lib/api/types";

export async function getBrands(): Promise<BaseCollectionResponse<Brand>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/brand`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch brands", response.status);
  }
  return response.json();
}
