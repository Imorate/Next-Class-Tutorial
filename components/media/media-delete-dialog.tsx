"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteMedia } from "@/features/media/media.api";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteMediaDialogProps {
  id: string;
  title: string;
}

export function DeleteMediaDialog({ id, title }: DeleteMediaDialogProps) {
  const mutation = useMutation({
    mutationFn: () => deleteMedia(id),

    onSuccess: async () => {},
    onError: () => {
      toast.error("خطایی رخ داده است");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button type="button" variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      ></AlertDialogTrigger>

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
