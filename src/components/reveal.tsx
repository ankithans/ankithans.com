import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

/** Subtle slide-up + fade reveal on enter. Instant under reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              delay,
            }
      }
    >
      {children}
    </motion.div>
  )
}
