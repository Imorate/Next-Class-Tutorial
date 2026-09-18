"use client";

import { DeleteBrandDialog } from "@/components/brand/brand-delete-dialog";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { DataTableFeatures } from "@/components/datatable/data-table-features";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brand } from "@/features/brand/brand.type";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Brand>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="نام" />;
    },
  }),
  columnHelper.accessor("logo", {
    header: "لوگو",
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="زمان ساخت" />;
    },
  }),
  columnHelper.accessor("updatedAt", {
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="زمان به روز رسانی" />
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">بار کردن منو</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>عملیات ها</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item._id)}
              >
                کپی
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                render={<DeleteBrandDialog id={item._id} title={item.name} />}
              ></DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
