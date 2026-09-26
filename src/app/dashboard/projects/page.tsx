"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import BlackHole from "@/assets/Icons/blackhole";
import { Button } from "@/components/ui/button";
import { formatDistanceToNowStrict } from "date-fns";

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
          method: "Get"
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

            <Button
              variant={"default"}
              size={"lg"}
              className='flex items-center justify-center font-theme'
              >
              + Create Project
            </Button>

          </div>


          {projects?.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/20 p-5 flex flex-col items-center justify-center">

              <p className="text-white/40 font-theme">
                You haven&apos;t generated anything yet.
              </p>

              <BlackHole className="h-80 w-80 text-foreground/50 -rotate-25 -mt-15" />

            </div>

          ) : (

            <div className="space-y-3">

              {projects?.map((Project, inx) => (

                <Link
                  href={`/dashboard/projects/generate/${Project.id}`}
                  key={inx}
                  className="block rounded-xl border border-white/20 px-5 py-3 transition"
                >

                  <div className="flex items-center justify-between gap-5">

                    <div className="min-w-0">

                      <div className="flex items-center gap-3">

                        <h3 className="font-medium">
                          {Project.name}
                        </h3>

                        <span className="text-[10px] uppercase tracking-wider text-white/30 border border-white/10 px-2 py-1 rounded-full">
                          {Project.description}
                        </span>

                      </div>

                    </div>

                    <span className="text-xs text-white/30 whitespace-nowrap">
                      {formatDistanceToNowStrict(Project.createdAt, { addSuffix: true })}
                    </span>

                  </div>

                </Link>

              ))}

            </div>

          )}
      </div>
    );
};