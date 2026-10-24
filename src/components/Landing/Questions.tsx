"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    question: "What is Void UI?",
    answer:
      "Void UI is an AI-powered interface generation platform that turns plain-language prompts into polished, working UI components. Prompt what you want, and Void UI generates the interface for you with a live preview.",
  },
  {
    question: "How does Void UI generate components?",
    answer:
      "You describe the interface you want in the Generate page. Void UI validates your request and sends it to Google Gemini with a purpose-built system prompt. The generated component is then rendered in the live preview.",
  },
  {
    question: "Do I need to be an expert in frontend development?",
    answer:
      "No. Void UI is designed around natural-language prompts, so you can describe the interface you have in mind without building every part from scratch. You can then use the generated code as a starting point for your project.",
  },
  {
    question: "Can I preview my generated components?",
    answer:
      "Yes. Every generated component is displayed in a live preview so you can see the interface as it is generated. This makes it easier to experiment with different prompts and ideas.",
  },
  {
    question: "Can I save my generated components?",
    answer:
      "Yes. Void UI saves your generations so you can revisit them later. You can also organize generations into projects and pin projects that you want to keep easily accessible.",
  },
  {
    question: "What technologies does Void UI use?",
    answer:
      "Void UI is built with Next.js, TypeScript, and Tailwind CSS. It uses Google Gemini for AI generation, PostgreSQL with Prisma for data, NextAuth for authentication, Zod for validation, and Dodo Payments for billing.",
  },
  {
    question: "What kind of interfaces can I generate?",
    answer:
      "You can describe a wide range of interfaces in natural language, including dashboards, cards, forms, navigation elements, landing page sections, authentication screens, and custom UI components.",
  },
  {
    question: "Can I use Void UI components in my own projects?",
    answer:
      "Yes. Void UI is designed to help you generate usable interface code that you can adapt to your own projects. You can customize the generated component to match your application's design and requirements.",
  },
  {
    question: "Does Void UI keep my generation history?",
    answer:
      "Yes. Generations are stored with your account, allowing you to return to previous results, compare ideas, and manage your generated components through your history and projects.",
  },
  {
    question: "Is Void UI open source?",
    answer:
      "Yes. Void UI is publicly available on GitHub and is licensed under the MIT License. You can explore the source code, contribute improvements, and build on the project.",
  }
];

const Questions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white">
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