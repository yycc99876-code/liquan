"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import NextImage from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Bomb,
  Camera,
  Clipboard,
  Download,
  FileText,
  ImageIcon,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type ToolMode = "copy" | "photo" | "bomb"
type CopyPlatform = "moments" | "xiaohongshu" | "douyin"
type CopyTone = "relaxed" | "premium" | "funny" | "poetic"
type PhotoStyle =
  | "guilin-night"
  | "amber-tipsy"
  | "riverside-light"
  | "natural-moments"
  | "bbq-midnight"
  | "friends-toast"
  | "product-closeup"
  | "festival-table"
  | "street-snack"
  | "ktv-party"
  | "home-dinner"
  | "guilin-travel"
  | "couple-date"
  | "late-night-alone"

type CopyItem = {
  platform: string
  text: string
}

type PhotoResult = {
  imageUrl: string
  captions: string[]
  source: "dashscope" | "mock"
}

type Balloon = {
  id: number
  bomb: boolean
  opened: boolean
}

const PLATFORM_OPTIONS: { label: string; value: CopyPlatform }[] = [
  { label: "朋友圈", value: "moments" },
  { label: "小红书", value: "xiaohongshu" },
  { label: "抖音标题", value: "douyin" },
]

const TONE_OPTIONS: { label: string; value: CopyTone }[] = [
  { label: "松弛", value: "relaxed" },
  { label: "高级", value: "premium" },
  { label: "搞笑", value: "funny" },
  { label: "诗意", value: "poetic" },
]

const SCENE_OPTIONS = ["江边夜风", "烧烤夜宵", "朋友小聚", "旅行途中"]
const KEYWORD_OPTIONS = ["桂林", "漓江", "琥珀微醺", "朋友"]

const PHOTO_STYLE_OPTIONS: { label: string; value: PhotoStyle }[] = [
  { label: "桂林夜色", value: "guilin-night" },
  { label: "琥珀微醺", value: "amber-tipsy" },
  { label: "江边灯火", value: "riverside-light" },
  { label: "烧烤夜宵", value: "bbq-midnight" },
  { label: "朋友碰杯", value: "friends-toast" },
  { label: "产品特写", value: "product-closeup" },
  { label: "热闹饭桌", value: "festival-table" },
  { label: "街边小摊", value: "street-snack" },
  { label: "KTV聚会", value: "ktv-party" },
  { label: "家中小酌", value: "home-dinner" },
  { label: "桂林旅行", value: "guilin-travel" },
  { label: "两人约会", value: "couple-date" },
  { label: "深夜独饮", value: "late-night-alone" },
  { label: "朋友圈自然感", value: "natural-moments" },
]

const PHOTO_LOADING_STEPS = [
  "识别照片情景中",
  "调整桂林夜色光影",
  "生成朋友圈配文",
]

export function AiExperience() {
  const [activeMode, setActiveMode] = useState<ToolMode>("copy")

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(206,159,82,0.16),transparent_26%),linear-gradient(180deg,#04110f_0%,#071715_45%,#040707_100%)] text-[var(--brand-cream)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-6 lg:px-10">
        <header className="flex items-center justify-between gap-4 border-b border-[rgba(206,159,82,0.18)] pb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--brand-cream)]/72 transition-colors hover:text-[var(--brand-amber-light)]"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
          <div className="text-right leading-none">
            <p className="font-display text-xl tracking-[0.2em]">
              LIQUAN <span className="text-[var(--brand-amber)]">1998</span>
            </p>
            <p className="mt-1.5 text-[11px] tracking-[0.28em] text-[var(--brand-amber)]/72">
              AI 酒友小工具
            </p>
          </div>
        </header>

        <section className="grid min-w-0 flex-1 gap-8 py-8 lg:grid-cols-[0.72fr_1fr] lg:items-start lg:gap-10">
          <aside className="min-w-0 lg:sticky lg:top-8">
            <p className="font-display text-[11px] tracking-[0.42em] text-[var(--brand-amber)]/82">
              TABLESIDE AI TOOLS
            </p>
            <h1 className="font-serif-cn mt-5 text-balance text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              这一桌，交给 AI 添点兴致
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-[var(--brand-cream)]/70 sm:text-base">
              写一句能发的微醺文案，美化一张今晚照片，或者开一局炸弹气球。漓泉1998不止在杯里，也在这一刻的气氛里。
            </p>

            <div className="glass-card mt-7 flex items-center gap-4 rounded-[22px] p-4">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[16px] border border-[rgba(206,159,82,0.18)] bg-[rgba(5,12,12,0.3)]">
                <NextImage
                  src="/images/liquan/product-main.webp"
                  alt="漓泉1998 产品视觉"
                  fill
                  sizes="80px"
                  className="scale-125 object-contain"
                />
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.28em] text-[var(--brand-amber)]/72">
                  LIQUAN 1998
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-cream)]/68">
                  清爽麦香，冰镇刚好。AI 小工具围绕这一瓶，把照片、文案和桌边互动串起来。
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <ModeNote
                icon={FileText}
                title="生成文案"
                text="朋友圈、小红书、短视频标题，一键换出桂林微醺感。"
              />
              <ModeNote
                icon={Camera}
                title="照片美化"
                text="上传桌边照片，生成适合朋友圈的夜色氛围图。"
              />
              <ModeNote
                icon={Bomb}
                title="炸弹气球"
                text="50 个气球轮流戳，命中炸弹就按你们自己的规则来。"
              />
            </div>
          </aside>

          <div className="glass-card-strong min-w-0 overflow-hidden rounded-[28px] p-4 sm:p-6 lg:p-8">
            <Tabs
              value={activeMode}
              onValueChange={(value) => setActiveMode(value as ToolMode)}
              className="min-w-0 gap-6"
            >
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-[18px] border border-[rgba(206,159,82,0.2)] bg-[rgba(5,12,12,0.44)] p-1">
                <TabsTrigger value="copy" className={tabClassName}>
                  文案
                </TabsTrigger>
                <TabsTrigger value="photo" className={tabClassName}>
                  照片
                </TabsTrigger>
                <TabsTrigger value="bomb" className={tabClassName}>
                  气球
                </TabsTrigger>
              </TabsList>

              <TabsContent value="copy" className="mt-0">
                <CopyTool />
              </TabsContent>
              <TabsContent value="photo" className="mt-0 min-w-0">
                <PhotoBeautifyTool />
              </TabsContent>
              <TabsContent value="bomb" className="mt-0">
                <BombBalloonGame />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <footer className="border-t border-[rgba(206,159,82,0.16)] py-5 text-center text-xs tracking-[0.16em] text-[var(--brand-cream)]/48">
          请理性饮酒，未成年人请勿饮酒。
        </footer>
      </div>
    </main>
  )
}

function CopyTool() {
  const [platform, setPlatform] = useState<CopyPlatform>("moments")
  const [tone, setTone] = useState<CopyTone>("relaxed")
  const [scene, setScene] = useState("江边夜风")
  const [keyword, setKeyword] = useState("桂林")
  const [copies, setCopies] = useState<CopyItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number>()

  async function handleGenerate() {
    setError("")
    setCopiedIndex(undefined)
    setLoading(true)

    try {
      const response = await fetch("/api/ai/copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          tone,
          scene,
          keyword,
          userId: getUserId(),
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "文案生成失败，请重试。")
      }
      setCopies(data.copies || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "文案生成失败，请重试。")
    } finally {
      setLoading(false)
    }
  }

  async function copyText(text: string, index: number) {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
  }

  return (
    <ToolShell
      eyebrow="COPY ATELIER"
      title="生成一组能直接发的微醺文案"
      description="选择平台、语气、场景和关键词，让 AI 写出更贴合漓泉1998的桂林夜色文案。"
    >
      <div className="space-y-6">
        <OptionGroup label="发布平台">
          {PLATFORM_OPTIONS.map((option) => (
            <ChoiceButton
              key={option.value}
              active={platform === option.value}
              onClick={() => setPlatform(option.value)}
            >
              {option.label}
            </ChoiceButton>
          ))}
        </OptionGroup>
        <OptionGroup label="文案语气">
          {TONE_OPTIONS.map((option) => (
            <ChoiceButton
              key={option.value}
              active={tone === option.value}
              onClick={() => setTone(option.value)}
            >
              {option.label}
            </ChoiceButton>
          ))}
        </OptionGroup>
        <OptionGroup label="今晚场景">
          {SCENE_OPTIONS.map((option) => (
            <ChoiceButton
              key={option}
              active={scene === option}
              onClick={() => setScene(option)}
            >
              {option}
            </ChoiceButton>
          ))}
        </OptionGroup>
        <OptionGroup label="关键词">
          {KEYWORD_OPTIONS.map((option) => (
            <ChoiceButton
              key={option}
              active={keyword === option}
              onClick={() => setKeyword(option)}
            >
              {option}
            </ChoiceButton>
          ))}
        </OptionGroup>

        {error ? <ErrorNotice message={error} /> : null}

        <Button
          onClick={handleGenerate}
          disabled={loading}
          size="lg"
          className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#f0cb86_0%,#ce9f52_56%,#a26a2a_100%)] px-7 text-[var(--brand-night-1)] shadow-[0_16px_48px_rgba(206,159,82,0.24)] hover:brightness-105 sm:w-auto"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          生成文案
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {copies.length ? (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-[11px] tracking-[0.28em] text-[var(--brand-amber)]/72">
                  COPY READY
                </p>
                <p className="mt-2 text-sm text-[var(--brand-cream)]/66">
                  今晚的文案已备好
                </p>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={loading}
                variant="outline"
                className="rounded-full border-[rgba(206,159,82,0.35)] bg-transparent text-[var(--brand-amber-light)] hover:bg-[rgba(206,159,82,0.1)] hover:text-[var(--brand-amber-light)]"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                换一组
              </Button>
            </div>
            {copies.map((item, index) => (
              <article
                key={`${item.platform}-${index}`}
                className="rounded-[20px] border border-[rgba(206,159,82,0.18)] bg-[rgba(5,12,12,0.26)] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge className="border border-[rgba(206,159,82,0.28)] bg-[rgba(206,159,82,0.08)] text-[var(--brand-amber-light)]">
                    {item.platform}
                  </Badge>
                  <Button
                    onClick={() => copyText(item.text, index)}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-[rgba(206,159,82,0.35)] bg-transparent text-[var(--brand-amber-light)] hover:bg-[rgba(206,159,82,0.1)] hover:text-[var(--brand-amber-light)]"
                  >
                    <Clipboard className="h-3.5 w-3.5" />
                    {copiedIndex === index ? "已复制" : "复制"}
                  </Button>
                </div>
                <p className="font-serif-cn mt-4 text-lg leading-relaxed text-[var(--brand-cream)]/92">
                  {item.text}
                </p>
              </article>
            ))}
          </>
        ) : (
          <EmptyState icon={FileText} text="生成后，这里会出现 3-5 条可复制文案。" />
        )}
      </div>
    </ToolShell>
  )
}

function PhotoBeautifyTool() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [style, setStyle] = useState<PhotoStyle>("guilin-night")
  const [photoNote, setPhotoNote] = useState("")
  const [preview, setPreview] = useState("")
  const [imageBase64, setImageBase64] = useState("")
  const [result, setResult] = useState<PhotoResult>()
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [error, setError] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number>()

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0)
      return
    }

    const timer = window.setInterval(() => {
      setLoadingStep((current) =>
        Math.min(current + 1, PHOTO_LOADING_STEPS.length - 1),
      )
    }, 2200)

    return () => window.clearInterval(timer)
  }, [loading])

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setError("")
    setResult(undefined)

    try {
      const compressed = await compressImage(file)
      setPreview(compressed)
      setImageBase64(compressed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "图片读取失败，请换一张试试。")
    }
  }

  async function handleBeautify() {
    if (!imageBase64) {
      setError("请先拍照或上传一张照片。")
      return
    }

    setError("")
    setCopiedIndex(undefined)
    setLoading(true)

    try {
      const response = await fetch("/api/ai/photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, style, photoNote }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "照片美化失败，请重试。")
      }
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "照片美化失败，请重试。")
    } finally {
      setLoading(false)
    }
  }

  async function copyCaption(text: string, index: number) {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
  }

  return (
    <ToolShell
      eyebrow="PHOTO POLISH"
      title="把今晚的照片修成朋友圈氛围图"
      description="上传桌边照片，选择具体场景。AI 会保留真实人物和构图，并按不同场景调整色调、光源和氛围。"
    >
      <div className="space-y-6">
        <OptionGroup label="美化风格">
          <div className="w-full min-w-0 overflow-x-auto pb-1">
            <div className="flex w-max gap-2 pr-1">
              {PHOTO_STYLE_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.value}
                  active={style === option.value}
                  onClick={() => setStyle(option.value)}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
          </div>
        </OptionGroup>

        <div>
          <label className="text-sm tracking-[0.16em] text-[var(--brand-cream)]/62">
            想表达什么（可选）
          </label>
          <Textarea
            value={photoNote}
            onChange={(event) => setPhotoNote(event.target.value)}
            className="mt-3 min-h-24 resize-none border-[rgba(206,159,82,0.22)] bg-[rgba(5,12,12,0.38)] text-[var(--brand-cream)] placeholder:text-[var(--brand-cream)]/35 focus-visible:ring-[rgba(206,159,82,0.35)]"
            placeholder="可以补一句你想表达的感觉，比如：老朋友很久没见，今晚想发得松弛一点。"
          />
          <p className="mt-2 text-xs leading-relaxed text-[var(--brand-cream)]/44">
            AI 会先识别照片情景，再结合这里的补充生成配文。
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="grid min-w-0 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-[20rem] min-w-0 flex-col items-center justify-center overflow-hidden rounded-[22px] border border-dashed border-[rgba(206,159,82,0.32)] bg-[rgba(5,12,12,0.22)] p-3 text-center transition-colors hover:border-[rgba(206,159,82,0.55)] sm:h-[22rem] sm:p-4"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="原始预览"
                className="h-full max-h-full w-full rounded-[18px] object-contain"
              />
            ) : (
              <>
                <ImageIcon className="h-9 w-9 text-[var(--brand-amber)]/72" />
                <p className="mt-4 text-sm text-[var(--brand-cream)]/72">
                  点击拍照或上传照片
                </p>
                <p className="mt-2 text-xs text-[var(--brand-cream)]/44">
                  上传前会自动压缩到适合处理的尺寸
                </p>
              </>
            )}
          </button>

          <div className="flex h-[20rem] min-w-0 flex-col justify-center overflow-hidden rounded-[22px] border border-[rgba(245,239,223,0.08)] bg-[rgba(5,12,12,0.22)] p-3 sm:h-[22rem] sm:p-4">
            {result?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.imageUrl}
                alt="AI 美化结果"
                className="h-full max-h-full w-full rounded-[18px] object-contain"
              />
            ) : (
              <EmptyState
                icon={Camera}
                text="美化完成后，这里会显示适合朋友圈发布的结果图。"
              />
            )}
          </div>
        </div>

        <p className="rounded-2xl border border-[rgba(206,159,82,0.18)] bg-[rgba(206,159,82,0.06)] px-4 py-3 text-xs leading-relaxed text-[var(--brand-cream)]/58">
          生成图只在当前结果中展示，离开或刷新后可能无法找回，请完成后及时保存。
        </p>

        {error ? <ErrorNotice message={error} /> : null}
        {loading ? (
          <div className="rounded-2xl border border-[rgba(206,159,82,0.24)] bg-[rgba(5,12,12,0.3)] px-4 py-3">
            <div className="flex items-center gap-3 text-sm text-[var(--brand-amber-light)]">
              <Loader2 className="h-4 w-4 animate-spin" />
              {PHOTO_LOADING_STEPS[loadingStep]}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[rgba(245,239,223,0.08)]">
              <div
                className="h-full rounded-full bg-[var(--brand-amber)] transition-all duration-500"
                style={{
                  width: `${((loadingStep + 1) / PHOTO_LOADING_STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : null}

        <Button
          onClick={handleBeautify}
          disabled={loading || !imageBase64}
          size="lg"
          className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#f0cb86_0%,#ce9f52_56%,#a26a2a_100%)] px-7 text-[var(--brand-night-1)] shadow-[0_16px_48px_rgba(206,159,82,0.24)] hover:brightness-105 sm:w-auto"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          AI 美化照片
        </Button>
      </div>

      {result?.imageUrl ? (
        <div className="mt-6 min-w-0 rounded-[20px] border border-[rgba(206,159,82,0.18)] bg-[rgba(5,12,12,0.26)] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-display text-[11px] tracking-[0.28em] text-[var(--brand-amber)]/72">
                PHOTO READY
              </p>
              <p className="mt-2 text-sm text-[var(--brand-cream)]/66">
                这张图可以保存发朋友圈了
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full shrink-0 justify-center rounded-full border-[rgba(206,159,82,0.35)] bg-transparent text-[var(--brand-amber-light)] hover:bg-[rgba(206,159,82,0.1)] hover:text-[var(--brand-amber-light)] sm:w-auto"
            >
              <a href={result.imageUrl} download target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" />
                下载图片
              </a>
            </Button>
          </div>
        </div>
      ) : null}

      {result?.captions?.length ? (
        <div className="mt-6 space-y-3">
          <p className="font-display text-[11px] tracking-[0.28em] text-[var(--brand-amber)]/72">
            CAPTIONS READY
          </p>
          {result.captions.map((caption, index) => (
            <article
              key={caption}
              className="min-w-0 rounded-[20px] border border-[rgba(206,159,82,0.18)] bg-[rgba(5,12,12,0.26)] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <Badge className="border border-[rgba(206,159,82,0.28)] bg-[rgba(206,159,82,0.08)] text-[var(--brand-amber-light)]">
                  配图文案
                </Badge>
                <Button
                  onClick={() => copyCaption(caption, index)}
                  variant="outline"
                  size="sm"
                  className="shrink-0 rounded-full border-[rgba(206,159,82,0.35)] bg-transparent text-[var(--brand-amber-light)] hover:bg-[rgba(206,159,82,0.1)] hover:text-[var(--brand-amber-light)]"
                >
                  <Clipboard className="h-3.5 w-3.5" />
                  {copiedIndex === index ? "已复制" : "复制"}
                </Button>
              </div>
              <p className="font-serif-cn mt-4 break-words text-lg leading-relaxed text-[var(--brand-cream)]/92">
                {caption}
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </ToolShell>
  )
}

function BombBalloonGame() {
  const [balloonCount, setBalloonCount] = useState(50)
  const [bombCount, setBombCount] = useState(5)
  const [balloonSize, setBalloonSize] = useState<"compact" | "standard" | "large">(
    "standard",
  )
  const [playerText, setPlayerText] = useState("玩家1\n玩家2\n玩家3")
  const players = useMemo(
    () =>
      playerText
        .split(/\n|,|，/)
        .map((name) => name.trim())
        .filter(Boolean),
    [playerText],
  )
  const displayPlayers = players.length ? players : ["玩家1", "玩家2"]
  const [balloons, setBalloons] = useState<Balloon[]>(() =>
    createBalloons(50, 5),
  )
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [lastHit, setLastHit] = useState<{
    player: string
    bomb: boolean
    index: number
  }>()

  const openedCount = balloons.filter((balloon) => balloon.opened).length
  const hitBombs = balloons.filter(
    (balloon) => balloon.opened && balloon.bomb,
  ).length
  const remainingBombs = Math.min(bombCount, balloonCount) - hitBombs

  useEffect(() => {
    startNewGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentPlayer >= displayPlayers.length) {
      setCurrentPlayer(0)
    }
  }, [currentPlayer, displayPlayers.length])

  function startNewGame() {
    const safeBalloonCount = clampBalloonCount(balloonCount)
    const safeBombCount = clampBombCount(bombCount, safeBalloonCount)
    setBalloonCount(safeBalloonCount)
    setBombCount(safeBombCount)
    setBalloons(createBalloons(safeBalloonCount, safeBombCount))
    setCurrentPlayer(0)
    setLastHit(undefined)
  }

  function openBalloon(id: number) {
    const target = balloons.find((balloon) => balloon.id === id)
    if (!target || target.opened) {
      return
    }

    const player = displayPlayers[currentPlayer % displayPlayers.length]
    setBalloons((current) =>
      current.map((balloon) =>
        balloon.id === id ? { ...balloon, opened: true } : balloon,
      ),
    )
    setLastHit({ player, bomb: target.bomb, index: id + 1 })
    setCurrentPlayer((value) => (value + 1) % displayPlayers.length)
  }

  return (
    <ToolShell
      eyebrow="BOMB BALLOON"
      title={`${balloonCount} 个气球，轮流戳，看看谁碰到炸弹`}
      description="设置气球数量、炸弹数量和玩家，手机放在桌上轮流点。命中炸弹后，按你们自己的桌边规则执行。"
    >
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <div className="rounded-[20px] border border-[rgba(245,239,223,0.08)] bg-[rgba(5,12,12,0.24)] p-4">
            <label className="text-sm tracking-[0.14em] text-[var(--brand-cream)]/62">
              气球数量：{balloonCount}
            </label>
            <Input
              type="range"
              min={10}
              max={80}
              value={balloonCount}
              onChange={(event) => {
                const nextCount = Number(event.target.value)
                setBalloonCount(nextCount)
                setBombCount((current) => clampBombCount(current, nextCount))
              }}
              className="mt-3 accent-[var(--brand-amber)]"
            />
            <div className="mt-3 flex gap-2">
              {[30, 50, 80].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    setBalloonCount(count)
                    setBombCount((current) => clampBombCount(current, count))
                  }}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    balloonCount === count
                      ? "border-[rgba(206,159,82,0.7)] bg-[rgba(206,159,82,0.15)] text-[var(--brand-amber-light)]"
                      : "border-[rgba(245,239,223,0.12)] text-[var(--brand-cream)]/60",
                  )}
                >
                  {count} 个
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--brand-cream)]/46">
              调整后点击“应用设置并开局”生效。
            </p>
          </div>

          <div className="rounded-[20px] border border-[rgba(245,239,223,0.08)] bg-[rgba(5,12,12,0.24)] p-4">
            <label className="text-sm tracking-[0.14em] text-[var(--brand-cream)]/62">
              炸弹数量：{bombCount}
            </label>
            <Input
              type="range"
              min={1}
              max={Math.min(15, balloonCount)}
              value={bombCount}
              onChange={(event) =>
                setBombCount(clampBombCount(Number(event.target.value), balloonCount))
              }
              className="mt-3 accent-[var(--brand-amber)]"
            />
            <p className="mt-2 text-xs text-[var(--brand-cream)]/46">
              炸弹最多 15 个，且不能超过气球数量。
            </p>
          </div>

          <div className="rounded-[20px] border border-[rgba(245,239,223,0.08)] bg-[rgba(5,12,12,0.24)] p-4">
            <label className="text-sm tracking-[0.14em] text-[var(--brand-cream)]/62">
              玩家名单
            </label>
            <Textarea
              value={playerText}
              onChange={(event) => {
                setPlayerText(event.target.value)
                setCurrentPlayer(0)
                setLastHit(undefined)
              }}
              className="mt-3 min-h-28 resize-none border-[rgba(206,159,82,0.22)] bg-[rgba(5,12,12,0.38)] text-[var(--brand-cream)] focus-visible:ring-[rgba(206,159,82,0.35)]"
              placeholder="每行一个玩家"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {displayPlayers.map((player, index) => (
                <span
                  key={`${player}-${index}`}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs",
                    index === currentPlayer
                      ? "border-[rgba(206,159,82,0.65)] bg-[rgba(206,159,82,0.14)] text-[var(--brand-amber-light)]"
                      : "border-[rgba(245,239,223,0.12)] text-[var(--brand-cream)]/58",
                  )}
                >
                  {player}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Stat label="当前玩家" value={displayPlayers[currentPlayer]} />
            <Stat label="已戳气球" value={`${openedCount}/${balloons.length}`} />
            <Stat label="剩余炸弹" value={`${Math.max(remainingBombs, 0)}`} />
            <Stat label="已命中" value={`${hitBombs}`} />
          </div>

          <div className="rounded-[20px] border border-[rgba(245,239,223,0.08)] bg-[rgba(5,12,12,0.24)] p-4">
            <p className="text-sm tracking-[0.14em] text-[var(--brand-cream)]/62">
              手机气球大小
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { label: "紧凑", value: "compact" },
                { label: "标准", value: "standard" },
                { label: "大气球", value: "large" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setBalloonSize(option.value as "compact" | "standard" | "large")
                  }
                  className={cn(
                    "rounded-full border px-3 py-2 text-xs transition-colors",
                    balloonSize === option.value
                      ? "border-[rgba(206,159,82,0.7)] bg-[rgba(206,159,82,0.15)] text-[var(--brand-amber-light)]"
                      : "border-[rgba(245,239,223,0.12)] text-[var(--brand-cream)]/60",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {lastHit ? (
            <div
              className={cn(
                "rounded-[20px] border p-4",
                lastHit.bomb
                  ? "border-[rgba(196,106,34,0.48)] bg-[rgba(196,106,34,0.12)]"
                  : "border-[rgba(206,159,82,0.24)] bg-[rgba(206,159,82,0.08)]",
              )}
            >
              <p className="text-sm text-[var(--brand-cream)]/82">
                {lastHit.player} 戳开了第 {lastHit.index} 个气球
              </p>
              <p className="font-serif-cn mt-2 text-2xl text-[var(--brand-cream)]">
                {lastHit.bomb
                  ? "命中炸弹，按你们自己的桌边规则执行。"
                  : "安全，下一位继续。"}
              </p>
            </div>
          ) : null}

          <Button
            onClick={startNewGame}
            variant="outline"
            className="h-11 w-full rounded-full border-[rgba(206,159,82,0.35)] bg-transparent text-[var(--brand-amber-light)] hover:bg-[rgba(206,159,82,0.1)] hover:text-[var(--brand-amber-light)]"
          >
            <RefreshCw className="h-4 w-4" />
            应用设置并开局
          </Button>
        </div>

        <div className="rounded-[22px] border border-[rgba(245,239,223,0.08)] bg-[rgba(5,12,12,0.22)] p-3 sm:p-4">
          <div
            className={cn(
              "grid gap-2 sm:gap-3",
              balloonSize === "large"
                ? "grid-cols-4 sm:grid-cols-5"
                : balloonSize === "compact"
                  ? "grid-cols-6 sm:grid-cols-8"
                  : "grid-cols-5 sm:grid-cols-6",
            )}
          >
            {balloons.map((balloon) => (
              <button
                key={balloon.id}
                type="button"
                disabled={balloon.opened}
                onClick={() => openBalloon(balloon.id)}
                aria-label={`气球 ${balloon.id + 1}`}
                className={cn(
                  "aspect-square rounded-full border text-xl transition-all duration-200 sm:text-2xl",
                  balloon.opened && balloon.bomb
                    ? "border-[rgba(196,106,34,0.8)] bg-[rgba(196,106,34,0.26)]"
                    : balloon.opened
                      ? "border-[rgba(206,159,82,0.24)] bg-[rgba(245,239,223,0.08)] opacity-60"
                      : "border-[rgba(206,159,82,0.28)] bg-[radial-gradient(circle_at_35%_28%,rgba(245,239,223,0.42),rgba(206,159,82,0.72)_38%,rgba(141,87,29,0.86)_100%)] shadow-[0_8px_22px_rgba(0,0,0,0.24)] hover:scale-105",
                )}
              >
                {balloon.opened ? (balloon.bomb ? "✹" : "") : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  )
}

function ToolShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-[22px] border border-[rgba(245,239,223,0.08)] bg-[rgba(5,12,12,0.26)] p-4 sm:p-5">
      <p className="font-display text-[11px] tracking-[0.34em] text-[var(--brand-amber)]/78">
        {eyebrow}
      </p>
      <h2 className="font-serif-cn mt-3 text-3xl leading-tight text-[var(--brand-cream)]">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--brand-cream)]/66">
        {description}
      </p>
      <div className="mt-6 min-w-0">{children}</div>
    </section>
  )
}

function OptionGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="min-w-0">
      <p className="text-sm tracking-[0.16em] text-[var(--brand-cream)]/62">
        {label}
      </p>
      <div className="mt-3 flex min-w-0 flex-wrap gap-3">{children}</div>
    </div>
  )
}

function ChoiceButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-300",
        active
          ? "border-[rgba(206,159,82,0.72)] bg-[rgba(206,159,82,0.16)] text-[var(--brand-amber-light)]"
          : "border-[rgba(245,239,223,0.1)] bg-[rgba(8,16,15,0.22)] text-[var(--brand-cream)]/72 hover:border-[rgba(206,159,82,0.4)] hover:bg-[rgba(206,159,82,0.06)]",
      )}
    >
      {children}
    </button>
  )
}

function ModeNote({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType
  title: string
  text: string
}) {
  return (
    <div className="rounded-[18px] border border-[rgba(206,159,82,0.18)] bg-[rgba(5,12,12,0.24)] p-4">
      <Icon className="h-5 w-5 text-[var(--brand-amber)]" />
      <p className="mt-3 text-sm font-medium text-[var(--brand-cream)]">
        {title}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-[var(--brand-cream)]/56">
        {text}
      </p>
    </div>
  )
}

function EmptyState({
  icon: Icon,
  text,
}: {
  icon: React.ElementType
  text: string
}) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center rounded-[20px] border border-dashed border-[rgba(206,159,82,0.26)] bg-[rgba(5,12,12,0.18)] p-6 text-center">
      <Icon className="h-8 w-8 text-[var(--brand-amber)]/70" />
      <p className="mt-4 text-sm leading-relaxed text-[var(--brand-cream)]/62">
        {text}
      </p>
    </div>
  )
}

function ErrorNotice({ message }: { message: string }) {
  return (
    <p className="rounded-2xl border border-[rgba(196,106,34,0.35)] bg-[rgba(196,106,34,0.1)] px-4 py-3 text-sm text-[var(--brand-cream)]/84">
      {message}
    </p>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[rgba(206,159,82,0.16)] bg-[rgba(5,12,12,0.26)] p-3">
      <p className="text-[11px] tracking-[0.18em] text-[var(--brand-cream)]/44">
        {label}
      </p>
      <p className="mt-2 text-base font-medium text-[var(--brand-cream)]">
        {value}
      </p>
    </div>
  )
}

function createBalloons(balloonCount: number, bombCount: number) {
  const bombs = new Set<number>()
  while (bombs.size < bombCount) {
    bombs.add(Math.floor(Math.random() * balloonCount))
  }

  return Array.from({ length: balloonCount }, (_, id) => ({
    id,
    bomb: bombs.has(id),
    opened: false,
  }))
}

function clampBalloonCount(value: number) {
  return Math.min(80, Math.max(10, Math.round(value)))
}

function clampBombCount(value: number, balloonCount: number) {
  return Math.min(15, balloonCount, Math.max(1, Math.round(value)))
}

function getUserId() {
  const key = "liquan-ai-user-id"
  const existing = window.localStorage.getItem(key)
  if (existing) {
    return existing
  }

  const userId = `liquan-${crypto.randomUUID()}`
  window.localStorage.setItem(key, userId)
  return userId
}

async function compressImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("请上传图片文件。")
  }

  const imageUrl = URL.createObjectURL(file)
  const image = await loadImage(imageUrl)
  URL.revokeObjectURL(imageUrl)

  const maxSide = 1600
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height))
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("当前浏览器无法处理图片。")
  }

  context.drawImage(image, 0, 0, width, height)
  return canvas.toDataURL("image/jpeg", 0.86)
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("图片加载失败，请换一张试试。"))
    image.src = src
  })
}

const tabClassName =
  "h-11 rounded-[14px] text-sm text-[var(--brand-cream)]/70 data-[state=active]:bg-[rgba(206,159,82,0.16)] data-[state=active]:text-[var(--brand-amber-light)] data-[state=active]:shadow-none"
