"use client"

import { motion } from "framer-motion"
import { Mountain, Moon, GlassWater } from "lucide-react"

const STORIES = [
  {
    icon: Mountain,
    title: "山水",
    text: "象鼻山、漓江水波与峰林剪影，构成了漓泉1998最独特的地域记忆。",
  },
  {
    icon: Moon,
    title: "夜色",
    text: "当两江四湖的灯火亮起，塔影和杯影一起成为夜晚的开场。",
  },
  {
    icon: GlassWater,
    title: "微醺",
    text: "真正被记住的，不只是酒，而是那一晚的桌面、水珠、灯笼和朋友。",
  },
]

export function BrandStory() {
  return (
    <section
      id="story"
      className="relative w-full overflow-hidden bg-[var(--brand-night-1)] py-32 sm:py-36 lg:py-40 xl:py-48"
    >
      {/* 背景：深色山水渐变 + 微雾 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(217,154,53,0.1),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(14,75,63,0.25),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(6,26,26,0.9)] to-transparent" />

      <div className="relative mx-auto max-w-[92rem] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          {/* 左：文字 */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <p className="font-display text-[11px] tracking-[0.4em] text-[var(--brand-amber)]/80">
              BRAND STORY · 06
            </p>
            <h2 className="font-serif-cn mt-5 text-balance text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.15] text-[var(--brand-cream)]">
              来自山水之间的<span className="text-amber-gradient">一口微醺</span>
            </h2>
            <p className="mt-7 text-pretty text-base leading-relaxed text-[var(--brand-cream)]/75">
              桂林的夜色，不只在山水之间，也在一盏灯、一张桌、一声碰杯里。漓泉1998把本地记忆、清爽口感与微醺场景连接起来，让每一次举杯都像重新走进桂林。
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-[var(--brand-amber)]/45 to-transparent" />
              <span className="font-display text-[11px] tracking-[0.32em] text-[var(--brand-amber)]/70">
                EST. 1998 · GUILIN
              </span>
            </div>
          </motion.div>

          {/* 右：故事时间线 */}
          <ul className="relative lg:col-span-7">
            {/* 竖线 */}
            <span className="pointer-events-none absolute left-6 top-2 hidden h-full w-px bg-gradient-to-b from-[var(--brand-amber)]/45 via-[var(--brand-amber)]/15 to-transparent sm:block" />

            {STORIES.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.li
                  key={s.title}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="relative mb-6 last:mb-0"
                >
                  <article className="group relative flex gap-5 rounded-2xl border border-[var(--brand-amber)]/15 bg-[rgba(8,26,43,0.5)] p-6 backdrop-blur-md transition-all duration-500 hover:border-[var(--brand-amber)]/40 hover:bg-[rgba(217,154,53,0.05)]">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--brand-amber)]/45 bg-[var(--brand-night-1)]">
                      <Icon className="h-5 w-5 text-[var(--brand-amber-light)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-xs tracking-[0.32em] text-[var(--brand-amber)]/65">
                          0{i + 1}
                        </span>
                        <h3 className="font-serif-cn text-2xl font-medium text-[var(--brand-cream)]">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--brand-cream)]/70">
                        {s.text}
                      </p>
                    </div>
                  </article>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
