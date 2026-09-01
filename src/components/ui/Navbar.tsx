import Image from "next/image"
import { Button } from "./button"

const Navbar = () => {
  return (
    <div className='fixed top-0 h-15 w-full flex items-center justify-between text-accent-foreground px-5 z-20'>
      <div className="flex gap-2 font-theme">
        <Image src="/Logo.svg" alt="Void UI Logo" width={22} height={22} className="text-white"/>
        <h4>Void UI</h4>
      </div>

      <div>
        <Button variant={"ghost"}>Log in</Button>
        <Button variant={"default"}>Sign Up</Button>
      </div>
    </div>
  )
}

export default Navbar