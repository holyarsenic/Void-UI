import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import Razorpay from "razorpay";

import {Checkout, CheckoutSchema} from "@/schemas/CheckOut.schema";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();

    // Runtime validation with Zod
    const result = CheckoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid checkout request"
        },
        { status: 400 }
      );
    }

    // TypeScript type safety
    const checkout: Checkout = result.data;

    const { plan } = checkout;

    // FREE PLAN
    if (plan === "free") {
      return NextResponse.json({
        success: true,
        plan: "free",
        aiProvider: "ollama",
      });
    }

    // PRO PLAN
    if (plan === "pro") {
      const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PRO_PLAN_ID!,
        total_count: 12,
        quantity: 1,
        customer_notify: 1,
      });

      return NextResponse.json({
        success: true,
        plan: "pro",
        aiProvider: "openai",
        subscriptionId: subscription.id,
        keyId: process.env.RAZORPAY_KEY_ID,
        amount: subscription.amount,
        currency: subscription.currency,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unsupported plan",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Razorpay checkout error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create Razorpay subscription",
      },
      { status: 500 }
    );
  }
}