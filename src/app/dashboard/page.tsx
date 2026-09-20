import Link from "next/link";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button"
import BlackHole from "@/assets/Icons/blackhole";
import { redirect } from "next/navigation";

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
          <p className="text-sm text-white/40 font-theme mt-1">Pull your ideas beyond the event horizon.</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">

        <div className="rounded-sm border-2 border-white/50 p-6">

          <p className="text-sm text-white/40 font-theme">
            Today&apos;s Requests
          </p>

          <div className="flex items-end gap-2 mt-3">

            <h2 className="text-3xl font-theme">
              {user.dailyRequests}
            </h2>

            <span className="text-sm text-white/30 mb-1 font-theme">
              requests
            </span>

          </div>

        </div>

        <div className="rounded-sm border-2 border-white/50 p-6">

          <p className="text-sm text-white/40 font-theme">
            Total Generations
          </p>

          <div className="flex items-end gap-2 mt-3">

            <h2 className="text-3xl font-theme">
              {user.totalRequests}
            </h2>

            <span className="text-sm text-white/30 mb-1 font-theme">
              generations
            </span>

          </div>

        </div>

        <div className="rounded-2xl border-2 border-white/50 p-6">

          <p className="text-sm text-white/40 font-theme">
            Current Plan
          </p>

          <div className="flex items-center gap-3 mt-3">

            <h2 className="text-3xl font-theme">
              {user.plan}
            </h2>

            {user.plan === "free" && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-600 text-foreground/80 font-theme">
                10 req/Per Day
              </span>
            )}
            {user.plan === "pro" && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-600 text-foreground/80 font-theme">
                310/Per Day
              </span>
            )}

          </div>

        </div>

      </div>


      <section>

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-xl font-theme">
              Recent Generations
            </h2>

            <p className="text-sm font-theme text-white/40 mt-1">
              Your latest generated components
            </p>
          </div>

          <Link
            href="/dashboard/projects"
            className="text-sm font-theme mr-5 text-white/50 hover:text-white transition"
          >
            View all
          </Link>

        </div>


        {recentGenerations.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-white/10 p-5 flex flex-col items-center justify-center">

            <p className="text-white/40 font-theme">
              You haven&apos;t generated anything yet.
            </p>

            <BlackHole className="h-80 w-80 text-foreground/50 -rotate-25 -mt-15" />

          </div>

        ) : (

          <div className="space-y-3">

            {recentGenerations.map((generation) => (

              <Link
                href={`/generate/${generation.id}`}
                key={generation.id}
                className="block rounded-2xl border border-white/10 p-5 transition"
              >

                <div className="flex items-center justify-between gap-5">

                  <div className="min-w-0">

                    <div className="flex items-center gap-3">

                      <h3 className="font-medium">
                        {generation.project.name}
                      </h3>

                      <span className="text-[10px] uppercase tracking-wider text-white/30 border border-white/10 px-2 py-1 rounded-full">
                        {generation.provider}
                      </span>

                    </div>

                    <p className="text-sm text-white/40 mt-2 truncate max-w-2xl">
                      {generation.prompt}
                    </p>

                  </div>

                  <span className="text-xs text-white/30 whitespace-nowrap">
                    {generation.createdAt.toLocaleDateString()}
                  </span>

                </div>

              </Link>

            ))}

          </div>

        )}

      </section>
    </main>
  );
}