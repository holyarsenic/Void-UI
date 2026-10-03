import type { Metadata } from "next";
import { auth } from "@/lib/auth"
import { db } from "@/lib/prisma";
type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const session = await auth();

  if (!session) {
    return {
      title: "Project - Void UI",
      description: "View and manage your project in Void UI.",
    };
  }

  const userId = Number(session?.user?.id);

  const user = await db.user.findUnique({
    where: {
      id: userId
    },
    include: {
      projects: {
        where: {
          id: Number(id)
        }
      }
    }
  })

  return {
    title: `${user?.projects.at(0)?.name || id} - ${user?.projects.at(0)?.description || "Build"}`,
    description: `View and manage project "${user?.projects.at(0)?.name}" in Void UI.`,
  };
}

export default function ProjectLayout({ children }: Props) {
  return <>{children}</>;
}