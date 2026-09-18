import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "نام ضروری است"),
  en_name: z.string().min(1, "نام انگلیسی ضروری است"),
  image: z.url("عکس باید معتبر باشد"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
