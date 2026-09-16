import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;