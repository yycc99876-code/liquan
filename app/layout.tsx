import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

/**
 * 注意：Noto Sans SC / Noto Serif SC 这类中文字体在
 * `next/font/google` 中只能加载到 `latin` 子集，无法包含中文字形。
 * 所以这里改为通过 <link> 直接引入 Google Fonts 的 CSS，
 * Google 会自动按需切片中文字形（unicode-range 分包），
 * 既保证中文渲染正确，又不会一次性加载所有汉字。
 */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LIQUAN 1998 · 一口入桂林",
  description:
    "漓泉1998 AI 品牌互动体验站。把桂林装进漓泉里——象鼻山入瓶，漓江入酒，塔影入杯，夜色入席。",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${playfair.variable} bg-background`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
