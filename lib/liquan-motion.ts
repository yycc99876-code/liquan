import type { Variants } from "framer-motion"

export const cinematicEase = [0.22, 1, 0.36, 1] as const

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(16px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: cinematicEase,
      staggerChildren: 0.14,
    },
  },
}

export const itemReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(16px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: cinematicEase,
    },
  },
}

export const revealViewport = {
  once: true,
  margin: "-80px",
}
