import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
interface Params {
  params: Promise<{id: string}>
}

export async function PATCH(req: NextRequest, { params }: Params ) {
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

    const { id } = await params;
    const projectId = Number(id);

      if (isNaN(projectId)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid projectId",
          },
          { status: 400 }
        );
      }

      const existingProject = await db.project.findFirst({
        where: {
          id: projectId,
          userId,
        }
      });

      if (!existingProject) {
        return NextResponse.json(
          {
            success: false,
            error: "Project not found",
          },
          { status: 404 }
        );
      }

      const updatedProject = await db.project.update({
        where: {
          id: projectId,
        },
        data: {
          isPinned: !existingProject.isPinned
        },
      });

      return NextResponse.json(
        {
          success: true,
          data: updatedProject,
        },
        { status: 200 }
    );
  }catch(error){
    console.error("Pin Project error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to Pin project",
      },
      { status: 500 }
    );
  }}

