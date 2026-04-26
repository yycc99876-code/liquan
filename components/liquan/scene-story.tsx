"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { itemReveal, revealViewport, sectionReveal } from "@/lib/liquan-motion"

const SHOTS = [
  {
    number: "01",
    title: "龙脊的风，吹进第一口清爽",
    image: "/images/liquan/shot-01.webp",
  },
  {
    number: "02",
    title: "桂花香落下，夜色开始微醺",
    image: "/images/liquan/shot-02.webp",
  },
  {
    number: "03",
    title: "阳朔西街，把碰杯声留到很晚",
    image: "/images/liquan/shot-03.webp",
  },
  {
    number: "04",
    title: "两江四湖的灯火，入席成欢",
    image: "/images/liquan/shot-04.webp",
  },
  {
    number: "05",
    title: "塔影未散，杯中的金色还亮着",
    image: "/images/liquan/shot-05.webp",
  },
  {
    number: "06",
    title: "一城山水，最后都回到这一口",
    image: "/images/liquan/shot-06.webp",
  },
] as const

export function SceneStory() {
  return (
    <section id="story" className="relative py-16 sm:py-20 lg:py-28 xl:py-32">
      <div className="divider-gold absolute inset-x-0 top-0" />
      <div className="pointer-events-none absolute inset-x-0 top-[13rem] hidden h-px story-grid-line lg:block" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={sectionReveal}
        className="relative mx-auto max-w-[92rem] px-5 sm:px-6 lg:px-10"
      >
        <motion.div variants={itemReveal} className="mx-auto max-w-3xl text-center">
          <p className="font-display text-[11px] tracking-[0.44em] text-[var(--brand-amber)]/82">
            SIX SHOTS / A GUILIN NIGHT
          </p>
          <h2 className="font-serif-cn mt-5 text-balance text-4xl font-medium leading-[1.1] text-[var(--brand-cream)] sm:text-5xl md:text-6xl">
            六个镜头，一场桂林夜游
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--brand-cream)]/70 sm:text-base">
            从梯田的风、桂花的香，到西街的灯火与碰杯声。
            每一个画面，都是漓泉1998把桂林夜色慢慢推向微醺的一格分镜。
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:mt-16 lg:gap-8">
          {SHOTS.map((shot) => (
            <motion.article
              key={shot.number}
              variants={itemReveal}
              whileHover={{ y: -4 }}
              className="group glass-card relative overflow-hidden rounded-[28px] p-4"
            >
              <div className="relative aspect-video overflow-hidden rounded-[22px]">
                <Image
                  src={shot.image}
                  alt={shot.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,12,0.08)_0%,rgba(5,12,12,0.16)_38%,rgba(5,12,12,0.74)_100%)]" />
              </div>

              <div className="px-2 pb-2 pt-5">
                <p className="font-display text-[11px] tracking-[0.34em] text-[var(--brand-amber)]/76">
                  {shot.number}
                </p>
                <h3 className="font-serif-cn mt-3 text-2xl leading-snug text-[var(--brand-cream)]">
                  {shot.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
