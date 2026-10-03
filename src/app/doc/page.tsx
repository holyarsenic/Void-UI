import type { Metadata } from "next";

import DocsSidebar from "@/components/Documentation/DocsSidebar";
import CodeBlock from "@/components/Documentation/CodeBlock";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to set up your project and use Void UI with Tailwind CSS and Motion.",
};

const sections = [
  {
    id: "setup",
    number: "01",
    title: "Setup",
    content: (
      <>
        <p className="mb-5 text-white/50">
          Void UI works with React and Next.js projects. Make sure you have
          Node.js installed before getting started.
        </p>

        <CodeBlock language="bash">
          {`npx create-next-app@latest my-app
cd my-app
npm run dev`}
        </CodeBlock>
      </>
    ),
  },
  {
    id: "tailwind",
    number: "02",
    title: "Install Tailwind CSS",
    content: (
      <>
        <p className="mb-5 text-white/50">
          Void UI uses Tailwind CSS for styling. Install it in your project:
        </p>

        <CodeBlock language="bash">
          {`npm install tailwindcss @tailwindcss/postcss postcss`}
        </CodeBlock>

        <p className="mb-3 mt-6 text-sm text-white/40">
          Add this to <code>postcss.config.mjs</code>:
        </p>

        <CodeBlock language="js">
          {`const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`}
        </CodeBlock>

        <p className="mb-3 mt-6 text-sm text-white/40">
          And make sure <code>app/globals.css</code> contains:
        </p>

        <CodeBlock language="css">
          {`@import "tailwindcss";`}
        </CodeBlock>
      </>
    ),
  },
  {
    id: "motion",
    number: "03",
    title: "Install Motion",
    content: (
      <>
        <p className="mb-5 text-white/50">
          Void UI uses Motion for animations and interactive components.
        </p>

        <CodeBlock language="bash">
          {`npm install motion`}
        </CodeBlock>

        <p className="mb-3 mt-6 text-sm text-white/40">
          Import Motion like this:
        </p>

        <CodeBlock language="tsx">
          {`"use client";

import { motion } from "motion/react";`}
        </CodeBlock>
      </>
    ),
  },
  {
    id: "javascript",
    number: "04",
    title: "JavaScript / React",
    content: (
      <>
        <p className="mb-5 text-white/50">
          You don&apos;t need advanced JavaScript to use Void UI. Basic knowledge
          of these concepts is enough:
        </p>

        <ul className="space-y-2 text-sm text-white/50">
          <li>• Variables — const and let</li>
          <li>• Functions</li>
          <li>• Arrays and objects</li>
          <li>• JSX</li>
          <li>• React components and props</li>
          <li>• React state</li>
        </ul>
      </>
    ),
  },
  {
    id: "component",
    number: "05",
    title: "Your first component",
    content: (
      <>
        <p className="mb-5 text-white/50">
          After installing Motion, you can create an animated component:
        </p>

        <CodeBlock language="tsx">
          {`"use client";

import { motion } from "motion/react";

export default function Example() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-white p-6 text-black"
    >
      Hello from Void UI
    </motion.div>
  );
}`}
        </CodeBlock>
      </>
    ),
  },
  {
    id: "void-ui",
    number: "06",
    title: "Using Void UI",
    content: (
      <>
        <p className="mb-5 text-white/50">
          Once your project is ready:
        </p>

        <ol className="space-y-3 text-sm text-white/50">
          <li>1. Generate a component with a prompt.</li>
          <li>2. Copy the generated code.</li>
          <li>3. Install any dependencies it requires.</li>
          <li>4. Add the component to your project.</li>
          <li>5. Customize it however you want.</li>
        </ol>
      </>
    ),
  },
  {
    id: "client",
    number: "07",
    title: '"use client"',
    content: (
      <>
        <p className="mb-5 text-white/50">
          If a generated component uses Motion or React hooks, add
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-white/70">
            &quot;use client&quot;
          </code>
          at the top of the component.
        </p>

        <CodeBlock language="tsx">
          {`"use client";

import { motion } from "motion/react";`}
        </CodeBlock>
      </>
    ),
  },
];

export default function Doc() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl justify-between gap-12 px-6 py-15">
        <DocsSidebar />

        <article className="w-full flex-1">
          <header className="mb-16">
            <Link href={"/"}>
              <div className="flex lg:hidden items-center mb-4 gap-2 group cursor-pointer hover:scale-101">
                <ChevronLeft className="w-5 h-5 hover:-translate-x-0.5 transition-all ease-in-out" />
                <h1 className="text-lg text-white font-theme">Back</h1>
              </div> 
            </Link>

            <h1 className="text-4xl font-semibold md:text-5xl">
              Documentation
            </h1>

            <p className="mt-4 text-white/50">
              Everything you need to start using Void UI in your project.
            </p>
          </header>

          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 mb-16"
            >
              <div className="mb-5">
                <span className="font-mono text-xs text-white/25">
                  {section.number}
                </span>

                <h2 className="mt-1 text-2xl font-semibold">
                  {section.title}
                </h2>
              </div>

              {section.content}
            </section>
          ))}

          <div className="border-t border-white/10 pt-8">
            <p className="text-sm text-white/30">
              You&apos;re ready to build with Void UI.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}