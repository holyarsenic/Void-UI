import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";

import { db } from "@/lib/prisma";

const webhookSecret = process.env.DODO_WEBHOOK_KEY!;

export async function POST(req: NextRequest) {
  try {
    // Get webhook headers
    const webhookId = req.headers.get("webhook-id");
    const webhookSignature = req.headers.get("webhook-signature");
    const webhookTimestamp = req.headers.get("webhook-timestamp");

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      return NextResponse.json(
        { error: "Missing webhook headers" },
        { status: 400 }
      );
    }

    // Get raw body
    const body = await req.text();

    // Verify webhook
    const webhook = new Webhook(webhookSecret);

    await webhook.verify(body, {
      "webhook-id": webhookId,
      "webhook-signature": webhookSignature,
      "webhook-timestamp": webhookTimestamp,
    });

    const payload = JSON.parse(body);
    const data = payload.data;

    // SUBSCRIPTION CREATED

    if (payload.type === "subscription.created") {
      const customerId = data.customer_id;
      const subscriptionId = data.subscription_id;

      const email = data.customer?.email || data.email;

      if (!email) {
        return NextResponse.json(
          { error: "Customer email not found" },
          { status: 400 }
        );
      }

      const user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          plan: "pro",

          CustomerId: customerId
            ? String(customerId)
            : null,

          SubscriptionId: subscriptionId
            ? String(subscriptionId)
            : null,

          subscriptionStatus: "active",

          currentPeriodEnd: data.current_period_end
            ? new Date(data.current_period_end)
            : null,
        },
      });

      console.log(`User ${user.id} upgraded to PRO`);
      console.log(`Subscription ID: ${subscriptionId}`);
      console.log(
        `Current period ends: ${data.current_period_end}`
      );
    }

    // SUBSCRIPTION UPDATED

    if (payload.type === "subscription.updated") {
      const subscriptionId = data.subscription_id;

      const user = await db.user.findFirst({
        where: {
          SubscriptionId: String(subscriptionId),
        },
      });

      if (user) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            subscriptionStatus: data.status
              ? String(data.status)
              : user.subscriptionStatus,

            currentPeriodEnd: data.current_period_end
              ? new Date(data.current_period_end)
              : user.currentPeriodEnd,
          },
        });

        console.log(
          `Subscription updated for user ${user.id}`
        );
      }
    }

    return NextResponse.json(
      {
        received: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      {
        error: "Webhook processing failed",
      },
      {
        status: 500,
      }
    );
  }
}