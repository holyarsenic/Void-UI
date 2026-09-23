"use client";

import { useState, useEffect } from "react";
interface PageProps{
  params: Promise<{id: string}>
}
interface Generation {
  id: string;
  prompt: string;
  result: string;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  generations: Generation[];
}

interface ProjectResponse {
  success: boolean;
  data: Project;
}


export default function GeneratedProject({ params }: PageProps){
  
  const [value, setValue] = useState<ProjectResponse | null>(null);

  useEffect(() => {
    const handleProject = async () => {
      const { id } = await params;

      try {
        const res = await fetch(`/api/projects/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();

        if(!res.ok){
          throw new Error(
            data.error || "Generation failed"
          );
        }

        setValue(data)

      } catch (error) {

        console.error("Project error:", error);

      }
    }

    handleProject();
  }, [params]);


 return (
    <div className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <h1 className="font-theme text-3xl">{value?.data?.name}</h1>
    </div>
  );
};