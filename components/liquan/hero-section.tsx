"use client"

import { motion } from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"
import MuxPlayer from "@mux/mux-player-react/lazy"
import { Button } from "@/components/ui/button"
import { cinematicEase } from "@/lib/liquan-motion"

const MUX_PLAYBACK_ID = "fYuPJgbXvlXhYq01cChgEVVsMxw00018kLkfqMMcGbAI8k"

const playerStyle = {
  "--controls": "none",
  "--media-object-fit": "cover",
  "--media-object-position": "center",
  "--bottom-controls": "none",
  "--center-controls": "none",
  "--top-controls": "none",
  "--seek-backward-button": "none",
  "--seek-forward-button": "none",
  "--play-button": "none",
  "--mute-button": "none",
  "--captions-button": "none",
  "--airplay-button": "none",
  "--pip-button": "none",
  "--fullscreen-button": "none",
  "--cast-button": "none",
  "--playback-rate-button": "none",
  "--volume-range": "none",
  "--time-range": "none",
  "--time-display": "none",
  "--duration-display": "none",
  "--rendition-selectmenu": "none",
  "--title-display": "none",
  "--proud-display": "none",
  "--dialog": "none",
  "--loading-indicator": "none",
  "--media-control-background": "transparent",
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  pointerEvents: "none",
} as const

export function HeroSection() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-30 bg-night-gradient" />

      <motion.div
        initial={{ scale: 1.03 }}
        animate={{ scale: [1.03, 1.08, 1.03] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -z-20"
      >
        <MuxPlayer
          playbackId={MUX_PLAYBACK_ID}
          streamType="on-demand"
          autoPlay="muted"
          loop
          muted
          playsInline
          preload="auto"
          loading="viewport"
          nohotkeys
          disableTracking
          disableCookies
          aria-hidden="true"
          style={playerStyle}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: cinematicEase }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,8,0.56)_0%,rgba(4,8,8,0.22)_24%,rgba(4,8,8,0.38)_52%,rgba(4,8,8,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,8,0.84)_0%,rgba(4,8,8,0.52)_32%,rgba(4,8,8,0.18)_60%,rgba(4,8,8,0.3)_100%)]" />
        <div className="absolute left-[14%] top-[24%] h-64 w-64 rounded-full bg-[rgba(244,196,110,0.14)] blur-[110px]" />
        <div className="absolute right-[12%] top-[28%] h-72 w-72 rounded-full bg-[rgba(244,196,110,0.1)] blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(4,8,8,0.45)_100%)]" />
        <div className="grain-overlay absolute inset-0" />
      </motion.div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.7, ease: cinematicEase }}
            className="font-display text-[11px] tracking-[0.48em] text-[var(--brand-amber-light)]/85 text-shadow-soft sm:text-xs"
          >
            LIQUAN 1998 / A CITY IN ONE SIP
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 36, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.1, ease: cinematicEase }}
            className="font-serif-cn mt-6 max-w-4xl text-balance text-[2.8rem] leading-[1.02] font-semibold text-[var(--brand-cream)] text-shadow-hero sm:text-[4.15rem] md:text-[5rem] lg:text-[6.4rem]"
          >
            一城山水，归于这一口
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: 2.1, ease: cinematicEase }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--brand-cream)]/82 text-shadow-soft sm:mt-8 sm:text-lg md:text-xl"
          >
            桂林不止在远方，
            <br />
            也在这一口琥珀微醺里。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 3.1, ease: cinematicEase }}
            className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[linear-gradient(135deg,#f1cd8a_0%,#ce9f52_52%,#a8752d_100%)] px-7 text-[var(--brand-night-1)] shadow-[0_16px_48px_rgba(206,159,82,0.26)] hover:brightness-105"
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
              className="h-12 rounded-full border border-[rgba(245,239,223,0.2)] bg-[rgba(8,16,15,0.28)] px-7 text-[var(--brand-cream)] backdrop-blur-md hover:border-[var(--brand-amber)]/65 hover:bg-[rgba(206,159,82,0.1)] hover:text-[var(--brand-amber-light)]"
            >
              <a href="#story">查看品牌故事</a>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#concept"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 3.6, ease: cinematicEase }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-center text-[var(--brand-cream)]/60"
      >
        <span className="text-xs tracking-[0.22em]">向下探索桂林的这一口</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(206,159,82,0.28)] bg-[rgba(8,16,15,0.25)] backdrop-blur-md"
        >
          <ChevronDown className="h-4 w-4 text-[var(--brand-amber-light)]" />
        </motion.span>
      </motion.a>
    </section>
  )
}
