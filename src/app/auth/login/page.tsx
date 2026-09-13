import Logo from "@/assets/Logo/Logo"
import BlackHole from "@/assets/Icons/blackhole"

const page = () => {
  return (
    <div className='flex h-screen w-full py-2'>
      <div className='relativeflex w-1/2 h-full bg-linear-to-t from-white/80 to-black rounded-lg p-10'>
        <BlackHole className='w-full h-full text-white/30 absolute inset-0' />
        <div className="flex w-full items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <Logo className="w-5 h-5" />
            <h1 className="text-lg text-white font-theme">Void <span className="font-bold">UI</span></h1>
          </div>
          <div>
            <span className="text-xs text-white/70 tracking-widest">@{new Date().getFullYear()}</span>
          </div>
        </div>
        
      </div>
      <div className="bg-black/85 w-1/2 h-full p-20 z-20">
        <div className="flex w-full items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <Logo className="w-5 h-5" />
            <h1 className="text-lg text-white font-theme">Void <span className="font-bold">UI</span></h1>
          </div>
        </div>
      </div>
    </div>
  )
}
    
export default page
