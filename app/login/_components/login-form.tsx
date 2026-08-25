"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form>
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
            <Field>
              <FieldLabel htmlFor="email">ایمیل</FieldLabel>
              <Input id="email" type="email" required />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">رمز عبور</FieldLabel>
              </div>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <Button type="submit">ورود</Button>
            </Field>
            <FieldDescription>
              حساب کاربری ندارید؟ <Link href="/signup">ثبت نام کنید</Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </div>
    </>
  );
}
