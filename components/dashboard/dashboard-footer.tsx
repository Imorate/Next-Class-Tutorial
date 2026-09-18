"use client";

import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useLogout } from "@/lib/hooks/use-logout";
import { LogOutIcon } from "lucide-react";

export default function DashboardFooter() {
  const logoutMutation = useLogout();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Button
          className="w-full inline-flex gap-1"
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          <LogOutIcon />
          خروج
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
