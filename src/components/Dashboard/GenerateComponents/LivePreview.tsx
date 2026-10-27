"use client";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import * as esbuild from "esbuild-wasm";

interface LivePreviewProps {
  code: string;
}
declare global {
  var __VOID_ESBUILD_INIT__:
    | Promise<void>
    | undefined;
}

function initEsbuild(): Promise<void> {
  // Already initializing / initialized
  if (globalThis.__VOID_ESBUILD_INIT__) {
    return globalThis.__VOID_ESBUILD_INIT__;
  }

  globalThis.__VOID_ESBUILD_INIT__ = esbuild
    .initialize({
      wasmURL:
        "https://unpkg.com/esbuild-wasm@0.28.2/esbuild.wasm",
      worker: false,
    })
    .catch((error) => {

      if (error instanceof Error && error.message.includes("initialize")) {
        return;
      }

      globalThis.__VOID_ESBUILD_INIT__ = undefined;

      throw error;
    });

  return globalThis.__VOID_ESBUILD_INIT__;
}

const LivePreview = ({
  code,
}: LivePreviewProps) => {
  const [srcDoc, setSrcDoc] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function compilePreview() {
      try {
        setloading(true);
        setError(null);
        setSrcDoc("");

        await initEsbuild();

        const cleanCode = code
          .replace(/^```(?:tsx|jsx|javascript|typescript|js|ts)?\r?\n?/i, "")
          .replace(/\r?\n?```\s*$/i, "")
          .trim();

        const result = await esbuild.transform(cleanCode, {
          loader: "tsx",
          format: "esm",
          target: "es2020",
          jsx: "transform",
          sourcemap: false,
        });

        if (cancelled) {
          return;
        }

        const compiledCode = result.code.replace(
          /<\/script>/gi,
          "<\\/script>"
        );

        const html = `
                    <!DOCTYPE html>

                    <html>
                    <head>
                      <meta charset="UTF-8" />

                      <!-- Tailwind -->
                      <script src="https://cdn.tailwindcss.com"></script>

                      <!--
                        Browser import map.

                        This allows generated code to use:

                          import React from "react";
                          import { motion } from "motion/react";
                          import { Circle } from "lucide-react";
                          import * as THREE from "three";
                          import { OrbitControls } from "three/addons/controls/OrbitControls.js";
                      -->
                      <script type="importmap">
                      {
                        "imports": {
                          "react": "https://esm.sh/react@18.3.1",
                          "react-dom/client": "https://esm.sh/react-dom@18.3.1/client",
                          "motion/react": "https://esm.sh/motion@13.1.1/react?deps=react@18.3.1",
                          "lucide-react": "https://esm.sh/lucide-react?deps=react@18.3.1",
                          "three": "https://esm.sh/three@0.174.0",
                          "three/addons/": "https://esm.sh/three@0.174.0/examples/jsm/",
                          "three/examples/jsm/": "https://esm.sh/three@0.174.0/examples/jsm/"
                        }
                      }
                      </script>

                      <style>

                        html,
                        body {
                          scrollbar-width: none;
                          -ms-overflow-style: none;
                        }

                        html::-webkit-scrollbar,
                        body::-webkit-scrollbar {
                          display: none;
                        }

                        html,
                        body,
                        #root {
                          margin: 0;
                          padding: 0;
                          width: 100%;
                          min-height: 100%;
                        }

                        body {
                          background: transparent;
                        }

                        canvas {
                          display: block;
                        }
                      </style>
                    </head>

                    <body>

                      <div id="root"></div>

                      <script type="module">

                        import ReactDOM from "react-dom/client";

                        ${compiledCode}

                        const root = ReactDOM.createRoot(
                          document.getElementById("root")
                        );

                        root.render(
                          React.createElement(App)
                        );

                      </script>

                    </body>
                    </html>
                    `;

        setSrcDoc(html);
        setloading(false);
      } catch (err) {
        console.error("Preview compilation error:", err);
        setloading(false);
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to compile preview"
          );
        }
      }
    }

    compilePreview();

    return () => {
      cancelled = true;
    };
  }, [code]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg border border-white/10 bg-background">
        <BarLoader color="var(--foreground)" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full rounded-lg border border-red-500/20 bg-red-500/5 p-5">
        <p className="mb-3 text-sm font-semibold text-red-400">
          Something went wrong while rendering your preview.
        </p>

        <pre className="whitespace-pre-wrap text-xs leading-relaxed text-red-300">
          {error}
        </pre>
      </div>
    );
  }

  // Preview iframe
  return (
    <iframe
      title="Void UI Live Preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      className="h-full w-full rounded-lg border-0 bg-transparent"
    />
  );
};

export default LivePreview;