"use client";

import { logout } from "@/features/auth/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: ["auth"],
      });
      router.replace("/login");
      router.refresh();
    },
  });
}
