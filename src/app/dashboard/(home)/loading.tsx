export default function Loading() {
  return (
    <main className="h-screen bg-background text-white px-6 py-5 md:py-10 md:px-10 lg:px-16">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <div className="h-9 w-64 rounded-md bg-foreground/10 animate-pulse ml-8 md:ml-0" />
          <div className="mt-2 h-4 w-80 rounded-md bg-foreground/10 animate-pulse" />
        </div>

        <div className="h-11 w-48 rounded-md bg-foreground/10 animate-pulse" />
      </div>

      <div className="w-full flex mb-12 border border-foreground/20 p-1">
        <div className="w-full md:w-[50%] h-40 border border-white/10 p-6">
          
          <div className="flex items-start justify-between">
            <div>
              <div className="h-3 w-24 rounded bg-foreground/10 animate-pulse" />
              <div className="mt-4 h-10 w-28 rounded bg-foreground/10 animate-pulse" />
            </div>

            <div className="h-7 w-14 rounded bg-foreground/10 animate-pulse" />
          </div>

          <div className="mt-6 h-1 w-full bg-foreground/10 animate-pulse" />

          <div className="mt-3 h-3 w-48 rounded bg-foreground/10 animate-pulse" />
        </div>

        <div className="hidden md:block relative w-[50%] h-40 bg-foreground/5 animate-pulse" />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-6 w-48 rounded bg-foreground/10 animate-pulse" />
          <div className="mt-2 h-4 w-64 rounded bg-foreground/10 animate-pulse" />
        </div>

        <div className="mr-5 h-4 w-16 rounded bg-foreground/10 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-24 rounded-xl border border-foreground/20 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-md bg-foreground/10 animate-pulse" />
                  <div className="h-4 w-40 rounded bg-foreground/10 animate-pulse" />
                </div>

                <div className="mt-3 h-3 w-3/4 rounded bg-foreground/10 animate-pulse" />
              </div>

              <div className="h-3 w-16 rounded bg-foreground/10 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}