import { BaseResponse } from "@/features/common/base-response.type";

export interface Category extends BaseResponse {
  name: string;
  en_name: string;
  image: string;
}
