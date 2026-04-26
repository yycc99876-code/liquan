"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { itemReveal, revealViewport, sectionReveal } from "@/lib/liquan-motion"

const TAGS = ["清爽", "微醺", "夜宴", "桂林记忆"]

const DETAILS = [
  {
    label: "风味",
    value: "清爽麦香，回味干净",
  },
  {
    label: "场景",
    value: "夜宴、江边、朋友相聚",
  },
  {
    label: "温度",
    value: "建议冰镇饮用",
  },
  {
    label: "记忆点",
    value: "一口入桂林",
  },
] as const

export function ProductShowcase() {
  return (
    <section id="product" className="relative py-16 sm:py-20 lg:py-28 xl:py-32">
      <div className="pointer-events-none absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-[rgba(206,159,82,0.12)] blur-[120px]" />
      <div className="pointer-events-none absolute right-[-8rem] bottom-16 h-72 w-72 rounded-full bg-[rgba(19,48,42,0.24)] blur-[120px]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={sectionReveal}
        className="relative mx-auto max-w-[92rem] px-5 sm:px-6 lg:px-10"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 xl:gap-20">
          <motion.div variants={itemReveal} className="relative">
            <div className="glass-card-strong relative overflow-hidden rounded-[32px] px-6 py-10 sm:px-8 sm:py-14 lg:py-16">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(244,196,110,0.24),transparent_36%)]" />
              <div className="absolute inset-x-10 bottom-0 h-24 rounded-full bg-[rgba(206,159,82,0.18)] blur-[60px]" />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(206,159,82,0.1)_44%,transparent_70%)]" />
              <div className="absolute inset-x-8 bottom-14 h-24 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,196,110,0.28),rgba(206,159,82,0.08)_42%,transparent_72%)] blur-md" />
              <div className="absolute bottom-10 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(244,196,110,0.42)] to-transparent" />
              <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(245,239,223,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(245,239,223,0.1)_1px,transparent_1px)] [background-size:44px_44px]" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto aspect-[4/5] w-full max-w-[34rem]"
              >
                <Image
                  src="/images/liquan/product-main.webp"
                  alt="漓泉1998 产品主视觉"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="scale-[1.25] object-contain"
                />
              </motion.div>

              <div className="absolute left-6 top-6 rounded-full border border-[rgba(206,159,82,0.2)] bg-[rgba(5,12,12,0.3)] px-4 py-2 backdrop-blur-md sm:left-8 sm:top-8">
                <p className="font-display text-[11px] tracking-[0.34em] text-[var(--brand-amber)]/78">
                  PRODUCT / 1998
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemReveal} className="max-w-xl">
            <p className="font-display text-[11px] tracking-[0.42em] text-[var(--brand-amber)]/82">
              SIGNATURE POUR
            </p>
            <h2 className="font-serif-cn mt-5 text-4xl font-medium leading-[1.08] text-[var(--brand-cream)] sm:text-5xl md:text-6xl">
              漓泉1998
            </h2>
            <p className="mt-4 text-lg text-[var(--brand-cream)]/78">
              来自桂林山水的一口琥珀微醺
            </p>

            <p className="mt-7 text-pretty text-sm leading-relaxed text-[var(--brand-cream)]/72 sm:text-base">
              以桂林夜色为灵感，将山水的清冽、灯火的温度与啤酒的琥珀色泽融合，
              形成一款更适合夜宴、相聚与微醺时刻的品牌表达。
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(206,159,82,0.22)] bg-[rgba(206,159,82,0.06)] px-3 py-1 text-xs tracking-[0.18em] text-[var(--brand-cream)]/72"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {DETAILS.map((detail) => (
                <motion.div
                  key={detail.label}
                  variants={itemReveal}
                  className="glass-card rounded-[22px] p-5"
                >
                  <p className="font-display text-[11px] tracking-[0.3em] text-[var(--brand-amber)]/70">
                    {detail.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--brand-cream)]/82">
                    {detail.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
