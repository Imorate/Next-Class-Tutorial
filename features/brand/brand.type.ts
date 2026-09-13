import { BaseResponse } from "@/features/common/base-response.type";

export interface Brand extends BaseResponse {
  name: string;
  logo: string;
}
