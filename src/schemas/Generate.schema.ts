import { z } from "zod";

export const GenerateSchema = z.object({ 
  prompt: z.string().min(1).max(10000), 
  plan: z.enum(["free", "pro"]), 
});

export type GenerateInput = z.infer<typeof GenerateSchema>;