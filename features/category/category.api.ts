"use server";

import {
  CategoryFormValues,
  categorySchema,
} from "@/features/category/category.schema";
import { Category } from "@/features/category/category.type";
import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { ApiError } from "@/lib/api/types";
import { refresh, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getCategories(
  useCache = true,
): Promise<BaseCollectionResponse<Category>> {
  const options: RequestInit = useCache
    ? {
        next: {
          revalidate: 300,
          tags: ["categories"],
        },
      }
    : {
        cache: "no-store",
      };
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/api/category`,
    options,
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch categories", response.status);
  }
  return response.json();
}

export async function createCategory(values: CategoryFormValues) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const data = categorySchema.parse(values);
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/category`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create category");
  }
  revalidateTag("categories", "max");
  refresh();
  return response.json();
}

export async function updateCategory(id: string, values: CategoryFormValues) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const data = categorySchema.parse(values);
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/api/category/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to update category");
  }
  revalidateTag("categories", "max");
  refresh();
  return response.json();
}

export async function deleteCategory(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/api/category/${id}`,
    {
      method: "delete",
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
  revalidateTag("categories", "max");
  refresh();
  return response.json();
}
