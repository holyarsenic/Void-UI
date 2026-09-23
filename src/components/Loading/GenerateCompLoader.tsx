import React from 'react'

const GenerateCompLoader = () => {
  return (
    <section className="relative mt-20 flex h-full w-full animate-pulse flex-col items-center gap-5 overflow-hidden bg-background text-white">

      <div className="h-7 w-72 max-w-full rounded-md bg-foreground/10" />

      <div className="w-full max-w-2xl">
        <div className="relative rounded-xl border-2 border-foreground/20 bg-background/30 pb-14 md:rounded-3xl">

          <div className="space-y-3 px-5 pt-5">
            <div className="h-4 w-4/5 rounded bg-foreground/10" />
            <div className="h-4 w-3/5 rounded bg-foreground/10" />
            <div className="h-4 w-2/5 rounded bg-foreground/10" />
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="h-9 w-9 rounded-xl bg-foreground/10" />
            <div className="h-9 w-9 rounded-xl bg-foreground/10" />
          </div>
        </div>
        <div className="mt-3 hidden justify-center lg:flex">
          <div className="h-3 w-56 rounded bg-foreground/5" />
        </div>
      </div>
    </section>
  )
}

export default GenerateCompLoader
