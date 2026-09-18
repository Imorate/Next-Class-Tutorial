import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { Media } from "@/features/media/media.type";
import { ApiError } from "@/lib/api/types";

export async function getAllMedia(): Promise<BaseCollectionResponse<Media>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/media`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new ApiError("Failed to fetch all media", response.status);
  }
  return response.json();
}
