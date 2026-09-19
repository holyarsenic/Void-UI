import { motion } from "motion/react"

const AuthLoading = () => {
  return (
    <div className='flex items-center gap-3'>
      {[0, 1, 2].map((i) => (
        <motion.span
         key={i}
         animate={{
          y: [1, -5, 1],
          scale: [1, 1.35, 1],
          opacity: [0.5, 1, 0.5]
         }}
         transition={{
          duration: 0.6, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: i * 0.12,
         }}
        className="h-2 w-2 rounded-full bg-current"
        >
        </motion.span>
      ))}
    </div>
  )
}

export default AuthLoading
