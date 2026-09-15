"use client"

import Logo from "@/assets/Logo/Logo"
import BlackHole from "@/assets/Icons/blackhole"
import { ChevronLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import LoginPage from "@/components/Auth/LoginPage";

const Login = () => {
  const router = useRouter()
  return (
    <div className='flex min-h-screen w-full py-2'>
      <div className='hidden lg:flex flex-col gap-10 w-1/2 h-screen bg-linear-to-t from-white/80 to-black rounded-lg p-10'>
        <BlackHole className='w-full h-full text-white/30 absolute inset-0' />
        <div className="h-full w-full flex flex-col mt-20">
          <h2 className="text-5xl font-bold text-white font-theme leading-tight">
            From prompt
            <br />
            to <span className="text-white/70">pixel - perfect</span> UI.
          </h2>

          <p className="mt-5 max-w-lg text-lg text-white/60 font-theme leading-relaxed">
            Your vision enters the void. AI brings it to life.
          </p>
        </div>
        <div className="flex w-full justify-between gap-5">
          <div>
            <span className="text-xs text-black/70 tracking-widest">All rights reserve</span>
          </div>
          <div>
            <span className="text-xs text-black/70 tracking-widest">@{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 md:gap-10 bg-black/85 w-full md:w-1/2 h-full p-5 md:p-20 z-20">
        <div className="flex w-full items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <Logo className="w-5 h-5" />
            <h1 className="text-lg text-white font-theme">Void <span className="font-bold">UI</span></h1>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:scale-102" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-all ease-in" />
            <h1 className="text-lg text-white font-theme">Back</h1>
          </div>
        </div>
        <LoginPage />
      </div>
    </div>
  )
}
    
export default Login
