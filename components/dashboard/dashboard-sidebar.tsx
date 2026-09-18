import * as React from "react";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";

interface Navigation {
  id: string;
  title: string;
  url: string;
  isActive?: boolean;
  items?: Navigation[];
}

const nav: Navigation[] = [
  {
    id: "management",
    title: "مدیریت",
    url: "#",
    items: [
      {
        id: "product",
        title: "محصول",
        url: "/dashboard/products",
      },
      {
        id: "category",
        title: "دسته بندی",
        url: "/dashboard/categories",
      },
      {
        id: "brand",
        title: "برند",
        url: "/dashboard/brands",
      },
      {
        id: "media",
        title: "رسانه",
        url: "/dashboard/media",
      },
    ],
  },
];

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} side="right">
      <SidebarHeader className="pt-10 pb-5">
        <LayoutDashboard size={40} className="mx-auto" />
        <span className="text-center font-bold text-xl">داشبورد مدیریت</span>
      </SidebarHeader>
      <Separator className="my-5" />
      <SidebarContent>
        {nav.map((item) => (
          <SidebarGroup key={item.id}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items &&
                  item.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={item.isActive}
                        render={<a href={item.url} />}
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
