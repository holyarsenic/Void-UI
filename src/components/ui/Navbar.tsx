"use client"

import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter()
  return (
    <div className='fixed top-0 h-15 w-full flex items-center justify-between text-accent-foreground px-5 z-20'>
      <div className="flex gap-2 font-theme">
        <Image src="/Logo.svg" alt="Void UI Logo" width={22} height={22} className="text-white"/>
        <h4>Void UI</h4>
      </div>

      <div>
        <Button variant={"ghost"} onClick={() => router.push("/auth/login")}>Log in</Button>
      </div>
    </div>
  )
}

export default Navbar