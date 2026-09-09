"use client";

import {
  Sparkles,
  WandSparkles,
  SlidersHorizontal,
  Rocket,
} from "lucide-react";

const workFlowSteps = [
  {
    number: "1.",
    icon: Sparkles,
    title: "Prompt",
    description: "Describe your idea.",
  },
  {
    number: "2.",
    icon: WandSparkles,
    title: "Generate",
    description: "Create your UI instantly.",
  },
  {
    number: "3.",
    icon: SlidersHorizontal,
    title: "Customize",
    description: "Make it yours.",
  },
  {
    number: "4.",
    icon: Rocket,
    title: "Build",
    description: "Ship it to your project.",
  },
];

const WorkFlow = () => {
  return (
    <section className="relative w-full h-full flex justify-center items-center overflow-hidden">
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-10">
            {workFlowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="group relative flex flex-col items-center gap-1">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                    <Icon className="h-4 w-4 text-white/50 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <div className="flex flex-col items-center justify-center">

                    <div className="flex">
                      <span className="font-theme text-base font-semibold text-white">
                        {step.number}
                      </span>

                      <h3 className="font-theme text-base font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-1 text-sm text-white/30 text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
    </section>
  );
};

export default WorkFlow;