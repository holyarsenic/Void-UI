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
    }
  });

  const dailyLimit = user.plan === "pro" ? 300 : 10;
  const remainingRequests = Math.max(
    dailyLimit - user.dailyRequests,
    0
  );

  const usagePercentage = Math.min(
    (user.dailyRequests / dailyLimit) * 100,
    100
  );

  return (
    <main className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 mt-5 md:mt-0">

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

      <div className="w-full flex mb-12 border border-foreground/20 p-1"> 
        <div className="w-full md:w-[50%] h-40 border border-white/10 bg-white/2 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-theme text-xs text-white/40">
                Today&apos;s usage
              </p>

              <p className="mt-3 font-theme text-4xl text-white">
                {user.dailyRequests}
                <span className="text-lg text-white/30">
                  {" / "}{dailyLimit}
                </span>
              </p>
            </div>

            <span className="border border-white/10 px-3 py-1 font-mono text-xs uppercase text-white/50">
              {user.plan === "free" ? "Base" : "Pro"}
            </span>
          </div>

          <div className="mt-6 h-1 w-full bg-white/10">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${usagePercentage}%` }}
            />
          </div>

          <p className="mt-3 font-theme text-xs text-white/30">
            {remainingRequests} generations remaining today
          </p>

        </div>
        <div className="hidden md:block relative w-[50%] h-40 overflow-hidden">
          <Image src="/Void.jpg" alt="void" fill className="object-cover scale-100 hover:opacity-85 transition-opacity duration-700 opacity-70" priority/>
          <div className="absolute top-4 left-4"> 
            <h3 className="font-theme text-2xl tracking-tight text-white"> Create in the dark.</h3> 
            <p className="mt-1 text-xs text-white/40"> Every great build starts somewhere.</p>
          </div>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-theme text-foreground">
            Recent Generations
          </h2>

          <p className="mt-1 text-sm font-theme text-foreground/40">
            Your latest generated components
          </p>
        </div>

        <Link
          href="/dashboard/projects"
          className="mr-5 text-sm font-theme text-foreground/80 transition-colors hover:text-foreground">
          View all
        </Link>
      </div>
      <RecentGenerations recentGenerations={recentGenerations} length={10}/>
    </main>
  );
}