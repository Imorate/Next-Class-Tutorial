"use client";

import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { DataTableFeatures } from "@/components/datatable/data-table-features";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBrand } from "@/features/brand/brand.api";
import { Brand } from "@/features/brand/brand.type";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { DeleteAlertDialog } from "../dialog/DeleteAlertDialog";
import { BrandDialog } from "./brand-dialog";

const columnHelper = createColumnHelper<DataTableFeatures, Brand>();

function Actions({ item }: { item: Brand }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="h-8 w-8 p-0" />}
        >
          <span className="sr-only">باز کردن منو</span>
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
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              ویرایش
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
              حذف
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <BrandDialog brand={item} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteAlertDialog
        id={item._id}
        title={item.name}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        deleteFn={deleteBrand}
      />
    </>
  );
}

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
      return <Actions item={row.original} />;
    },
  }),
]);
