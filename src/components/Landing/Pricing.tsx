import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HashLoader } from "react-spinners";

const Pricing = () => {
  const freeFeatures = [
    "10 generations per day",
    "Powered by Gemini",
    "Live preview"
  ];

  const proFeatures = [
    "150 generations per day",
    "Powered by Gemini",
    "Live preview"
  ];

  return (
    <section className="relative min-h-[95vh] w-full overflow-hidden bg-[#050505] text-white md:min-h-screen px-6 py-8 lg:py-16 lg:px-20" id="pricing">

      <div className="relative z-10 w-full lg:w-1/2 mb-15">
        <h2 className="text-2xl font-theme font-bold text-foreground md:text-5xl">
          Choose how you build
        </h2>
        <p className="mt-4 text-lg text-white/50">
          Start for free, then upgrade when you need more generations, more freedom, and more room to create
        </p>
      </div>
      
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 xl:flex-row">
        <div className="hidden lg:flex w-[30%] h-[65vh] flex-col justify-between rounded-2xl border-4 border-white/40 bg-white/2 p-10">
          
          <div className="h-full w-full flex flex-col items-center justify-between pt-10">
            <HashLoader color="#ffffff" size={200}/>

            <div className="text-center">
              <p className="text-xs uppercase text-white/80">
                Building your interface
              </p>

              <p className="mt-2 text-xs text-white/50">
                Powered by Gemini
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[70%] h-full rounded-3xl flex flex-col lg:flex-row items-center justify-center gap-6">
          <div className="w-full sm:w-[80vw] md:w-[70vw] lg:w-1/2 h-120 md:h-[65vh] rounded-2xl border border-white/15 bg-white/5 p-8">
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

            <Link href="/auth/login">
              <Button
                variant={"default"}
                className="mt-10 w-full py-5">
                Get Started
              </Button>
            </Link>
              
          </div>
          <div className="w-full sm:w-[80vw] md:w-[70vw] lg:w-1/2 relative overflow-hidden h-120 lg:h-[65vh] rounded-2xl bg-foreground/60 p-8 text-black shadow-2xl shadow-yellow-600/10">
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
                  className="flex items-center gap-3 text-sm text-black/80">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10">
                    <Check className="h-3 w-3" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <Link href="/auth/login">
              <Button className="mt-10 w-full py-5 bg-background text-white hover:bg-background/80">
                Upgrade to Pro
              </Button>
            </Link>

            <p className="mt-4 text-center text-xs text-black/50">
              $5.9/month · Cancel anytime
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Pricing;