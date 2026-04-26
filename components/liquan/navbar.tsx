"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cinematicEase } from "@/lib/liquan-motion"

const NAV_LINKS = [
  { label: "品牌概念", href: "#concept" },
  { label: "产品视觉", href: "#product" },
  { label: "AI 酒友体验", href: "/ai" },
  { label: "品牌故事", href: "#story" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: cinematicEase }}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[rgba(206,159,82,0.16)] bg-[rgba(5,12,12,0.7)] backdrop-blur-2xl"
          : "border-b border-transparent bg-[rgba(5,12,12,0.28)] backdrop-blur-md",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-10">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-[0.2em] text-[var(--brand-cream)]">
            LIQUAN <span className="text-[var(--brand-amber)]">1998</span>
          </span>
          <span className="font-serif-cn mt-1.5 text-[11px] tracking-[0.32em] text-[var(--brand-amber)]/70">
            桂林山水 / 琥珀微醺
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[15px] tracking-wide text-[var(--brand-cream)]/80 transition-colors hover:text-[var(--brand-amber-light)]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--brand-amber)] transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            asChild
            className="h-11 rounded-full border border-[rgba(206,159,82,0.45)] bg-[rgba(206,159,82,0.05)] px-6 font-sans text-[15px] text-[var(--brand-amber-light)] hover:border-[var(--brand-amber)] hover:bg-[var(--brand-amber)]/12 hover:text-[var(--brand-amber-light)]"
          >
            <a href="/ai">
              <Sparkles className="mr-2 h-4 w-4" />
              开启 AI 酒友体验
            </a>
          </Button>
        </div>

        <button
          aria-label="打开菜单"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(217,154,53,0.3)] text-[var(--brand-cream)] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[rgba(206,159,82,0.18)] bg-[rgba(5,12,12,0.94)] backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-sm text-[var(--brand-cream)]/85 hover:bg-[var(--brand-amber)]/10 hover:text-[var(--brand-amber-light)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3">
                <Button
                  asChild
                  className="w-full rounded-full bg-[var(--brand-amber)] text-[var(--brand-night-1)] hover:bg-[var(--brand-amber-light)]"
                >
                  <a href="/ai" onClick={() => setOpen(false)}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    开启 AI 酒友体验
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
