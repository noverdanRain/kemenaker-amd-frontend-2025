import { z } from "zod";

export const productFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters long"),
    category: z.string().min(1, "Select a category"),
    brand: z.string().min(1, "Input brand name"),
    sku: z.string().min(1, "Input SKU"),
    price: z
        .string()
        .min(1, "Price is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
    discountPercentage: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Discount must be a valid number")
        .regex(
            /^(100(\.0{1,2})?|[0-9]{1,2}(\.\d{1,2})?)$/,
            "Discount must be between 0 and 100"
        )
        .optional(),
    stock: z
        .string()
        .min(1, "Stock is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Stock must be a valid number"),
    weight: z
        .string()
        .min(1, "Weight is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Weight must be a valid number"),
    dimensions: z
        .object({
            width: z
                .string()
                .min(1, "Width is required")
                .regex(/^\d+(\.\d{1,2})?$/, "Width must be a valid number"),
            height: z
                .string()
                .min(1, "Height is required")
                .regex(/^\d+(\.\d{1,2})?$/, "Height must be a valid number"),
            depth: z
                .string()
                .min(1, "Depth is required")
                .regex(/^\d+(\.\d{1,2})?$/, "Depth must be a valid number"),
        })
        .optional(),
    thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
    tags: z.array(z.string()).optional(),
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;