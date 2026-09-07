import { z } from "zod";

export const BillingSchema = z.object({
  plan: z.enum(["free", "pro"]),

  dailyRequests: z.number().int().min(0),

  totalRequests: z.number().int().min(0),

  subscriptionStatus: z.enum([
    "none",
    "active",
    "canceled",
    "past_due",
  ]),

  subscriptionId: z.string().nullable(),

  customerId: z.string().nullable(),

  currentPeriodEnd: z.string().nullable(),
});

export type Billing = z.infer<typeof BillingSchema>;