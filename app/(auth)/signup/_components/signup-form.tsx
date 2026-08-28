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
import { UserKey } from "lucide-react";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-10 items-center justify-center rounded-md">
                <UserKey className="size-10" />
              </div>
              <span className="sr-only">{SITE_CONFIG.farsiName}</span>
            </a>
            <h1 className="text-xl font-bold">
              ثبت نام در {SITE_CONFIG.farsiName}
            </h1>
          </div>
          <Field>
            <FieldLabel htmlFor="email">ایمیل</FieldLabel>
            <Input id="email" type="email" autoComplete="off" required />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">رمز عبور</FieldLabel>
            </div>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="confirm-password">تکرار رمز عبور</FieldLabel>
            </div>
            <Input id="confirm-password" type="password" required />
          </Field>
          <Field>
            <Button type="submit">ثبت نام</Button>
          </Field>
          <FieldDescription>
            حساب کاربری دارید؟ <Link href="/login">وارد شوید</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
