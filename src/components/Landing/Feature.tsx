import {
  WandSparkles,
  Orbit,
  Rocket,
  SlidersHorizontal,
  LucideIcon,
} from "lucide-react";

import BlackHole from "@/assets/Icons/blackhole";

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
    title: "Prompt to UI",
    description:
      "Turn your ideas into polished React and Tailwind components with a simple prompt.",
  },
  {
    count: 2,
    icon: Orbit,
    title: "Motion Built In",
    description:
      "Add smooth transitions and interactions with Framer Motion, ready to customize.",
  },
  {
    count: 3,
    icon: Rocket,
    title: "Ready to Ship",
    description:
      "Generate clean, responsive components built for real products, not just prototypes.",
  },
  {
    count: 4,
    icon: SlidersHorizontal,
    title: "Fully Yours",
    description:
      "Customize the layout, style, motion, and behavior to match your product.",
  },
];

const Feature = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-background px-6 py-8 lg:py-16 lg:px-20">
      <div className="relative z-10 mx-auto w-full">

        <div className="relative mb-12 flex w-full flex-col gap-6 lg:mb-16 lg:flex-row lg:justify-between">

          <div className="relative z-10 w-full lg:w-1/2">
            <h2 className="text-2xl font-theme font-bold text-foreground md:text-5xl lg:text-5xl">
              Stop building the same UI twice.
            </h2>

            <p className="mt-5 max-w-xl text-sm text-white/40 md:text-base sm:leading-7">
              Skip the repetitive work of designing layouts, writing
              boilerplate, and fine-tuning animations. Void UI gives you a
              faster way to turn ideas into reusable components, so you can
              focus on building your product instead of rebuilding its
              interface.
            </p>
          </div>

          <div className="absolute right-0 -top-10 lg:-top-25 justify-center items-center lg:w-1/2 -z-50">
            <BlackHole className="h-full w-full text-foreground/10 lg:text-foreground/80" />
          </div>
        </div>

        <p className="mb-3 text-base font-theme text-foreground md:text-lg">
          Why Void UI?
        </p>

        <div className="grid overflow-hidden border md:border-4 border-foreground/50 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.count}
              className="group border-2 border-foreground/50 p-4 transition-colors duration-300 hover:bg-foreground/10 md:p-6 lg:p-7"
            >
              <div className="flex items-center justify-between">
                <feature.icon className="size-5 text-foreground/50" />

                <span className="h-1.5 w-1.5 rounded-full bg-foreground/20 transition-all duration-300 group-hover:scale-200 group-hover:bg-foreground" />
              </div>

              <h3 className="mt-6 md:mt-8 text-lg font-medium sm:leading-tight text-foreground md:text-xl">
                {feature.title}
              </h3>

              <p className="mt-2 md:mt-3 text-sm leading-[1.6] text-foreground/45">
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