import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

import { db } from "@/lib/prisma";

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY,
  environment: "test_mode",
});

export async function POST(req: Request) {
  try {
    // Get raw request body
    const body = await req.text();

    // Dodo webhook headers
    const headers = {
      "webhook-id": req.headers.get("webhook-id") ?? "",
      "webhook-signature":
        req.headers.get("webhook-signature") ?? "",
      "webhook-timestamp":
        req.headers.get("webhook-timestamp") ?? "",
    };

    // Verify and parse webhook
    const event = dodo.webhooks.unwrap(body, {
      headers,
      key: process.env.DODO_WEBHOOK_KEY!,
    });

    console.log("Dodo webhook received:", event.type);

    // Payment successful
    if (event.type === "payment.succeeded") {
      const payment = event.data;

      const email = payment.customer?.email;

      if (!email) {
        return NextResponse.json(
          {
            success: false,
            error: "Customer email missing",
          },
          { status: 400 }
        );
      }

      // Find your user
      const user = await db.user.findUnique({
        where: {
          email,
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

      // Upgrade user
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: "pro",
          CustomerId:
            payment.customer?.customer_id ?? null,
          SubscriptionId:
            payment.subscription_id ?? null,
          subscriptionStatus: "active",
        },
      });

      console.log(
        `User ${user.id} upgraded to Pro`
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Dodo webhook error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Webhook verification failed",
      },
      { status: 400 }
    );
  }
}
