"use server";

import { BaseCollectionResponse } from "@/features/common/base-response.type";
import { MediaFormValues, mediaSchema } from "@/features/media/media.schema";
import { Media } from "@/features/media/media.type";
import { ApiError } from "@/lib/api/types";
import { refresh, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getAllMedia(): Promise<BaseCollectionResponse<Media>> {
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/media`, {
    next: {
      revalidate: 300,
      tags: ["media"],
    },
  });
  if (!response.ok) {
    throw new ApiError("Failed to fetch all media", response.status);
  }
  return response.json();
}

export async function createMedia(values: MediaFormValues) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const data = mediaSchema.parse(values);
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/media`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create media");
  }
  revalidateTag("media", "max");
  refresh();
  return response.json();
}

export async function deleteMedia(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/media/${id}`, {
    method: "delete",
    headers: {
      Cookie: `token=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete media");
  }
  revalidateTag("media", "max");
  refresh();
  return response.json();
}
