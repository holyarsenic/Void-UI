import GenerateComp from "@/components/Dashboard/GenerateComponents/GenerateComp";

export default function Generate(){
 return (
    <div className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <h1 className="font-theme text-3xl">Generate</h1>
      <GenerateComp />
    </div>
  );
};