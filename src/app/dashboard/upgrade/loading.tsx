export default function Loading() {
  return (
    <main className="h-screen overflow-y-scroll bg-background px-6 py-10 text-white md:px-10 lg:px-16">
      <div className="mt-5 md:mt-0">
        <div className="h-9 w-64 animate-pulse rounded-md bg-foreground/10" />
        <div className="mt-2 h-4 w-80 animate-pulse rounded-md bg-foreground/10" />
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-2">
        <div className="rounded-3xl border border-foreground/15 bg-foreground/5 p-8">
          <div className="h-7 w-20 animate-pulse rounded-md bg-foreground/10" />
          <div className="mt-3 h-4 w-64 animate-pulse rounded-md bg-foreground/10" />

          <div className="mt-8 h-12 w-32 animate-pulse rounded-md bg-foreground/10" />

          <div className="my-8 h-px bg-foreground/10" />

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-4 w-4 animate-pulse rounded-full bg-foreground/10" />
                <div className="h-4 w-40 animate-pulse rounded-md bg-foreground/10" />
              </div>
            ))}
          </div>

          <div className="mt-10 h-10 w-full animate-pulse rounded-md bg-foreground/10" />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-foreground/15 bg-foreground/5 p-8">
          <div className="absolute right-5 top-5 h-6 w-24 animate-pulse rounded-full bg-foreground/10" />

          <div className="h-7 w-20 animate-pulse rounded-md bg-foreground/10" />
          <div className="mt-3 h-4 w-64 animate-pulse rounded-md bg-foreground/10" />

          <div className="mt-8 h-12 w-36 animate-pulse rounded-md bg-foreground/10" />

          <div className="my-8 h-px bg-foreground/10" />

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-5 w-5 animate-pulse rounded-full bg-foreground/10" />
                <div className="h-4 w-40 animate-pulse rounded-md bg-foreground/10" />
              </div>
            ))}
          </div>

          <div className="mt-10 h-10 w-full animate-pulse rounded-md bg-foreground/10" />

          <div className="mx-auto mt-4 h-3 w-48 animate-pulse rounded-md bg-foreground/10" />
        </div>
      </div>
    </main>
  );
}