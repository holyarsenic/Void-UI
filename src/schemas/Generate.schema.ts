import { z } from "zod";

export const GenerateSchema = z.object({ 
  projectId: z.coerce.number().int().positive("Invalid project ID"),
  prompt: z.string().min(1, "Prompt cannot be empty").max(10000, "Prompt is too long"), 
});

export type GenerateInput = z.infer<typeof GenerateSchema>;