import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import DodoPayments from "dodopayments";

import {
  Checkout,
  CheckoutSchema,
} from "@/schemas/CheckOut.schema";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

const dodo = new DodoPayments({bearerToken: process.env.DODO_API_KEY, environment: "live_mode"})

export async function POST(req: NextRequest) {
  try {
    // Check NextAuth session
    const session = await auth();

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
      });
    }

    if (plan === "pro") {
      const productId = process.env.DODO_PRO_PRODUCT_ID;

      if(!productId) {
        return NextResponse.json(
          {
            success: false,
            error: "Pro product is not configured"
          },
          { status: 500}
        )
      }

      const checkoutSession = await dodo.checkoutSessions.create({
        product_cart: [
          {
            product_id: productId,
            quantity: 1,
          },
        ],
        customer: {email: user.email},
        return_url: `${process.env.NEXTAUTH_URL}/dashboard`
      });

      return NextResponse.json({
        success: true,
        plan: "pro",
        checkoutUrl: checkoutSession.checkout_url,
        sessionId: checkoutSession.session_id,
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