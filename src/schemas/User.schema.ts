import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.email({message: 'Invalid email address'}).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  name: z.string().min(2).max(50),
  password: z.string().min(6, {message: 'Password must be at least 6 characters long'}).max(50, {message: 'Password must be at most 50 characters long'}),
});

export const SignInSchema = z.object({
  email: z.email({message: 'Invalid email address'}).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z.string().min(6, {message: 'Password must be at least 6 characters long'}).max(50, {message: 'Password must be at most 50 characters long'}),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;