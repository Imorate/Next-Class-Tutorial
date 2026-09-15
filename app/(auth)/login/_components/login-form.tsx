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
import { login } from "@/features/auth/auth.api";
import { ApiError } from "@/lib/api/types";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  LoginApiRequest,
  loginApiRequestSchema,
} from "@/lib/validation/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormProps extends React.ComponentProps<"div"> {
  callbackUrl?: string;
}

export function LoginForm({
  className,
  callbackUrl,
  ...props
}: LoginFormProps) {
  const router = useRouter();
  const LOGIN_FIELDS = ["email", "password"] as const;
  type LoginField = (typeof LOGIN_FIELDS)[number];
  const DEFAULT_LOGIN_VALUES: LoginApiRequest = {
    email: "",
    password: "",
  };
  const form = useForm<LoginApiRequest>({
    resolver: zodResolver(loginApiRequestSchema),
    defaultValues: DEFAULT_LOGIN_VALUES,
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const loginMutation = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: login,
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد", {
        duration: 1500,
      });
      setTimeout(() => {
        router.push(callbackUrl ?? "/");
      }, 1500);
    },
    onError: (error) => {
      if (!(error instanceof ApiError)) {
        return;
      }
      toast.error(error.message ?? "خطایی رخ داده است");
      if (error.fieldErrors) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          if (isLoginField(field)) {
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

  function isLoginField(field: string): field is LoginField {
    return LOGIN_FIELDS.includes(field as LoginField);
  }

  function onSubmit(data: LoginApiRequest) {
    loginMutation.mutate(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-10 items-center justify-center rounded-md">
                <LogIn className="size-10" />
              </div>
              <span className="sr-only">{SITE_CONFIG.farsiName}</span>
            </div>
            <h1 className="text-xl font-bold">
              ورود به {SITE_CONFIG.farsiName}
            </h1>
          </div>
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
                  disabled={loginMutation.isPending}
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
                  disabled={loginMutation.isPending}
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
            <Button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending && <Spinner />}
              {loginMutation.isPending ? "در حال ورود" : "ورود"}
            </Button>
          </Field>
          <FieldDescription>
            حساب کاربری ندارید؟ <Link href="/signup">ثبت نام کنید</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
