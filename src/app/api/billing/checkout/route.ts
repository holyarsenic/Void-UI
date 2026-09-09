import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import DodoPayments from "dodopayments";

import {
  Checkout,
  CheckoutSchema,
} from "@/schemas/CheckOut.schema";

const dodo = new DodoPayments({
  apiKey: process.env.DODO_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Runtime validation with Zod
    const result = CheckoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid checkout request",
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
      /*
       * Create a Dodo checkout session here.
       *
       * You will use your Dodo Pro product ID:
       * process.env.DODO_PRO_PRODUCT_ID
       *
       * The exact SDK method depends on the Dodo SDK version.
       */

      // const session = await dodo.checkoutSessions.create({
      //   product_cart: [
      //     {
      //       product_id: process.env.DODO_PRO_PRODUCT_ID!,
      //       quantity: 1,
      //     },
      //   ],
      //   return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/success`,
      // });

      return NextResponse.json({
        success: true,
        plan: "pro",
        aiProvider: "openai",

        // url: session.checkout_url,
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
    console.error("Dodo checkout error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create Dodo checkout",
      },
      { status: 500 }
    );
  }
}