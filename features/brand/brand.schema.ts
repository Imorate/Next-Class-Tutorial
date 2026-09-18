import { z } from "zod";

export const brandSchema = z.object({
  name: z.string("نام باید معتبر باشد"),
  logo: z.url("لوگو باید معتبر باشد"),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
