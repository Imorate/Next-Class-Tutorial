import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, "نام ضروری است"),
  logo: z.url("لوگو باید معتبر باشد"),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
