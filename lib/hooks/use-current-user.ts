"use client";

import { MeResponse, User } from "@/features/auth/auth.type";
import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

async function getCurrentUser(): Promise<User> {
  const response = await apiClient<MeResponse>("/api/auth/me", {
    method: "GET",
    useBaseUrl: false,
  });
  if (!response.authorized || !response.user) {
    throw new Error("UNAUTHORIZED");
  }
  return response.user;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
  });
}
