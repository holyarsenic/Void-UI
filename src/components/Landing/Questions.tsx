"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    question: "What is Void UI?",
    answer:
      "Void UI is an AI-powered component generation platform that turns simple prompts into stunning, animated UI components. Describe what you imagine, and watch it come to life.",
  },
  {
    question: "Do I need frontend development experience?",
    answer:
      "Not at all. Just describe what you want in plain language. Void UI handles the heavy lifting and gives you working code that you can customize for your project.",
  },
  {
    question: "What makes Void UI animations special?",
    answer:
      "Void UI uses Framer Motion and Three.js to bring components to life with smooth transitions, interactive effects, and immersive 3D experiences. Every detail is designed to make your interface stand out.",
  },
  {
    question: "Can I preview my generated components?",
    answer:
      "Absolutely. Every component comes with a live preview. See your ideas take shape, experiment with different prompts, and fine-tune the result until it feels right.",
  },
  {
    question: "Can I save and organize my creations?",
    answer:
      "Yes. Your generations are saved so you can revisit them anytime. Organize them into projects, pin your favorites, and keep everything within reach.",
  },
  {
    question: "Can I use Void UI in my own projects?",
    answer:
      "Of course. Get the generated code and make it yours. Customize the styles, animations, and interactions, then bring your components into your own projects. Void UI is open source under the MIT License.",
  },
];

const Questions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-[#050505] text-white">
      <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col px-6 py-16 md:px-10 lg:px-20 lg:py-24">

        <div className="relative z-10 w-full lg:w-1/2">
          <p className="mb-4 font-theme text-xs uppercase tracking-[0.3em] text-white/40">
            VOID UI · FAQ
          </p>

          <h1 className="text-2xl font-theme font-bold text-foreground md:text-5xl lg:text-5xl">
            Questions from the void
          </h1>

          <p className="mt-5 max-w-xl text-sm text-white/40 md:text-base sm:leading-7">
            Everything you need to know about Void UI, AI-generated
            components, and turning your ideas into interfaces.
          </p>
        </div>
        
        <div className="m-auto mt-16 w-full max-w-4xl lg:mt-20">
          <div className="border-t border-b border-white">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border-b border-white/40">
                  <button
                    type="button"
                    onClick={() => toggleQuestion(index)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-8 py-6 text-left md:py-7">
                    <div className="flex items-center gap-5">
                      <span className="hidden font-mono text-sm text-white/70 sm:block">
                        {String(index + 1)}
                      </span>

                      <span
                        className={`font-theme text-sm transition-colors duration-200 md:text-base ${
                          isOpen
                            ? "text-white"
                            : "text-white/70 group-hover:text-white/80"}`}>
                        {item.question}
                      </span>
                    </div>

                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center border border-white/50 text-white/70 transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-white text-white"
                          : "group-hover:border-white/70 group-hover:text-white/80"}`}>
                      <ChevronDown size={15} strokeWidth={1.5} />
                    </span>
                  </button>

                  <div className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[2fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="pb-7 pl-0 pr-12 sm:pl-10 md:pr-20">
                        <p className="max-w-2xl text-sm leading-7 text-white">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 border-t border-white pt-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="font-theme text-xs text-white/80">
              Still have questions?
            </p>

            <p className="font-theme text-xs text-white/80">
              Let the void shape your next component.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;