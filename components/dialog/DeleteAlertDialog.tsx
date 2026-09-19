"use client";

import ControlledDialogProps from "@/components/dialog/ControlledDialogProps";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteAlertDialogProps extends ControlledDialogProps {
  id: string;
  title: string;
  deleteFn: (id: string) => Promise<unknown>;
}

export function DeleteAlertDialog({
  id,
  title,
  open: controlledOpen,
  onOpenChange,
  deleteFn,
}: DeleteAlertDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  function handleOpenChange(value: boolean) {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  }

  const mutation = useMutation({
    mutationFn: () => deleteFn(id),
    onSuccess: () => {
      toast.success("عملیات با موفقیت انجام شد");
      handleOpenChange(false);
    },
    onError: () => {
      toast.error("خطایی رخ داده است");
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>حذف</AlertDialogTitle>
          <AlertDialogDescription>
            آیا مورد
            <span className="mx-1 font-bold"> {title} </span>
            حذف شود؟
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>لغو</AlertDialogCancel>

          <AlertDialogAction
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? "در حال حذف" : "حذف"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
