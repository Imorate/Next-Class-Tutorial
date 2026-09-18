"use server";

import { Brand } from "@/features/brand/brand.type";
import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { ApiError } from "@/lib/api/types";
import { refresh, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { BrandFormValues, brandSchema } from "./brand.schema";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getBrands(
  useCache = true,
): Promise<BaseCollectionResponse<Brand>> {
  const options: RequestInit = useCache
    ? {
        next: {
          revalidate: 300,
          tags: ["brands"],
        },
      }
    : {
        cache: "no-store",
      };
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/api/brand`,
    options,
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch brands", response.status);
  }
  return response.json();
}

export async function createBrand(values: BrandFormValues) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const data = brandSchema.parse(values);
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/brand`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create brand");
  }
  revalidateTag("brands", "max");
  refresh();
  return response.json();
}

export async function deleteBrand(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/brand/${id}`, {
    method: "delete",
    headers: {
      Cookie: `token=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete brand");
  }
  revalidateTag("brands", "max");
  refresh();
  return response.json();
}
