import Logo from "@/assets/Logo/Logo";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import WorkFlow from "@/components/ui/WorkFlow";

const ShowCase = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-background px-6 py-12 sm:px-10 md:py-16 md:px-20" id="showcase">

      <div className="absolute inset-0">
        <Logo className="absolute inset-0 h-full w-full rotate-180 text-foreground/5" />
      </div>

      <div className="relative z-10 w-full">

        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10 w-full md:mb-14">
          <div className="w-full md:w-1/2">
            <h2 className="font-theme text-2xl font-bold text-white md:text-5xl">
              From prompt to interface in seconds.
            </h2>

            <p className="mt-4 max-w-xl text-sm text-white/40 md:text-base">
              Describe what you imagine. Watch AI interpret your design system and
              deliver production-ready, accessible components effortlessly.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <WorkFlow />
          </div>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-20">

          <div className="w-full overflow-hidden rounded-2xl border-2 border-white/50 bg-white/10 shadow-2xl shadow-black/30">
            <video
              className="block h-auto w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
            >
              <source src="/Showcase.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex flex-col justify-center">

            <span className="text-sm font-heading text-foreground">
              Enroll Now
            </span>

            <h3 className="mt-4 max-w-2xl font-theme text-2xl font-bold text-white md:text-5xl">
              Bring your ideas to life.
            </h3>

            <p className="mt-4 max-w-xl text-sm text-white/40 md:text-base">
              Start with a simple prompt and create beautiful, production-ready interfaces with AI. Void UI transforms your ideas into modern, animated UI components that are easy to customize and integrate, helping you build polished experiences faster without starting everything from scratch.
            </p>

            <InteractiveHoverButton
              className="mt-5 md:mt-10 w-fit items-center justify-center"
            >
              Get Started
            </InteractiveHoverButton>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;