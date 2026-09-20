"use client"

import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter()

  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  })

  const navItems = [
    { name: "Showcase", href: "#showcase" },
    { name: "Doc", href: "#doc" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
  ];
  return (
    <motion.div 
    animate={{width: scrolled ? "90%" : "100%"}}
    transition={{duration: 0.5, ease:"easeInOut"}}
    className='fixed top-0 left-1/2 -translate-x-1/2 h-15 w-full flex items-center justify-between text-accent-foreground px-5 z-20'>
      <div className="flex gap-2 font-theme">
        <Image src="/Logo.svg" alt="Void UI Logo" width={22} height={22} className="text-white w-5 h-auto" />
        <h4>Void UI</h4>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0}}
        transition={{ duration: 0.5 }}
        className={`hidden items-center gap-8 md:flex px-5 py-2 border-2 rounded-sm transition-all duration-500 ease-in-out ${ scrolled ? "border-white/40 bg-black/80 " : "border-transparent"}`}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="font-theme text-sm text-white/80 transition-colors duration-200 hover:text-white"
          >
            {item.name}
          </a>
        ))}
      </motion.div>

      <div>
        <Button variant={"default"} onClick={() => router.push("/auth/login")}>Log in</Button>
      </div>
    </motion.div>
  )
}

export default Navbar