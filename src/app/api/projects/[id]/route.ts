import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

import { UpdateProjectSchema } from "@/schemas/Project.schema";
interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
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

    const project = await db.project.findFirst({
      where: {
        id: projectId,
        userId,
      }
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

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 200 }
    );
  }catch(error){
    console.error("Get project error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch project",
      },
      { status: 500 }
    );
  }}

  export async function PATCH(req: NextRequest, { params }: { params: Params }) {
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

      const body: unknown = await req.json();

      const result = UpdateProjectSchema.safeParse(body);

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid project data",
          },
          { status: 400 }
        );
      }

      const updatedProject = await db.project.update({
        where: {
          id: projectId,
        },
        data: result.data,
      });

      return NextResponse.json(
        {
          success: true,
          data: updatedProject,
        },
        { status: 200 }
      );
    }catch(error){
      console.error("Update project error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to update project",
        },
        { status: 500 }
      );
    }}

    export async function DELETE(req: NextRequest, { params }: { params: Params }) {
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

        const { id } = await params;
        const projectId = Number(id);

        if( isNaN(projectId) ) {
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

        await db.project.delete({
          where: {
            id: projectId,
          }
        });

        return NextResponse.json(
          {
            success: true,
            message: "Project deleted successfully",
          },
          { status: 200 }
        );
      }catch(error){
        console.error("Delete project error:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to delete project",
          },
          { status: 500 }
        );
      }
    }