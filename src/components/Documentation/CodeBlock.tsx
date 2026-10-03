"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlock = ({
  children,
  language = "tsx",
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg border-2 border-white/40">
      <div className="flex items-center justify-between border-b-2 border-white/40 px-4 py-2.5">
        <span className="font-mono text-xs text-white/60">
          {language}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-white/80 transition-colors cursor-pointer hover:text-white hover:scale-102">
          {copied ? (
            <><Check size={14} />Copied</>
          ) : (
            <><Copy size={14} />Copy</>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-5 text-sm leading-7 text-foreground/95">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;