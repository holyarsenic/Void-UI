"use client";

import { useEffect, useState } from "react";
import LivePreview from "@/components/Dashboard/GenerateComponents/LivePreview";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Generation {
  id: number;
  prompt: string;
  result: string;
  provider: "gemini";
  createdAt: string;
}

interface Project {
  id: number;
  name: string;
  description: string | null;
  generations: Generation[];
}

interface ProjectResponse {
  success: boolean;
  data: Project;
}

export default function GeneratedProject({ params }: PageProps) {
  const [value, setValue] = useState<ProjectResponse | null>(null);

  useEffect(() => {
    const handleProject = async () => {
      try {
        const { id } = await params;

        const res = await fetch(`/api/projects/${id}`, {
          method: "GET",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch project");
        }

        setValue(data);
      } catch (error) {
        console.error("Project error:", error);
      } 
    };

    handleProject();
  }, [params]);

  if (!value?.data) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <p>Project not found.</p>
      </div>
    );
  }

  const project = value.data;

  const latestGeneration =
    project.generations.length > 0
      ? project.generations[project.generations.length - 1]
      : null;

  return (
    <div className="h-screen bg-background text-foreground px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-theme">
            {project.name}
          </h1>

          {project.description && (
            <p className="mt-2 text-white/50">
              {project?.description}
            </p>
          )}
        </div>

        {!latestGeneration && (
          <div className="border border-white/20 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold">
              No generations yet
            </h2>

            <p className="mt-2 text-white/50">
              Generate something for this project to see the result here.
            </p>
          </div>
        )}

        {latestGeneration && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="border border-white/20 rounded-xl overflow-hidden">

              <div className="px-5 py-4 border-b border-white/20">
                <h2 className="font-semibold">
                  Live Preview
                </h2>
              </div>

              <div className="p-5">
                <div className="h-130 w-full overflow-y-scroll">
                    <LivePreview code={latestGeneration.result} />
                </div>
              </div>

            </div>

            <div className="border border-white/20 rounded-xl overflow-hidden">

              <div className=" px-5 py-4 border-b border-white/20 flex items-center justify-between">
                <h2 className="font-semibold">
                  Generated Result
                </h2>

                <span className="text-xs px-2 py-1 rounded-md bg-white/20 text-white/60">
                  {latestGeneration.provider}
                </span>
              </div>

              <div className="p-5">
                <pre className="text-sm text-foreground/90 whitespace-pre-wrap wrap-break-word h-130 overflow-y-scroll void-scrollbar">
                  {latestGeneration.result}
                </pre>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}