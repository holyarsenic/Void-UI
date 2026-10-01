import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RecentGenerations from "@/components/Dashboard/GenerateComponents/RecentGenerations";

export default async function Dashboard() {
  const session = await auth();

  if( !session ){
    return (
      redirect("/auth/login")
    );
  }

  const userId = Number(session?.user?.id);

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      projects: {
        include: {
          generations: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <p className="text-white/50">User not found</p>
      </div>
    );
  }

  const recentGenerations = await db.generation.findMany({
    where: {
      userId: user.id,
    },
    include: {
      project: true,
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return (
    <main className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">

      <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between mb-5 mt-5 md:mt-0">

        <div>
          <h1 className="font-theme text-3xl">A Record of Creation</h1>

          <p className="mt-1 font-theme text-sm text-white/40">
            Everything created, preserved within the Void.
          </p>
        </div>
        <div className="w-70 mt-4 border-2 border-foreground/20 px-5 py-2 flex justify-between items-center">
          <h1>Total Generation</h1>{' '} <span className="px-3 py-1 bg-foreground/40">{recentGenerations.length}</span>
        </div>
      </div>
      <RecentGenerations recentGenerations={recentGenerations} length={recentGenerations.length}/>
    </main>
  );
}