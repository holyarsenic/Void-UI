"use client";

import { useEffect, useState } from "react";
import { Copy, Maximize, ChevronLeft, Check, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/assets/Logo/Logo";
import { motion, AnimatePresence } from "motion/react" 
import LivePreview from "@/components/Dashboard/GenerateComponents/LivePreview";
import { toast } from "sonner";
import { RingLoader, HashLoader } from "react-spinners";
import EditProjectPage from "@/components/Dashboard/EditProject/EditProjectPage";

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
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [bigScreen, setBigScreen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const handleProject = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    handleProject();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <RingLoader size={30} color="#ffffff" />
      </div>
    );
  }

  if (!value?.data) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <p>Project not found.</p>
      </div>
    );
  }


  const handleDelete = async () => {
    try {
      setDeleting(true);
      const { id } = await params;

      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to delete project");
        return;
      }

      toast.success("Project deleted successfully");
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Delete project error:", error);
      toast.error("Something went wrong.");
      setDeleting(false);
    } finally {
      setDeleting(false);
    }
  };

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

        <div className="relative mb-8 -ml-10 pt-2">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 hover:bg-white/20 hover:text-foreground transition-colors"
              onClick={() => router.back()}>
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <h1 className="text-2xl md:text-3xl font-theme font-medium tracking-tight truncate max-w-[65vw] lg:max-w-[40vw]">
              {project.name}
            </h1>

            <button
              onClick={() => setEditing(true)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground/40 hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors">
              <Pencil className="h-4 w-4" />
            </button>
          </div>

          {project.description && (
            <p className="mt-2 ml-12 max-w-[80vw] md:max-w-[55vw] text-sm leading-relaxed text-foreground/45 line-clamp-2">
              {project.description}
            </p>
          )}

          <motion.button
            whileTap={{ scale: deleting ? 1 : 0.95 }}
            whileHover={{ scale: deleting ? 1 : 1.02 }}
            type="button"
            className="absolute -top-3 right-1 md:top-2 md:right-4 inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 border border-red-500/20 bg-red-950/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40 backdrop-blur-sm"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <HashLoader size={14} color="#f87171" />
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5 text-red-400" />
                <span>Delete</span>
              </>
            )}
          </motion.button>
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
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden bg-background border border-foreground/20 rounded-xl px-3 py-3">
              <EditProjectPage
                id={project.id}
                cancelButton={() => setEditing(false)} 
                projectName={project.name}
                projectDescription={project.description || ""}
                onUpdate={(updatedProject) => {
                  setValue((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        name: updatedProject.name,
                        description: updatedProject.description || null,
                      },
                    };
                  });
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}