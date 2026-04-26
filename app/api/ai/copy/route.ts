import { NextResponse } from "next/server"

type CopyPlatform = "moments" | "xiaohongshu" | "douyin"
type CopyTone = "relaxed" | "premium" | "funny" | "poetic"

type CopyRequest = {
  platform?: CopyPlatform
  tone?: CopyTone
  scene?: string
  keyword?: string
  userId?: string
}

type CopyItem = {
  platform: string
  text: string
}

const PLATFORM_LABELS: Record<CopyPlatform, string> = {
  moments: "朋友圈",
  xiaohongshu: "小红书",
  douyin: "抖音标题",
}

const TONE_LABELS: Record<CopyTone, string> = {
  relaxed: "松弛",
  premium: "高级",
  funny: "搞笑",
  poetic: "诗意",
}

export async function POST(request: Request) {
  let payload: CopyRequest

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "请求内容不是有效 JSON。" }, { status: 400 })
  }

  const platform = payload.platform || "moments"
  const tone = payload.tone || "relaxed"
  const scene = payload.scene || "江边夜风"
  const keyword = payload.keyword || "桂林"

  if (!payload.userId) {
    return NextResponse.json({ error: "缺少 userId。" }, { status: 400 })
  }

  if (!process.env.DEEPSEEK_API_KEY || process.env.AI_PROVIDER === "mock") {
    return NextResponse.json({
      copies: createMockCopies(platform, tone, scene, keyword),
      source: "mock",
    })
  }

  try {
    const copies = await callDeepSeekForCopy(platform, tone, scene, keyword)
    return NextResponse.json({ copies, source: "deepseek" })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "文案生成失败，请稍后重试。",
      },
      { status: 502 },
    )
  }
}

async function callDeepSeekForCopy(
  platform: CopyPlatform,
  tone: CopyTone,
  scene: string,
  keyword: string,
) {
  const baseUrl = process.env.DEEPSEEK_API_BASE_URL || "https://api.deepseek.com"
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash"

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.78,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content:
            "你是漓泉1998的中文社交文案助手。文案要自然、有桂林夜色、琥珀微醺、朋友相聚的氛围，不要硬广，不劝酒，不鼓励过量饮酒。只输出严格 JSON。",
        },
        {
          role: "user",
          content: [
            `平台：${PLATFORM_LABELS[platform]}`,
            `语气：${TONE_LABELS[tone]}`,
            `场景：${scene}`,
            `关键词：${keyword}`,
            "请生成 5 条可直接发布的中文文案。",
            '返回 JSON：{"copies":[{"platform":"平台名","text":"文案"}]}',
            "不要 Markdown，不要代码块，不要额外解释。",
          ].join("\n"),
        },
      ],
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`DeepSeek 请求失败：${response.status} ${detail.slice(0, 300)}`)
  }

  const data = await response.json()
  const answer = String(data.choices?.[0]?.message?.content || "").trim()
  const parsed = parseCopies(answer)
  if (!parsed.length) {
    throw new Error("AI 没有返回可用文案，请重试。")
  }
  return parsed
}

function parseCopies(answer: string): CopyItem[] {
  const match = answer.match(/\{[\s\S]*"copies"[\s\S]*\}/)
  if (!match) {
    return []
  }

  try {
    const parsed = JSON.parse(match[0]) as { copies?: CopyItem[] }
    return Array.isArray(parsed.copies)
      ? parsed.copies
          .filter((item) => item?.text)
          .map((item) => ({
            platform: String(item.platform || "文案"),
            text: String(item.text),
          }))
          .slice(0, 5)
      : []
  } catch {
    return []
  }
}

function createMockCopies(
  platform: CopyPlatform,
  tone: CopyTone,
  scene: string,
  keyword: string,
): CopyItem[] {
  const label = PLATFORM_LABELS[platform]
  const toneLabel = TONE_LABELS[tone]
  return [
    `今晚不赶路，只把${keyword}和漓泉1998留在杯沿。`,
    `${scene}刚好，冰镇刚好，朋友也刚好。`,
    `桂林的夜色不必说满，一口琥珀微醺就够了。`,
    `山水在远处，灯火在眼前，漓泉1998在这一桌。`,
    tone === "funny"
      ? `本来只想吃点夜宵，结果被桂林的风和这杯漓泉留住了。`
      : `把今晚交给${scene}，把微醺交给漓泉1998。`,
  ].map((text) => ({ platform: `${label} · ${toneLabel}`, text }))
}
