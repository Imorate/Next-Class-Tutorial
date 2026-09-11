import * as z from "zod";

export const signupApiRequestSchema = z.object({
  name: z
    .string()
    .min(3, "نام باید حداقل 3 کاراکتر باشد")
    .max(50, "نام باید حداکثر 50 کاراکتر باشد"),
  email: z
    .email("ایمیل باید مقدار معتبری داشته باشد")
    .max(254, "ایمیل باید حداکثر دارای 254 کاراکتر باشد")
    .transform((value) => value.toLowerCase().trim()),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل دارای 6 کاراکتر باشد")
    .max(100, "رمز عبور باید حداکثر دارای 100 کاراکتر باشد"),
});

export const signupFormSchema = signupApiRequestSchema
  .extend({
    confirmPassword: z.string().min(1, "وارد کردن تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "رمز عبور یکسان نمی باشد",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupFormSchema>;
export type SignupApiRequest = z.infer<typeof signupApiRequestSchema>;
