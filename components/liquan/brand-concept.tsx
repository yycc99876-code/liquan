"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { itemReveal, revealViewport, sectionReveal } from "@/lib/liquan-motion"

const CONCEPTS = [
  {
    title: "第一口，是桂林",
    description: "象鼻山的轮廓，被收进冷凝水珠与琥珀反光里。",
    tags: ["瓶身特写", "冷凝水珠", "桂林山水"],
    image: "/images/liquan/concept-01.webp",
  },
  {
    title: "漓江，在琥珀中流动",
    description: "金色酒液与漓江水波交汇，像一场从酒中开始的夜游。",
    tags: ["琥珀酒液", "流动光影", "漓江夜色"],
    image: "/images/liquan/concept-02.webp",
  },
  {
    title: "塔影入杯",
    description: "日月双塔的灯火倒影，落入一杯微醺的夜色。",
    tags: ["酒杯倒影", "两江四湖", "夜色微醺"],
    image: "/images/liquan/concept-03.webp",
  },
] as const

export function BrandConcept() {
  return (
    <section id="concept" className="relative py-16 sm:py-20 lg:py-28 xl:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(206,159,82,0.08),transparent_22%)]" />
      <div className="divider-gold absolute inset-x-0 top-0" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={sectionReveal}
        className="relative mx-auto max-w-[92rem] px-5 sm:px-6 lg:px-10"
      >
        <motion.div variants={itemReveal} className="mx-auto max-w-3xl text-center">
          <p className="font-display text-[11px] tracking-[0.44em] text-[var(--brand-amber)]/80">
            BRAND CONCEPT
          </p>
          <h2 className="font-serif-cn mt-5 text-balance text-4xl font-medium leading-[1.12] text-[var(--brand-cream)] sm:text-5xl md:text-6xl">
            把桂林收进
            <span className="text-amber-gradient"> 琥珀光影里</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--brand-cream)]/68 sm:text-base">
            不再是功能卡片，而像三个被定格的品牌镜头。
            山水、酒液与灯火，依次完成这一口漓泉1998的情绪铺陈。
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
          {CONCEPTS.map((concept) => (
            <motion.article
              key={concept.title}
              variants={itemReveal}
              whileHover={{ y: -6 }}
              className="group glass-card relative overflow-hidden rounded-[24px] border border-[rgba(206,159,82,0.18)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={concept.image}
                  alt={concept.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(5,12,12,0.44)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,12,0.06)_0%,rgba(5,12,12,0.08)_42%,rgba(5,12,12,0.82)_100%)]" />
                <span className="gold-sweep group-hover:translate-x-[130%]" />
              </div>

              <div className="relative space-y-4 px-6 py-6">
                <div>
                  <p className="font-display text-[11px] tracking-[0.3em] text-[var(--brand-amber)]/68">
                    SCENE
                  </p>
                  <h3 className="font-serif-cn mt-3 text-2xl leading-tight text-[var(--brand-cream)]">
                    {concept.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-[var(--brand-cream)]/72">
                  {concept.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {concept.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[rgba(206,159,82,0.22)] bg-[rgba(206,159,82,0.06)] px-3 py-1 text-[11px] tracking-[0.14em] text-[var(--brand-cream)]/68"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
