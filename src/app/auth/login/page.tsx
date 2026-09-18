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
      <BlackHole className='w-full h-full text-white/30 absolute inset-0' />
      <div className='hidden lg:flex flex-col justify-between gap-10 w-1/2 h-screen bg-linear-to-t from-white/80 to-black rounded-lg p-10'>
        <div className="flex items-center gap-3 mb-7">
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-mono">
            Built for creators
          </span>
        </div>

        <div className="h-full w-full flex flex-col mt-5">
        
          <h2 className="text-6xl font-bold text-white font-theme">
            From a prompt
            <br /> to{" "}
            <span className="font-light text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/30">
              pure motion.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-lg text-white/60 font-theme leading-relaxed">
            Enter your prompt. Step out with an interface that moves.
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
      <div className="flex flex-col gap-50 items-center bg-black/85 w-full lg:w-1/2 h-screen p-5 lg:p-20 z-20">
        <div className="flex w-full items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <Logo className="w-5 h-5" />
            <h1 className="text-lg text-white font-theme">Void <span className="font-bold">UI</span></h1>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:scale-102" onClick={() => router.push("/")}>
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
