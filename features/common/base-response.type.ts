export interface BaseResponse {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseCollectionResponse<T> {
  success: boolean;
  data: T[];
}
