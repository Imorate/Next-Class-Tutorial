"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signup } from "@/features/auth/auth.api";
import { ApiError } from "@/lib/api/types";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  signupFormSchema,
  SignupFormValues,
} from "@/lib/validation/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UserKey } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const SIGNUP_FIELDS = [
    "name",
    "email",
    "password",
    "confirmPassword",
  ] as const;
  type SignupField = (typeof SIGNUP_FIELDS)[number];
  const DEFAULT_SIGNUP_VALUES: SignupFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: DEFAULT_SIGNUP_VALUES,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const signupMutation = useMutation({
    mutationKey: ["auth", "signup"],
    mutationFn: signup,
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد", {
        duration: 1500,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (error) => {
      if (!(error instanceof ApiError)) {
        return;
      }
      toast.error(error.message ?? "خطایی رخ داده است");
      if (error.fieldErrors) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          if (isSignupField(field)) {
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

  function isSignupField(field: string): field is SignupField {
    return SIGNUP_FIELDS.includes(field as SignupField);
  }

  function onSubmit(data: SignupFormValues) {
    signupMutation.mutate(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-10 items-center justify-center rounded-md">
                <UserKey className="size-10" />
              </div>
              <span className="sr-only">{SITE_CONFIG.farsiName}</span>
            </div>
            <h1 className="text-xl font-bold">
              ثبت نام در {SITE_CONFIG.farsiName}
            </h1>
          </div>
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
                  disabled={signupMutation.isPending}
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>ایمیل</FieldLabel>
                <Input
                  dir="ltr"
                  type="email"
                  id={field.name}
                  {...field}
                  disabled={signupMutation.isPending}
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
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>رمز عبور</FieldLabel>
                <Input
                  dir="ltr"
                  type="password"
                  id={field.name}
                  {...field}
                  disabled={signupMutation.isPending}
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
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>تکرار رمز عبور</FieldLabel>
                <Input
                  dir="ltr"
                  type="password"
                  id={field.name}
                  {...field}
                  disabled={signupMutation.isPending}
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
            <Button type="submit" disabled={signupMutation.isPending}>
              {signupMutation.isPending && <Spinner />}
              {signupMutation.isPending ? "در حال ثبت نام" : "ثبت نام"}
            </Button>
          </Field>
          <FieldDescription>
            حساب کاربری دارید؟ <Link href="/login">وارد شوید</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
