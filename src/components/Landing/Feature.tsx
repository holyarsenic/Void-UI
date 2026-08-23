import Logo from "@/assets/Logo/Logo";
import {WandSparkles, Orbit, Rocket, SlidersHorizontal } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Feature {
  count: number;
  icon: LucideIcon;
  title: string;
  description: string;
}
const features: Feature[] = [
  {
    count: 1,
    icon: WandSparkles,
    title: "Ideas Into UI",
    description:
      "Start with nothing but an idea. Describe the interface you want and let Void turn your words into a structured, polished UI ready to shape into your own.",
  },
  {
    count: 2,
    icon: Orbit,
    title: "Motion, Built In",
    description:
      "Static is only the starting point. Add subtle transitions, responsive interactions, and fluid motion that give every component a sense of depth without getting in the way.",
  },
  {
    count: 3,
    icon: Rocket,
    title: "Built to Ship",
    description:
      "No concept-only code or pretty prototypes that stop at the screen. Get clean, reusable components made to leave the canvas and become part of a real product.",
  },
  {
    count: 4,
    icon: SlidersHorizontal,
    title: "Yours to Control",
    description:
      "Void gives you the foundation, not the restrictions. Change the structure, styling, motion, and behavior until the component fits your product exactly the way you want it.",
  },
];

const Feature = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-background px-6 py-12 sm:px-10 md:py-16 md:px-20">

      <div className="absolute inset-0">
        <Logo className="absolute inset-0 h-full w-full text-foreground/5" />
      </div>
  
      <div className="relative z-10 mx-auto w-full">
   
        <div className="flex w-full items-center justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-theme font-bold text-foreground md:text-5xl">
              Stop building
              <br />
              the same UI twice.
            </h2>

            <p className="mt-6 max-w-xl text-sm text-foreground/50 md:text-base">
              Skip the repetitive work of designing layouts, writing boilerplate, and
              fine-tuning animations. Void UI gives you a faster way to turn ideas into
              reusable components, so you can focus on building your product instead of
              rebuilding its interface.
            </p>
          </div>
        </div>
       

        <p className="mt-10 text-lg font-heading text-foreground">
            Why Void UI?
        </p>

        <div className="mt-3 grid overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4 backdrop-blur-2xl">
          {features.map((feature) => (
            <div
              key={feature.count}
              className="group border border-foreground/10 p-7 transition-colors duration-300 hover:bg-foreground/10"
            >
              <div className="flex items-center justify-between">
                
                <feature.icon className="size-5 text-foreground/50" />

                <span className="h-1.5 w-1.5 rounded-full bg-foreground/20 transition-all duration-400 group-hover:scale-200 group-hover:bg-foreground" />
              </div>

              <h3 className="mt-10 text-xl font-medium text-foreground">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm text-foreground/45">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
