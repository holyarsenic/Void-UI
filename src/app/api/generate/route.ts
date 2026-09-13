import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { db } from "@/lib/prisma"
import {GenerateSchema, GenerateInput } from "@/schemas/Generate.schema";
import { VOID_UI_SYSTEM_PROMPT } from "@/prompt/systemPrompt"
import { getCurrentUserId } from "@/lib/auth";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const FREE_LIMIT = 20;
const PRO_LIMIT = 300;

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    // 1. Parse request body
    const body: unknown = await req.json();

    // 2. Validate request
    const result = GenerateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request"
        },
        { status: 400 }
      );
    }

    const input: GenerateInput = result.data;

    const project = await db.project.findFirst({
      where: {
        id: input.projectId,
        userId: userId,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    const { prompt } = input;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if( !user ) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const now = new Date();
    const TwentyFourHoursAgo = 24 * 60 * 60 * 1000;
    const lastRequestDate = user.lastRequestDate;

    const isNewDay = !lastRequestDate || (now.getTime() - lastRequestDate.getTime()) > TwentyFourHoursAgo;

    if (isNewDay) {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          dailyRequests: 0,
          lastRequestDate: now,
        },
      });

      user.dailyRequests = 0;
    }

    if( user.plan === "free" && user.dailyRequests >= FREE_LIMIT ) {
      return NextResponse.json(
        {
          success: false,
          error: "Free plan limit reached, Try again tomorrow. Please upgrade to Pro.",
        },
        { status: 403 }
      );
    }

    if( user.plan === "pro" && user.dailyRequests >= PRO_LIMIT ) {
      return NextResponse.json(
        {
          success: false,
          error: "Plan limit reached, Try again tomorrow. Please contact support for more information.",
        },
        { status: 403 }
      );
    }

    // Generate with Gemini
    const response = await gemini.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: VOID_UI_SYSTEM_PROMPT,
        maxOutputTokens: 1000,
      },
    });

    const responseText = response.text;

    if (!responseText) {
      return NextResponse.json(
        {
          success: false,
          error: "Gemini did not return any content",
        },
        { status: 500 }
      );
    }

    await db.generation.create({
      data: {
        userId,
        projectId: input.projectId,
        prompt: input.prompt,
        result: responseText,
        provider: "gemini",
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        dailyRequests: {
          increment: 1,
        },
        totalRequests: {
          increment: 1,
        },
        lastRequestDate: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: responseText,
      },
      { status: 200 }
    );
   
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
