"use client";

import { getCurrentSession } from "@/features/auth/auth.api";
import { useQuery } from "@tanstack/react-query";

export function useCurrentSession() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentSession,
    retry: false,
  });
}
