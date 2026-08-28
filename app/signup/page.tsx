import { SignupForm } from "@/app/signup/_components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت نام",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
