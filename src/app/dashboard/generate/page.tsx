import GenerateComp from "@/components/Dashboard/GenerateComponents/GenerateComp";

export default function Generate() {
  return (
    <main className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16 overflow-y-scroll">
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-theme">
          Generate Component
        </h1>

        <p className="text-sm text-white/40 font-theme mt-1">
          Pull your ideas beyond the event horizon.
        </p>
      </div>

      <section className="w-full">
        <GenerateComp />
      </section>
    </main>
  );
}