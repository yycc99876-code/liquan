"use client"

import { motion } from "framer-motion"
import { ArrowRight, Bomb, Camera, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { itemReveal, revealViewport, sectionReveal } from "@/lib/liquan-motion"

const FEATURES = [
  {
    icon: FileText,
    title: "微醺文案",
    text: "朋友圈、小红书、短视频标题，一键写出桂林夜色感。",
  },
  {
    icon: Camera,
    title: "照片美化",
    text: "拍照上传后，生成适合朋友圈发布的桌边氛围图。",
  },
  {
    icon: Bomb,
    title: "炸弹气球",
    text: "50 个气球轮流戳，命中炸弹就按你们自己的规则来。",
  },
]

export function AiRecommend() {
  return (
    <section id="ai" className="relative py-16 sm:py-20 lg:py-28 xl:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(206,159,82,0.12),transparent_26%),radial-gradient(circle_at_20%_80%,rgba(19,48,42,0.18),transparent_28%)]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={sectionReveal}
        className="relative mx-auto max-w-[92rem] px-5 sm:px-6 lg:px-10"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <motion.div variants={itemReveal} className="max-w-xl">
            <p className="font-display text-[11px] tracking-[0.42em] text-[var(--brand-amber)]/82">
              AI DRINKING COMPANION
            </p>
            <h2 className="font-serif-cn mt-5 text-balance text-4xl font-medium leading-[1.1] text-[var(--brand-cream)] sm:text-5xl md:text-6xl">
              AI 酒友小工具，给这一桌添点兴致
            </h2>
            <p className="mt-5 text-pretty text-sm leading-relaxed text-[var(--brand-cream)]/70 sm:text-base">
              生成能发的微醺文案，美化今晚的桌边照片，或者开一局炸弹气球。
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-full bg-[linear-gradient(135deg,#f0cb86_0%,#ce9f52_56%,#a26a2a_100%)] px-7 text-[var(--brand-night-1)] shadow-[0_16px_48px_rgba(206,159,82,0.24)] hover:brightness-105"
            >
              <a href="/ai">
                <Sparkles className="mr-2 h-4 w-4" />
                开启 AI 酒友体验
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div variants={itemReveal} className="grid gap-4 sm:grid-cols-3 lg:gap-5">
            {FEATURES.map((feature) => (
              <a
                key={feature.title}
                href="/ai"
                className="glass-card-strong group rounded-[24px] p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <feature.icon className="h-6 w-6 text-[var(--brand-amber)]" />
                <h3 className="mt-5 text-lg font-medium text-[var(--brand-cream)]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-cream)]/62">
                  {feature.text}
                </p>
                <span className="mt-5 inline-flex items-center text-xs tracking-[0.18em] text-[var(--brand-amber-light)]/72 group-hover:text-[var(--brand-amber-light)]">
                  进入体验
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
