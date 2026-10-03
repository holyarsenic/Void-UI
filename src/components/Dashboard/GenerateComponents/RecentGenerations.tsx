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

 const RecentGenerations = ({
  recentGenerations, length
}: RecentGenerationsProps) => {

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
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4">
          {recentGenerations.slice(0, length).map((generation, index) => (
            <motion.div
              key={generation.projectId}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1]}}>
              <Link
                href={`/dashboard/projects/generate/${generation.projectId}`}
                className="group block overflow-hidden rounded-xl border border-foreground/20 bg-background px-4 py-4 outline-none sm:px-5 h-32 md:h-25">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <motion.span
                        whileHover={{ rotate: -8, scale: 1.08 }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground/80 font-theme text-xs text-background"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </motion.span>

                      <h3 className="max-w-full truncate font-theme text-foreground sm:max-w-70">
                        {generation.project.name}
                      </h3>

                      <span className="hidden lg:flex font-theme text-foreground/60">
                        | {generation.provider}
                      </span>
                    </div>

                    <span className="shrink-0 whitespace-nowrap text-xs text-foreground/80">
                      {formatDistanceToNowStrict(generation.createdAt, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <span className="mt-1 flex font-theme text-foreground/60 lg:hidden">
                    | {generation.provider}
                  </span>

                  <p className="mt-2 w-full line-clamp-2 text-sm font-theme text-foreground/40">
                    {generation.prompt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentGenerations;