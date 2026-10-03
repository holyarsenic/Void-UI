"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sections = [
  { id: "setup", label: "Setup" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "motion", label: "Motion" },
  { id: "javascript", label: "JavaScript / React" },
  { id: "component", label: "Your first component" },
  { id: "void-ui", label: "Using Void UI" },
  { id: "client", label: '"use client"' },
];

const DocsSidebar = () => {
  const [active, setActive] = useState<string>("setup");

  const router = useRouter()
  return (
    <aside className="hidden w-52 lg:block">
      <div className="sticky top-24">
        <div className="flex items-center mb-4 gap-2 group cursor-pointer hover:scale-101" onClick={() => router.push("/")}>
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-all ease-in-out"/>
          <h1 className="text-lg text-white font-theme">Back</h1>
        </div>
        <p className="mb-4 text-xs uppercase tracking-widest text-white/30 ml-5">
          On this page
        </p>

        <nav className="space-y-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActive(section.id)}
              className={`block rounded-md px-3 py-2 text-sm ${active === section.id ? "text-foreground" : "text-foreground/40" } transition-colors hover:bg-white/5 hover:text-white/80`}>
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default DocsSidebar;