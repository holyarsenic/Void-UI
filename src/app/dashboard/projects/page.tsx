"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import BlackHole from "@/assets/Icons/blackhole";
import { formatDistanceToNowStrict } from "date-fns";
import { BookPlus, Bookmark } from 'lucide-react';
import { motion } from "motion/react";

type ProjectType = { 
  id: number; 
  name: string; 
  description: string | null; 
  createdAt: string; 
};

export default function Project(){

  const [ projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    const FetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", {
          method: "GET"
        })

        if (!res.ok) { 
          throw new Error("Failed to fetch projects"); 
        }
        const data = await res.json(); 
        setProjects(data.data);
      } catch(error){
        console.error("Error fetching projects:", error);
      }
    }

    FetchProjects();
  },[])

  return (
      <div className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h1 className="font-theme text-3xl">All Projects</h1>

              <p className="mt-1 font-theme text-sm text-white/40">
                Manage and explore all your projects
              </p>
            </div>

          </div>


          {projects?.length === 0 ? (
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
                You haven&apos;t made any projects yet.
              </p>
            </motion.div>
          ) : (
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1]}}>
                  <Link
                    href={`/dashboard/projects/generate/${project.id}`}
                    className="group block overflow-hidden rounded-xl border border-foreground/20 bg-background px-4 py-4 outline-none sm:px-5 h-30">

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <motion.span
                            whileHover={{ rotate: -8, scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="shrink-0"
                          >
                            <BookPlus className="h-5 w-5 text-foreground/80" />
                          </motion.span>

                          <h3 className="truncate font-theme text-sm font-medium text-foreground">
                            {project.name}
                          </h3>
                        </div>

                        <p className="mt-2 truncate text-sm font-theme text-foreground/40">
                          {project.description?.trim() || "Add Description"}
                        </p>

                        <p className="mt-3 text-xs font-theme text-foreground/30">
                          {formatDistanceToNowStrict(project.createdAt, {
                            addSuffix: true,
                          })}
                        </p>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="shrink-0 cursor-pointer"
                      >
                        <Bookmark className="h-5 w-5 text-foreground/40 transition-colors hover:text-foreground" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
      </div>
    );
};