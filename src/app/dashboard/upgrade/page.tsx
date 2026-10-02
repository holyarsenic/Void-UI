import UpgradeComp from "@/components/Dashboard/UpgradeComponents/UpgradeComp";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Upgrade () {
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
  });

  return (
    <main className="h-screen bg-background text-foreground px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <div className="mt-5 md:mt-0">
        <h1 className="font-theme text-3xl">
          Choose your plan
        </h1>

        <p className="mt-1 font-theme text-sm text-white/40">
          Start building for free or unlock the full Pro experience.
        </p>
      </div>
      <UpgradeComp Plan={user?.plan || "free"} />
    </main>
  )
}