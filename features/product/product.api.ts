"use server";

import { BaseCollectionResponse } from "@/features/common/base-response.type";
import {
  ProductFormValues,
  productSchema,
} from "@/features/product/product.schema";
import {
  CategoryProductCollection,
  Product,
} from "@/features/product/product.type";
import { ApiError } from "@/lib/api/types";
import { refresh, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getSaleProducts(): Promise<
  BaseCollectionResponse<Product>
> {
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/product/sale`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new ApiError("Failed to fetch sale products", response.status);
  }
  return response.json();
}

export async function getProducts(): Promise<BaseCollectionResponse<Product>> {
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/product`, {
    next: {
      revalidate: 300,
      tags: ["products"],
    },
  });
  if (!response.ok) {
    throw new ApiError("Failed to fetch products", response.status);
  }
  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`);
  if (!response.ok) {
    throw new ApiError(`Failed to fetch product[id=${id}]`, response.status);
  }
  return response.json();
}

export async function getCategoryProducts(
  category: string,
): Promise<CategoryProductCollection> {
  if (!category) {
    throw new Error("Illegal argument category");
  }
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/api/product/category/${category}`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new ApiError(
      "Failed to fetch products with category",
      response.status,
    );
  }
  return response.json();
}

export async function createProduct(values: ProductFormValues) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const data = productSchema.parse(values);
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/product`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  revalidateTag("products", "max");
  refresh();
  return response.json();
}

export async function deleteProduct(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`,
    {
      method: "delete",
      headers: {
        Cookie: `token=${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
  revalidateTag("products", "max");
  refresh();
  return response.json();
}
