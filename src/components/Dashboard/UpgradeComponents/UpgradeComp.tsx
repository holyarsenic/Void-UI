"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
interface UpgradeCompProps {
  Plan: "free" | "pro";
}

const UpgradeComp = ({ Plan }: UpgradeCompProps) => {

  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: "pro" }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Checkout failed");
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const freeFeatures = [
    "10 generations/day",
    "Powered by Gemini",
    "Live Preview",
  ];

  const proFeatures = [
    "150 generations/day",
    "Powered by Gemini",
    "Live Preview",
  ];

  return (
    <>   
      <div className="max-w-7xl">
        <div className="mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-2">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8">
            <div>
              <h2 className="text-2xl font-semibold">Free</h2>

              <p className="mt-2 text-sm text-white/50">
                Everything you need to get started.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-5xl font-bold">$0</span>
              <span className="ml-2 text-sm text-white/40">/ month</span>
            </div>

            <div className="my-8 h-px bg-white/15" />

            <div className="space-y-4">
              {freeFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-white/70">
                  <Check className="h-4 w-4 text-white/50" />
                  {feature}
                </div>
              ))}
            </div>

            <Button
              disabled
              variant={"outline"}
              className="mt-10 w-full py-5">
              { Plan === "free" ? "Current Plan" : "Manage Plan"}
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-yellow-500/40 bg-yellow-600 p-8 text-black shadow-2xl shadow-yellow-600/10">
            <div className="absolute right-5 top-5 rounded-full bg-black/10 px-3 py-1 text-xs font-semibold">
              RECOMMENDED
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Pro</h2>

              <p className="mt-2 text-sm text-black/60">
                For users who want more power.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-5xl font-bold">$5.9</span>
              <span className="ml-2 text-sm text-black/60">/ month</span>
            </div>

            <div className="my-8 h-px bg-black/10" />

            <div className="space-y-4">
              {proFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-black/80"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                    <Check className="h-3 w-3" />
                  </div>

                  {feature}
                </div>
              ))}
            </div>

            <Button
              onClick={handleUpgrade}
              className="mt-10 w-full py-5"
            >
              {Plan === "free" ? "Upgrade to Pro" : "Current Plan"}
            </Button>

            <p className="mt-4 text-center text-xs text-black/50">
              $5.9/month · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpgradeComp;