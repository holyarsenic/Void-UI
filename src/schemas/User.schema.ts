import { z } from "zod";

export const userSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(30),
  name: z.string().min(2).max(50),
  password: z.string().min(8),
});