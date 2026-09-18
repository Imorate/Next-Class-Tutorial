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
import { createBrand } from "@/features/brand/brand.api";
import { BrandFormValues, brandSchema } from "@/features/brand/brand.schema";
import { Brand } from "@/features/brand/brand.type";
import { ApiError } from "@/lib/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface BrandDialogProps {
  brand?: Brand;
}

export function BrandDialog({ brand }: BrandDialogProps) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(brand);
  const FIELDS = ["name", "logo"] as const;
  type FormField = (typeof FIELDS)[number];
  const DEFAULT_VALUES: BrandFormValues = {
    name: "",
    logo: "",
  };

  function isFormField(field: string): field is FormField {
    return FIELDS.includes(field as FormField);
  }

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, brand, form]);

  const mutation = useMutation({
    mutationFn: createBrand,

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

  function onSubmit(values: BrandFormValues) {
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
              name="logo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>لوگو</FieldLabel>
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
