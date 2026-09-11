import { ApiError } from "@/lib/api/types";
import { cacheLife, cacheTag } from "next/cache";
import { BrandsResponse } from "./brand.type";

export async function getBrands(): Promise<BrandsResponse> {
  "use cache";
  cacheLife("days");
  cacheTag("brands");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/brand`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch brands", response.status);
  }
  return response.json();
}
