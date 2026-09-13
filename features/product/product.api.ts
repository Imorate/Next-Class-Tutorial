import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { ProductCategoryCollection } from "@/features/product/product-category.type";
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

export async function getProducts(
  category: string,
): Promise<ProductCategoryCollection> {
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
