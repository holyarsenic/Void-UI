import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/prisma";

import { CreateProjectSchema } from "@/schemas/Project.schema";
import { auth } from "@/lib/auth";

export async function GET() {
  try {

    const session = await auth();

    const userId = Number(session?.user?.id)

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const projects = await db.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: projects,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Get projects error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {

  try {
    const session = await auth();

    const userId = Number(session?.user?.id)

     if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
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

    if(user.plan === "free" && user.dailyRequests >= 10){
      return NextResponse.json(
        {
          success: false,
          error: "Free plan limit reached. Please try again tomorrow or upgrade to Pro.",
        },
        { status: 429 }
      );
    }

    if(user.plan === "pro" && user.dailyRequests >= 300){
      return NextResponse.json(
        {
          success: false,
          error: "Plan limit reached. Please try again tomorrow.",
        },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();

    const result = CreateProjectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
        },
        { status: 400 }
      );
    }

    const { name, description } = result.data;

    const project = await db.project.create({
      data: {
        userId,
        name,
        description,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
        { status: 201 }
    );

  } catch (error) {
    console.error("Create project error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create project",
      },
      { status: 500 }
    );
  }
}