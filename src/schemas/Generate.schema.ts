import { z } from "zod";

export const GenerateSchema = z.object({
  prompt: z.string().min(1),

  style: z.enum([
      "modern",
      "minimal",
      "glass",
      "dark",
      "gradient",
      "luxury",
      "playful",
    ])
    .optional(),

  animation: z.enum([
      "none",
      "subtle",
      "smooth",
      "expressive",
    ])
    .optional(),
});

export type GenerateInput = z.infer<typeof GenerateSchema>;