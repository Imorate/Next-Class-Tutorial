import { Brand } from "@/features/brand/brand.type";
import { Category } from "@/features/category/category.type";
import { BaseResponse } from "@/features/common/base-response.type";
import { Media } from "@/features/media/media.type";

export interface Product extends BaseResponse {
  name: string;
  price: number;
  sale: number;
  media: Media[];
  category: Category;
  brand: Brand;
}
