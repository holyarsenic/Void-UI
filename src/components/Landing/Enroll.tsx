import { Button } from "../ui/button";
import Logo from "@/assets/Logo/Logo";

const Enroll = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden border-t border-white/20 bg-background px-6 py-6 lg:px-25 lg:py-15">
      <div className="flex h-100 md:h-115 w-full items-center justify-between bg-gray-500/10 px-8 sm:px-12 md:px-20">
        
        <div className="max-w-2xl">
          <h1 className="text-3xl font-theme text-white sm:text-5xl md:text-6xl">
            Ready to build something amazing?
          </h1>

          <p className="mt-5 text-base font-heading text-white/50">
            Start building with Void UI today to create modern, animated, and interactive websites that feel unique and stand out.
          </p>

          <Button className="mt-7 px-6 py-5">
            Explore Void UI
          </Button>
        </div>

        <div className="hidden lg:block mr-15">
          <Logo />
        </div>

      </div>
    </div>
  );
};

export default Enroll;