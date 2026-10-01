"use client";

import { useState } from "react";
import { BookOpen, Code2, Circle, MessageSquare, Sparkles, ExternalLink, Copy, Check} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function Setting() {
  const [activeTab, setActiveTab] = useState<"docs" | "contact">("docs");
  const [copied, setCopied] = useState(false);

  const examplePrompt = `Create a modern pricing card with:
- Three pricing tiers
- Dark theme
- Tailwind CSS
- Smooth Framer Motion hover animations
- Responsive layout`;

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(examplePrompt);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

    toast.success("Prompt copied");
  };

  const Contact = [{
    name: "Email",
    link: "mailto:rohankamat7986@gmail.com",
    icon: CiMail
  },
  {
    name: "GitHub",
    link: "https://github.com/holyarsenic",
    icon: FaGithub
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/rohankt4",
    icon: FaLinkedinIn
  },
  {
    name: "X (Twitter)",
    link: "https://twitter.com/holyarsenic",
    icon: FaXTwitter
  }
  ]

  return (
    <div className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <div className="max-w-5xl mt-5 md:mt-0">
        <div className="mb-8">
          <h1 className="font-theme text-3xl">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-foreground/45">
            Learn how to get the most out of Void UI and create better
            components from natural language prompts.
          </p>
        </div>

        <div className="mb-8 flex w-fit rounded-xl border border-white/10 bg-white/2 p-1">
          <button
            onClick={() => setActiveTab("docs")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
              activeTab === "docs"
                ? "bg-white/10 text-foreground"
                : "text-foreground/45 hover:text-foreground/80"
            }`}>
            <BookOpen className="h-4 w-4" />
            Documentation
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
              activeTab === "contact"
                ? "bg-white/10 text-foreground"
                : "text-foreground/45 hover:text-foreground/80"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Contact
          </button>
        </div>

        {activeTab === "docs" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <section className="rounded-2xl border border-white/10 bg-white/2 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-yellow-500/10 bg-yellow-500/10">
                  <Circle className="h-5 w-5 text-yellow-500" />
                </div>

                <div>
                  <h2 className="font-medium">
                    Build interfaces with prompts
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-foreground/45">
                    Void UI turns natural language into reusable UI
                    components. Describe what you want, specify the technology
                    or animation requirements, and let Void UI generate the
                    component.
                  </p>
                </div>
              </div>
            </section>
            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/2 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Code2 className="h-5 w-5 text-foreground/60" />
                  <h2 className="font-medium">Writing prompts</h2>
                </div>

                <div className="space-y-3 text-sm text-foreground/45">
                  <p>
                    Be specific about the component you want to generate.
                  </p>

                  <p>
                    Mention layout, colors, spacing, responsive behavior and
                    interactions when they matter.
                  </p>

                  <p>
                    You can explicitly request Tailwind CSS classes and
                    animation behavior.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/2 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-foreground/60" />
                  <h2 className="font-medium">Animations</h2>
                </div>

                <div className="space-y-3 text-sm text-foreground/45">
                  <p>
                    Void UI supports animated interfaces using Motion.
                  </p>

                  <p>
                    Ask for hover effects, entrance animations, transitions,
                    staggered elements or interactive states.
                  </p>

                  <p>
                    For React projects, generated animations can use the
                    <span className="mx-1 text-foreground/70">
                      motion/react
                    </span>
                    package.
                  </p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/2">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <h2 className="text-sm font-medium">
                    Example prompt
                  </h2>
                  <p className="mt-1 text-xs text-foreground/35">
                    A detailed prompt usually produces more predictable
                    results.
                  </p>
                </div>

                <button
                  onClick={copyPrompt}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/40 transition hover:bg-white/10 hover:text-foreground"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <pre className="font-sans overflow-x-auto p-5 text-sm text-foreground/65">
                {examplePrompt}
              </pre>
            </section>
            <section>
              <h2 className="mb-4 text-sm font-medium text-foreground/80">
                Recommended stack
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/2 p-5">
                  <p className="font-medium">Tailwind CSS</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/40">
                    Use utility classes for layout, spacing, typography,
                    responsive design and styling.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/2 p-5">
                  <p className="font-medium">Motion</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/40">
                    Create smooth transitions, hover states and interactive
                    animations with Motion for React.
                  </p>
                </div>
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/2 p-6">
              <h2 className="font-medium">Prompt tips</h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "Describe the component first",
                  "Specify the visual style",
                  "Mention responsive behavior",
                  "Describe interactions",
                  "Request Tailwind CSS",
                  "Request Motion animations",
                ].map((tip) => (
                  <div
                    key={tip}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/2 px-4 py-3 text-sm text-foreground/55"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground/55" />
                    {tip}
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className=" max-w-2xl">
            <div>
              <h2 className="font-theme text-base md:text-2xl text-foreground">
                Contact
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {Contact.map((contact) => (
                  <a
                    key={contact.name}
                    href={contact.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/2 px-4 py-3 text-sm text-foreground/55 transition hover:bg-white/10"
                  >
                    <contact.icon className="h-4 w-4 text-foreground/30 transition group-hover:text-foreground/70" />
                    <span>{contact.link}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-theme text-base md:text-2xl text-foreground">
                Resources
              </h2>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <a
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/10 bg-white/2 p-5 transition hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Tailwind CSS
                  </span>
                  <ExternalLink className="h-4 w-4 text-foreground/30 transition group-hover:text-foreground/70" />
                </div>

                <p className="mt-2 text-xs leading-relaxed text-foreground/40">
                  Learn more about Tailwind utility classes.
                </p>
              </a>

              <a
                href="https://motion.dev/docs"
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/10 bg-white/2 p-5 transition hover:bg-white/10" >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Motion
                  </span>
                  <ExternalLink className="h-4 w-4 text-foreground/30 transition group-hover:text-foreground/70" />
                </div>

                <p className="mt-2 text-xs leading-relaxed text-foreground/40">
                  Learn how to build animations with Motion for React.
                </p>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}