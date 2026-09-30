"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { formatDistanceToNowStrict } from "date-fns";
import BlackHole from "@/assets/Icons/blackhole";

interface Generation {
  projectId: number;
  prompt: string;
  provider: string;
  createdAt: Date;
  project: {name: string};
}

interface RecentGenerationsProps {
  recentGenerations: Generation[];
  length: number;
}

export default function RecentGenerations({
  recentGenerations, length
}: RecentGenerationsProps) {

  return (
    <section>
      {recentGenerations.length === 0 ? (
        <motion.div
          initial={{opacity: 0, scale: 0.98}}
          animate={{opacity: 1,scale: 1}}
          transition={{duration: 0.5, ease: "easeOut"}}
          className="relative flex min-h-90 flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-foreground/20 bg-transparent">
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, 0, -2]}}
            transition={{duration: 7,repeat: Infinity,ease: "easeInOut"}}>
            <BlackHole className="h-72 w-72 text-foreground/40 sm:h-80 sm:w-80"/>
          </motion.div>

          <p className="absolute bottom-8 text-sm font-theme text-foreground/80">
            You haven&apos;t generated anything yet.
          </p>
        </motion.div>
      ) : (
        <div className="grid  grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4">
          {recentGenerations.slice(0, length).map((generation, index) => (
            <motion.div
              key={generation.projectId}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1]}}>
              <Link
                href={`/dashboard/projects/generate/${generation.projectId}`}
                className="group block overflow-hidden rounded-xl border border-foreground/20 bg-background px-4 py-4 outline-none sm:px-5">

                <div className="flex items-center justify-between gap-4">
                  <div className=" flex-1">
                    <div className="flex items-center gap-3">
                      <motion.span
                        whileHover={{rotate: -8, scale: 1.08}}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground/80 font-theme text-xs text-background">
                        {String(index + 1).padStart(2, "0")}
                      </motion.span>

                      <h3 className="truncate max-w-full lg:max-w-50 font-theme text-foreground">
                        {generation.project.name}
                      </h3>

                      <span className="hidden lg:flex font-theme text-foreground/60">
                        | {generation.provider}
                      </span>
                    </div>

                    <span className="flex lg:hidden mt-1 font-theme text-foreground/60">
                      | {generation.provider}
                    </span>

                    <p className="mt-2 line-clamp-3 max-w-2xl text-sm font-theme text-foreground/40">
                      {generation.prompt}
                    </p>
                  </div>

                  <span className="shrink-0 whitespace-nowrap text-xs transition-colors text-foreground/80 group-hover:text-foreground">
                    {formatDistanceToNowStrict(generation.createdAt, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}