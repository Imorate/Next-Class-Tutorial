import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { CategoryProductCollection } from "@/features/product/category-product.type";
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

export async function getProducts(): Promise<BaseCollectionResponse<Product>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`,
    {
      next: {
        revalidate: 300,
        tags: ["products"],
      },
    },
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch products", response.status);
  }
  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`,
  );
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/category/${category}`,
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
