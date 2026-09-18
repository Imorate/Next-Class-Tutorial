import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "نام محصول الزامی است"),
  price: z.coerce.number().min(0, "قیمت نمی‌تواند کمتر از صفر باشد"),
  sale: z.coerce
    .number()
    .min(0, "تخفیف نمی‌تواند کمتر از صفر باشد")
    .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد")
    .default(0),
  media: z.array(z.string()).min(1, "حداقل یک رسانه باید انتخاب شود"),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  brand: z.string().min(1, "برند الزامی است"),
});

export type ProductFormInput = z.input<typeof productSchema>;

export type ProductFormValues = z.output<typeof productSchema>;
