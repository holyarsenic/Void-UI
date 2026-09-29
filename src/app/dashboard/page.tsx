import Link from "next/link";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import Image from "next/image";
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
    },
    take: 5,
  });

  return (
    <main className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>
          <h1 className="text-2xl md:text-3xl font-theme">
            {user.name?.split(' ')[0] || "Creator"}&apos;s Workspace
          </h1>
          <p className="text-sm text-white/40 font-theme mt-1">Every great build starts in the dark.</p>
        </div>

        <Link href="/dashboard/generate">
          <Button
            variant={"default"}
            size={"lg"}
            className='flex items-center justify-center font-theme'
            >
            + Generate Component
          </Button>
        </Link>
      </div>

      <div className="w-full flex mb-12 border border-foreground/20"> 
        <div className="w-1/2 bg-background h-40">
          <div className="mt-10 ml-4 flex gap-4">
            <div className="px-4">
              <p className="font-theme text-xs text-foreground/40">
                Today Requests
              </p>
              <p className="mt-2 font-theme text-2xl text-foreground">
                {user.dailyRequests}
              </p>
            </div>

            <div className="px-4">
              <p className="font-theme text-xs text-foreground/40">
                Total Requests
              </p>
              <p className="mt-2 font-theme text-2xl text-foreground">
                {user.totalRequests}
              </p>
            </div>

            <div className="px-4">
              <p className="font-theme text-xs text-foreground/40">
                Plan
              </p>
              <p className="mt-2 font-theme text-2xl capitalize text-foreground">
                {user.plan}
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-1/2 h-40 overflow-hidden">
          <Image src="/Void.jpg" alt="void" fill className="object-cover" priority/>
        </div>
      </div>
      <RecentGenerations recentGenerations={recentGenerations}/>
    </main>
  );
}