import BlackHole from "@/assets/Icons/blackhole"

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen py-2'>
      <div className='flex items-center justify-center w-full h-auto gap-4 text-center px-4 md:px-10'>
        <BlackHole className='w-30 h-30 md:w-50 md:h-50 lg:w-100 lg:h-100 -rotate-30 -mr-2' />
        <div className="h-2/5 bg-white w-1 mr-2 md:mr-5 lg:mr-10"></div>
        <h1 className='text-xl md:text-2xl lg:text-5xl font-bold text-white font-theme'>404</h1>
        <p className='text-base md:text-2xl lg:text-5xl text-white font-theme'>Page Not Found</p>
      </div>
    </div>
  )
}

export default NotFound
