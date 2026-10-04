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
    const FREE_LIMIT = 10;
    const PRO_LIMIT = 150;
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

    const now = new Date();
    const TwentyFourHoursAgo = 24 * 60 * 60 * 1000;

    const lastRequestDate = user.lastRequestDate;

    const isNewDay =
      !lastRequestDate ||
      now.getTime() - lastRequestDate.getTime() > TwentyFourHoursAgo;

    const remainingHours = lastRequestDate ? Math.ceil(
    (TwentyFourHoursAgo - (now.getTime() - lastRequestDate.getTime())) / (60 * 60 * 1000) ) : 0;

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

    if (user.plan === "free" && user.dailyRequests >= FREE_LIMIT) {
      return NextResponse.json(
        {
          success: false,
          error:
            `Free plan limit reached. Try again in ${remainingHours} hours. Please upgrade to Pro.`,
        },
        { status: 403 }
      );
    }

    if (user.plan === "pro" && user.dailyRequests >= PRO_LIMIT) {
      return NextResponse.json(
        {
          success: false,
          error:
            `Plan limit reached. Try again in ${remainingHours} hours. Please contact support for more information.`,
        },
        { status: 403 }
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