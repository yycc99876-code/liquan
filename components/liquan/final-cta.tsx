"use client"

import { motion } from "framer-motion"
import { BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { itemReveal, revealViewport, sectionReveal } from "@/lib/liquan-motion"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 xl:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#071311_0%,#050c0c_100%)]" />
      <div className="mountain-silhouette absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(206,159,82,0.1)] blur-[150px]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={sectionReveal}
        className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-10"
      >
        <motion.p
          variants={itemReveal}
          className="font-display text-[11px] tracking-[0.5em] text-[var(--brand-amber)]/82"
        >
          LIQUAN 1998
        </motion.p>

        <motion.h2
          variants={itemReveal}
          className="font-serif-cn mt-6 text-balance text-4xl font-medium leading-[1.08] text-[var(--brand-cream)] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          一城山水，归于这一口
        </motion.h2>

        <motion.p
          variants={itemReveal}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--brand-cream)]/74 sm:text-lg"
        >
          桂林不止在远方，
          <br />
          也在这一口琥珀微醺里。
        </motion.p>

        <motion.div
          variants={itemReveal}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-[linear-gradient(135deg,#f0cb86_0%,#ce9f52_56%,#a26a2a_100%)] px-7 text-[var(--brand-night-1)] shadow-[0_16px_48px_rgba(206,159,82,0.24)] hover:brightness-105"
          >
            <a href="/ai">
              <Sparkles className="mr-2 h-4 w-4" />
              开启 AI 酒友体验
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border border-[rgba(245,239,223,0.2)] bg-[rgba(8,16,15,0.22)] px-7 text-[var(--brand-cream)] backdrop-blur-md hover:border-[var(--brand-amber)]/65 hover:bg-[rgba(206,159,82,0.08)] hover:text-[var(--brand-amber-light)]"
          >
            <a href="#story">
              <BookOpen className="mr-2 h-4 w-4" />
              查看品牌故事
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
