import * as z from "zod";

export const loginApiRequestSchema = z.object({
  email: z
    .email("ایمیل باید مقدار معتبری داشته باشد")
    .max(254, "ایمیل باید حداکثر دارای 254 کاراکتر باشد")
    .transform((value) => value.toLowerCase().trim()),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل دارای 6 کاراکتر باشد")
    .max(100, "رمز عبور باید حداکثر دارای 100 کاراکتر باشد"),
});

export type LoginApiRequest = z.infer<typeof loginApiRequestSchema>;
