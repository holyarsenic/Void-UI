import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import DodoPayments from "dodopayments";
import { getServerSession } from "next-auth";

import {
  Checkout,
  CheckoutSchema,
} from "@/schemas/CheckOut.schema";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";

const dodo = new DodoPayments({
  apiKey: process.env.DODO_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    // Check NextAuth session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Find logged-in user
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

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
       * You can use:
       * process.env.DODO_PRO_PRODUCT_ID
       *
       * The exact SDK method depends on your Dodo SDK version.
       */

      // const checkoutSession = await dodo.checkoutSessions.create({
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

        // checkoutUrl: checkoutSession.checkout_url,
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