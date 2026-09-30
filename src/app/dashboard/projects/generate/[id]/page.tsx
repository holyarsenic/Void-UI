"use client";

import { useEffect, useState } from "react";
import { Copy, Maximize, ChevronLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/assets/Logo/Logo";
import { motion, AnimatePresence } from "motion/react" 
import LivePreview from "@/components/Dashboard/GenerateComponents/LivePreview";
import { toast } from "sonner";

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
  const [copied, setCopied] = useState(false);
  const [bigScreen, setBigScreen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const handleProject = async () => {
      try {
        const { id } = await params;

        const res = await fetch(`/api/projects/${id}`, {
          method: "GET",
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to Load project");
          return;
        }

        setValue(data);
      } catch (error) {
        console.error("Project error:", error);
        toast.error("Something went wrong.");
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

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);

      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Failed to copy");
    }
  };

  const project = value.data;

  const latestGeneration =
    project.generations.length > 0
      ? project.generations[project.generations.length - 1]
      : null;

  return (
    <div className="h-screen bg-background text-foreground px-3 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <div className="max-w-7xl">

        <div className="mb-8 mt-5 md:mt-0">
          <div className="-ml-2 md:-ml-5 flex gap-2 items-center">
          
            <motion.div
            whileHover={{x: -2}}
            whileTap={{scale: 1.1}}
            className="cursor-pointer"
            onClick={() => router.back()}>
              <ChevronLeft className="h-8 w-8"/>
            </motion.div>
       
            <h1 className="text-2xl md:text-3xl font-theme">
              {project.name}
            </h1>     
          </div>

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

              <div className="px-5 py-4 border-b border-white/20 flex items-center justify-between">
                <h2 className="font-semibold">
                  Live Preview
                </h2>
                <span className="text-white/60 hover:text-white hover:scale-105 cursor-pointer"
                onClick={() => setBigScreen(true)}>
                  <Maximize className="h-5 w-5"/>
                </span>
              </div>
              <AnimatePresence>
                {bigScreen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-0 z-50 bg-background p-2 pt-4 lg:p-6">

                    <div className="flex h-full flex-col">
                      <div className="px-2 mb-4 flex items-center justify-between">

                        <div className="flex gap-1 items-center cursor-pointer -ml-2" onClick={() => setBigScreen(false)}>
                          <motion.div
                            whileHover={{x: -2}}
                            whileTap={{scale: 1.1}}
                            className="cursor-pointer">
                            <ChevronLeft className="h-5 w-5 md:h-7 md:w-7"/>
                          </motion.div>
                          <h1 className="text-lg md:text-2xl font-theme">Back</h1>
                        </div>

                        <Link href="/dashboard" className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 8, scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 400 }}>
                            <Logo className="h-6 w-6" />
                          </motion.div>

                          <AnimatePresence mode="wait">
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="whitespace-nowrap font-theme text-lg text-white"
                              >
                                Void <span className="font-bold">UI</span>
                              </motion.span>
                          </AnimatePresence>
                        </Link>
                      </div>

                      <div className="h-full flex-1 overflow-hidden rounded-xl border border-white/20">
                        <LivePreview code={latestGeneration.result} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => copy(latestGeneration.result)}
                  className="text-white/60 hover:text-white">
                  {copied ? 
                  (<Check className="h-5 w-5" />) : 
                  (<Copy className="h-5 w-5" />)}
                </motion.button>
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