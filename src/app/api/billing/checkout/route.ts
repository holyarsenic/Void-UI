import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CheckoutSchema } from "@/schemas/CheckOut.schema";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    const { plan } = result.data;

    if (!plan) {
      return NextResponse.json(
        { error: "Plan is required" },
        { status: 400 }
      );
    }

    // Free plan uses Ollama and does not require checkout.
    if (plan === "free") {
      return NextResponse.json({
        success: true,
        provider: "ollama",
        message: "Free plan uses Ollama.",
      });
    }

    // Paid plan uses OpenAI.
    if (plan !== "pro") {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const priceId = process.env.STRIPE_PRO_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price is not configured" },
        { status: 500 }
      );
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL;

    if (!origin) {
      return NextResponse.json(
        { error: "App URL is not configured" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing`,

      metadata: {
        plan: "pro",
        aiProvider: "openai",
      },

      subscription_data: {
        metadata: {
          plan: "pro",
          aiProvider: "openai",
        },
      },
    });

    return NextResponse.json({
      success: true,
      provider: "openai",
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Billing checkout error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create checkout session",
      },
      { status: 500 }
    );
  }
}