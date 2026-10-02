import React from 'react'

const ProjectLoader = () => {
  return (
    <div className="h-screen bg-background text-white px-6 py-10 md:px-10 lg:px-16">
      <div className="mb-5 mt-5 md:mt-0">
        <div className="h-9 w-48 rounded-md bg-foreground/10 animate-pulse" />
        <div className="mt-2 h-4 w-72 rounded-md bg-foreground/10 animate-pulse" />
      </div>

      <div className="mb-4 mt-8 h-6 w-40 rounded-md bg-foreground/10 animate-pulse" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-30 rounded-xl border border-foreground/20 px-4 py-4 sm:px-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-md bg-foreground/10 animate-pulse" />
                  <div className="h-4 w-32 rounded-md bg-foreground/10 animate-pulse" />
                </div>

                <div className="mt-3 h-3 w-3/4 rounded-md bg-foreground/10 animate-pulse" />

                <div className="mt-4 h-3 w-20 rounded-md bg-foreground/10 animate-pulse" />
              </div>

              <div className="h-5 w-5 rounded-md bg-foreground/10 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectLoader
