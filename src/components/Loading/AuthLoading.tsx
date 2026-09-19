import { Circle } from "lucide-react";
import { motion } from "motion/react"

const AuthLoading = () => {
  return (
    <div className='ml-1 inline-flex items-center gap-0.5"'>
      {[0, 1, 2].map((i) => (
        <motion.span
         key={i}
         animate={{
          y: [0, -5, 0]
         }}
         transition={{
          duration: 0.6, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: i * 0.12,
         }}
        >
          <Dot className='h-2 w-2 text-10xl'/>
        </motion.span>
      ))}
    </div>
  )
}

export default AuthLoading
