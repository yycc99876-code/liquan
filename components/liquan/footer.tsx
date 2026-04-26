const NAV = [
  { label: "品牌概念", href: "#concept" },
  { label: "产品视觉", href: "#product" },
  { label: "AI 酒友体验", href: "#ai" },
  { label: "品牌故事", href: "#story" },
]

export function Footer() {
  return (
    <footer className="relative w-full border-t border-[var(--brand-amber)]/12 bg-[rgba(5,12,12,0.9)]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl tracking-[0.18em] text-[var(--brand-cream)]">
              LIQUAN <span className="text-[var(--brand-amber)]">1998</span>
            </p>
            <p className="font-serif-cn mt-2 text-xs tracking-[0.3em] text-[var(--brand-amber)]/70">
              桂林山水 / 琥珀微醺
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--brand-cream)]/70 transition-colors hover:text-[var(--brand-amber-light)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="divider-gold mt-10" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-[var(--brand-cream)]/45 md:flex-row md:items-center md:justify-between">
          <p>请理性饮酒，未成年人请勿饮酒。</p>
          <p className="font-display tracking-[0.18em]">
            A cinematic brand experience for LIQUAN 1998.
          </p>
        </div>
      </div>
    </footer>
  )
}
