import { z } from "zod";

export const mediaSchema = z.object({
  url: z.url("آدرس باید معتبر باشد"),
});

export type MediaFormValues = z.infer<typeof mediaSchema>;
