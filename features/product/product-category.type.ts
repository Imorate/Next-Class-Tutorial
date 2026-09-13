import { Category } from "@/features/category/category.type";
import { Product } from "@/features/product/product.type";

export interface ProductCategoryCollection extends Category {
  products: Product[];
}
