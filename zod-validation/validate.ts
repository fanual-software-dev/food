// lib/validations/foodSchema.ts
import { z } from 'zod';

export const foodSchema = z.object({
  foodName: z.string().min(1, "Food name is required"),
  foodRating: z.number().min(0.1,"Rating must be given").max(5,"Rating must be lessthan 5"),
  foodPrice: z.number().min(0.1, "Price must be non-negative"),
  foodImage: z.string().url("Invalid image URL"),
  restaurantName: z.string().min(1, "Restaurant name is required"),
  restaurantLogo: z.string().url("Invalid logo URL"),
  restaurantStatus: z.string().min(1,"Restaurant status is required"),
});

// Optional: Infer TS type
export type FoodFormData = z.infer<typeof foodSchema>;
