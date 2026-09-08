import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

import {GenerateSchema, GenerateInput } from "@/schemas/Generate.schema";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const FREE_LIMIT = 20;
const PRO_LIMIT = 300;

export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body
    const body: unknown = await req.json();

    // 2. Validate request
    const result = GenerateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const input: GenerateInput = result.data;
    const { prompt } = input;

    // 3. TODO: Get this from your authentication system
    const userId = "USER_ID_FROM_AUTH";

    // 4. TODO: Get this from PostgreSQL
    const billing = {
      plan: "free" as "free" | "pro",
      subscriptionStatus: "none" as
        | "none"
        | "active"
        | "canceled"
        | "past_due",
      dailyRequests: 0,
      totalRequests: 0,
      lastRequestDate: new Date().toISOString().split("T")[0],
    };

    // 5. Check whether user is actually Pro
    const isPro =
      billing.plan === "pro" &&
      billing.subscriptionStatus === "active";

    // 6. Select request limit
    const limit = isPro ? PRO_LIMIT : FREE_LIMIT;

    // 7. Check daily limit
    if (billing.dailyRequests >= limit) {
      return NextResponse.json(
        {
          success: false,
          error: "Daily request limit reached",
          limit,
          dailyRequests: billing.dailyRequests,
        },
        { status: 429 }
      );
    }

    // 8. Generate with Gemini
    const response = await gemini.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        maxOutputTokens: 1000,
      },
    });

    const responseText = response.text;

    // 9. Make sure Gemini returned something
    if (!responseText) {
      return NextResponse.json(
        {
          success: false,
          error: "Gemini returned an empty response",
        },
        { status: 500 }
      );
    }

    // 10. TODO: Increment these values in PostgreSQL
    const newDailyRequests = billing.dailyRequests + 1;
    const newTotalRequests = billing.totalRequests + 1;

    console.log("Request counted:", {
      userId,
      plan: isPro ? "pro" : "free",
      provider: "gemini",
      dailyRequests: newDailyRequests,
      totalRequests: newTotalRequests,
    });

    // 11. Return response
    return NextResponse.json({
      success: true,
      provider: "gemini",
      response: responseText,
      usage: {
        dailyRequests: newDailyRequests,
        dailyLimit: limit,
        totalRequests: newTotalRequests,
      },
    });
  } catch (error) {
    console.error("Generate API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate response",
      },
      { status: 500 }
    );
  }
}
