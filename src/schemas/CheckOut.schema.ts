import { z } from "zod";

export const CheckoutSchema = z.object({
  plan: z.enum(["free", "pro"]),
});

export type Checkout = z.infer<typeof CheckoutSchema>;