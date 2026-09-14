import { Product } from "@/features/product/product.type";

export function hasDiscount(product: Product): boolean {
  return product.sale ? true : false;
}
