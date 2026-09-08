import { z } from "zod";

export const GenerateSchema = z.object({ 
  userId: z.number().min(1).max(100),
  projectId: z.string().min(1).max(100),
  prompt: z.string().min(1).max(10000), 
});

export type GenerateInput = z.infer<typeof GenerateSchema>;