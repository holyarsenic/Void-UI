import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Project name is required",
  }).max(100, {
    message: "Project name must be at most 100 characters",
  }),

  description: z.string().max(200, {
    message: "Description must be at most 200 characters",
  }).optional(),
});

export const UpdateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(200).optional(),
  isPinned: z.boolean().default(false).optional()
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;