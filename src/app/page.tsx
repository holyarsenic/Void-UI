import Hero from "@/components/Landing/Hero";
import ShowCase from "@/components/Landing/ShowCase";
import Feature from "@/components/Landing/Feature";
import Footer from "@/components/Landing/Footer";
import Enroll from "@/components/Landing/Enroll";
import Pricing from "@/components/Landing/Pricing";
import Questions from "@/components/Landing/Questions";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <ShowCase />
      <Feature />
      <Questions />
      <Pricing />
      <Enroll />
      <Footer />
    </div>
  );
}
