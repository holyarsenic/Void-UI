"use client";

import { useState, useEffect } from "react";
import Logo from "@/assets/Logo/Logo";
import { ArrowUp } from "lucide-react";
import { Button } from "../../ui/button";
import { useSession } from "next-auth/react";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";

const GenerateComp = () => {
  const [value, setValue] = useState("");

  const router = useRouter();

  const { data, status } = useSession();
  const user = data?.user;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    setValue("");
  };

  return (
    <section className="relative h-full w-full flex flex-col gap-5 items-center mt-20 overflow-hidden bg-background text-white">

        <h2 className="font-theme text-base md:text-2xl text-foreground/60 text-center">
          {user?.name?.split(" ")[0] || "Creator"}&apos;s — What&apos;s the next move?
        </h2>
        <div className="w-full max-w-2xl">
          <div className="group relative overflow-hidden rounded-xl md:rounded-3xl border-2 border-foreground/40 bg-background/30 focus-within:border-foreground/70 transition-colors duration-50 ease-in-out pb-14">

            <TextareaAutosize
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Describe what you want to build..."
              minRows={3}
              maxRows={8}
              className="w-full resize-none bg-transparent px-5 pt-5 text-sm text-white placeholder:text-white/40 outline-none"/>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white/50 transition hover:text-white">
                  <Logo className="h-5 w-5"/>
              </div>

              <Button
                variant={"default"}
                onClick={handleSubmit}
                disabled={!value.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-all hover:scale-105 disabled:opacity-30">
                <ArrowUp size={18} strokeWidth={2.5} />
              </Button>
            </div>
          </div>

          <p className="hidden lg:block mt-3 text-center text-xs text-white/40">
            Press Enter to send · Shift + Enter for a new line
          </p>
        </div>
    </section>
  );
};

export default GenerateComp;