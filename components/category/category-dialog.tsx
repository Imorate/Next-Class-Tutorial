"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { createCategory } from "@/features/category/category.api";
import {
  CategoryFormValues,
  categorySchema,
} from "@/features/category/category.schema";
import { Category } from "@/features/category/category.type";
import { ApiError } from "@/lib/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface CategoryDialogProps {
  category?: Category;
}

export function CategoryDialog({ category }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(category);
  const FIELDS = ["name", "en_name", "image"] as const;
  type FormField = (typeof FIELDS)[number];
  const DEFAULT_VALUES: CategoryFormValues = {
    name: "",
    en_name: "",
    image: "",
  };

  function isFormField(field: string): field is FormField {
    return FIELDS.includes(field as FormField);
  }

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, category, form]);

  const mutation = useMutation({
    mutationFn: createCategory,

    onSuccess: async () => {
      setOpen(false);
      form.reset();
    },

    onError: (error) => {
      toast.error("خطایی رخ داده است");
      if (!(error instanceof ApiError)) {
        return;
      }
      if (error.fieldErrors) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          if (isFormField(field)) {
            form.setError(
              field,
              {
                type: "server",
                message: messages[0],
              },
              { shouldFocus: true },
            );
          }
        }
      }
    },
  });

  function onSubmit(values: CategoryFormValues) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" variant="outline" size="icon">
            {isEdit ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "ویرایش" : "ایجاد"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>نام</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    {...field}
                    disabled={mutation.isPending}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="en_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>نام انگلیسی</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    {...field}
                    disabled={mutation.isPending}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>عکس</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    {...field}
                    disabled={mutation.isPending}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Spinner />}
                {mutation.isPending
                  ? "در حال ذخیره"
                  : isEdit
                    ? "به روز رسانی"
                    : "ایجاد"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
