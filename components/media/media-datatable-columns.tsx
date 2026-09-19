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
import { deleteMedia } from "@/features/media/media.api";
import { Media } from "@/features/media/media.type";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { DeleteAlertDialog } from "../dialog/DeleteAlertDialog";

const columnHelper = createColumnHelper<DataTableFeatures, Media>();

function Actions({ item }: { item: Media }) {
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
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
              حذف
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        id={item._id}
        title={item.url}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        deleteFn={deleteMedia}
      />
    </>
  );
}

export const columns = columnHelper.columns([
  columnHelper.accessor("url", {
    header: "آدرس",
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
