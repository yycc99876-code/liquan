"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const SCENES = ["夜宵", "江边", "旅行", "聚会", "烧烤", "独饮"]
const TONES = ["高级", "朋友圈", "小红书", "抖音", "诗意", "轻松"]
const KEYWORDS = ["桂林", "漓江", "日月双塔", "象鼻山", "微醺", "朋友"]

const COPY_VARIATIONS: string[][] = [
  [
    "今晚不赶路，只让漓江的风吹过杯沿。",
    "塔影入杯，夜色刚好，漓泉刚好。",
    "第一口是桂林，第二口是朋友。",
    "把象鼻山的倒影，留在这一口琥珀里。",
  ],
  [
    "桂林的夜不长，刚好够一瓶漓泉1998。",
    "山在远处，酒在杯里，朋友在身边。",
    "夜宵的尽头，是塔影、是水波、是这一口。",
    "我们没有走完漓江，但漓江已经走进了酒里。",
  ],
  [
    "一杯入夜，一城入梦。",
    "灯笼亮起来，瓶盖轻轻一响，桂林就开始了。",
    "倒一杯漓泉，把这一夜的风都装进去。",
    "微醺的桂林，是被山水温柔地装在杯里。",
  ],
]

export function CopyGenerator() {
  const [scene, setScene] = useState("江边")
  const [tone, setTone] = useState("高级")
  const [keyword, setKeyword] = useState("漓江")
  const [variation, setVariation] = useState(0)

  // TODO: 后续接入 Dify API —— /api/dify/copy
  async function handleGenerateCopy() {
    setVariation((v) => (v + 1) % COPY_VARIATIONS.length)
  }

  const lines = COPY_VARIATIONS[variation]

  return (
    <section className="relative w-full bg-[var(--brand-night-2)] py-28 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl"
        >
          <p className="font-display text-[11px] tracking-[0.4em] text-[var(--brand-amber)]/80">
            COPY ATELIER · 05
          </p>
          <h2 className="font-serif-cn mt-5 text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.15] text-[var(--brand-cream)]">
            生成你的<span className="text-amber-gradient">桂林微醺文案</span>
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-[var(--brand-cream)]/70">
            为朋友圈、小红书、活动海报或短视频标题生成更有氛围的漓泉文案。
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* 标签选择区 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="rounded-2xl glass-card p-7 sm:p-8 lg:col-span-6"
          >
            <TagGroup
              label="场景"
              items={SCENES}
              active={scene}
              onSelect={setScene}
            />
            <TagGroup
              label="语气"
              items={TONES}
              active={tone}
              onSelect={setTone}
              className="mt-7"
            />
            <TagGroup
              label="关键词"
              items={KEYWORDS}
              active={keyword}
              onSelect={setKeyword}
              className="mt-7"
            />

            <div className="mt-8 flex items-center justify-between">
              <div className="flex flex-wrap gap-2 text-[11px] text-[var(--brand-cream)]/50">
                <span className="rounded-full border border-[var(--brand-amber)]/20 px-2 py-0.5">
                  {scene}
                </span>
                <span className="rounded-full border border-[var(--brand-amber)]/20 px-2 py-0.5">
                  {tone}
                </span>
                <span className="rounded-full border border-[var(--brand-amber)]/20 px-2 py-0.5">
                  {keyword}
                </span>
              </div>
              <Button
                onClick={handleGenerateCopy}
                size="sm"
                variant="outline"
                className="rounded-full border-[var(--brand-amber)]/45 bg-transparent text-[var(--brand-amber-light)] hover:bg-[var(--brand-amber)]/10 hover:text-[var(--brand-amber-light)]"
              >
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                换一换文案
              </Button>
            </div>
          </motion.div>

          {/* 输出文案 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="rounded-2xl glass-card-strong p-7 sm:p-8 lg:col-span-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[11px] tracking-[0.32em] text-[var(--brand-amber)]/80">
                MICRO COPY
              </span>
              <Sparkles className="h-4 w-4 text-[var(--brand-amber)]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.ol
                key={variation}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 space-y-3"
              >
                {lines.map((line, i) => (
                  <motion.li
                    key={`${variation}-${i}`}
                    initial={{ x: 12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="group flex gap-4 rounded-xl border border-transparent px-4 py-3.5 transition-colors hover:border-[var(--brand-amber)]/25 hover:bg-[rgba(217,154,53,0.05)]"
                  >
                    <span className="font-display text-sm text-[var(--brand-amber)]/65">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <p className="font-serif-cn text-base leading-relaxed text-[var(--brand-cream)]/90 group-hover:text-[var(--brand-cream)]">
                      {line}
                    </p>
                  </motion.li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TagGroup({
  label,
  items,
  active,
  onSelect,
  className = "",
}: {
  label: string
  items: string[]
  active: string
  onSelect: (v: string) => void
  className?: string
}) {
  return (
    <div className={className}>
      <p className="text-[11px] tracking-[0.32em] text-[var(--brand-cream)]/55">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((it) => {
          const isActive = it === active
          return (
            <button
              key={it}
              onClick={() => onSelect(it)}
              className={[
                "rounded-full px-3.5 py-1.5 text-xs transition-all",
                isActive
                  ? "border border-[var(--brand-amber)] bg-[var(--brand-amber)]/15 text-[var(--brand-amber-light)] shadow-[0_0_18px_-4px_rgba(217,154,53,0.5)]"
                  : "border border-[var(--brand-amber)]/20 bg-transparent text-[var(--brand-cream)]/70 hover:border-[var(--brand-amber)]/45 hover:text-[var(--brand-cream)]",
              ].join(" ")}
            >
              {it}
            </button>
          )
        })}
      </div>
    </div>
  )
}
