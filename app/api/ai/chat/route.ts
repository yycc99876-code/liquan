import { NextResponse } from "next/server"

type AiMode = "recommend" | "companion" | "icebreaker"
type AiSource = "mock" | "deepseek"

type ChatRequest = {
  mode?: AiMode
  message?: string
  selections?: {
    scene?: string
    mood?: string
    party?: string
    taste?: string
    goal?: string
  }
  conversationId?: string
  userId?: string
}

type RecommendationCard = {
  title: string
  tags: string[]
  reason: string
  toastLine: string
  shareCopy: string
}

type ChatResponse = {
  answer: string
  conversationId?: string
  messageId?: string
  card?: RecommendationCard
  source: AiSource
}

const MODES: AiMode[] = ["recommend", "companion", "icebreaker"]

const SYSTEM_PROMPT = `你是“漓泉1998 AI 酒友”，一个有桂林本地朋友感、轻松、克制、有审美的品牌互动助手。

你服务于“LIQUAN 1998 · 一口入桂林”品牌互动网站。你的目标不是单纯聊天，而是帮助用户生成适合今晚的漓泉1998体验内容：专属推荐、轻松陪聊、酒局破冰。

人格与表达：
- 像一个懂桂林夜色、懂朋友小聚的本地朋友。
- 语气自然、松弛、亲近，不像客服。
- 可以使用桂林、漓江、江边夜风、山水、灯火、琥珀酒液、微醺、朋友等意象。
- 不要浮夸，不要土味营销，不要喊口号。
- 高级但不要端着，温柔但不要油腻。
- 内容适合直接展示在网页上。

模式规则：
- mode = recommend：生成今晚专属推荐，包含今晚喝法、场景搭配、一句话推荐、分享文案。
- mode = companion：像朋友一样回应用户当前状态，轻轻接住情绪，可以给一点轻松建议，但不要说教。
- mode = icebreaker：生成酒局破冰内容，包含祝酒词、聊天话题、简单桌边小游戏、拍照或朋友圈文案。

安全边界：
- 必须坚持理性饮酒。
- 不劝酒、不拼酒、不鼓励过量饮酒。
- 不面向未成年人推荐饮酒。
- 不说“多喝点”“干了”“不醉不归”“再来一瓶才够意思”等诱导性表达。
- 不提供医疗、健康诊断或醒酒建议。
- 如果用户表达身体不适、明显醉酒、酒后驾驶、危险行为、自伤倾向，要停止酒类推荐，并建议停止饮酒、联系身边可信的人或寻求现实帮助。
- 安全提醒要自然克制，不要每句话都重复。

输出格式：
先输出一段自然语言 answer，长度控制在 80-180 个中文字符之间。
然后在最后追加一个 JSON 对象，用于网站生成“今晚专属推荐卡”。

JSON 必须严格符合以下结构：
{
  "title": "不超过16个中文字符的推荐卡标题",
  "tags": ["标签1", "标签2", "标签3", "标签4"],
  "reason": "推荐理由，40-80个中文字符",
  "toastLine": "场景话术、祝酒词或陪聊短句，20-40个中文字符",
  "shareCopy": "适合复制分享的一句话，20-40个中文字符"
}

JSON 规则：
- 字段名必须是英文：title, tags, reason, toastLine, shareCopy。
- tags 必须是字符串数组，数量为 3-5 个。
- 不要输出多余字段。
- 不要在 JSON 外层加 Markdown 代码块。
- 不要使用 \`\`\`json。
- 不要在 JSON 后面继续解释。
- JSON 必须可以被 JSON.parse 解析。
- JSON 内部不要出现换行符。
- JSON 字符串里不要使用英文双引号。`

export async function POST(request: Request) {
  let payload: ChatRequest

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "请求内容不是有效 JSON。" }, { status: 400 })
  }

  if (!payload.mode || !MODES.includes(payload.mode)) {
    return NextResponse.json({ error: "缺少有效的 mode。" }, { status: 400 })
  }

  if (!payload.userId) {
    return NextResponse.json({ error: "缺少 userId。" }, { status: 400 })
  }

  const provider = process.env.AI_PROVIDER || "mock"
  const shouldMock = provider === "mock" || !process.env.DEEPSEEK_API_KEY

  if (shouldMock) {
    return NextResponse.json(createMockResponse(payload))
  }

  if (provider !== "deepseek") {
    return NextResponse.json(
      { error: `暂不支持 AI_PROVIDER=${provider}，请使用 mock 或 deepseek。` },
      { status: 400 },
    )
  }

  try {
    return NextResponse.json(await callDeepSeek(payload))
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "AI 服务暂时不可用，请稍后重试。",
      },
      { status: 502 },
    )
  }
}

async function callDeepSeek(payload: ChatRequest): Promise<ChatResponse> {
  const baseUrl = process.env.DEEPSEEK_API_BASE_URL || "https://api.deepseek.com"
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash"
  const conversation = payload.conversationId || `deepseek-${payload.userId}`

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.72,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: buildUserPrompt(payload),
        },
      ],
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(
      `DeepSeek 请求失败：${response.status} ${detail.slice(0, 300)}`,
    )
  }

  const data = await response.json()
  const answer = String(data.choices?.[0]?.message?.content || "").trim()

  if (!answer) {
    throw new Error("DeepSeek 没有返回可展示内容，请重试。")
  }

  return {
    answer: removeJsonBlock(answer),
    conversationId: conversation,
    messageId: data.id,
    card: extractCard(answer) || createFallbackCard(payload, answer),
    source: "deepseek",
  }
}

function buildUserPrompt(payload: ChatRequest) {
  const selections = payload.selections || {}
  const message = payload.message?.trim()

  return [
    `mode: ${payload.mode}`,
    `scene: ${selections.scene || "桂林夜色"}`,
    `mood: ${selections.mood || "放松微醺"}`,
    `party: ${selections.party || "2人小聚"}`,
    `taste: ${selections.taste || "冰镇清爽"}`,
    `goal: ${selections.goal || "慢慢聊天"}`,
    "",
    `用户输入：${message || "请根据以上信息生成漓泉1998今晚专属推荐。"}`,
  ].join("\n")
}

function extractCard(answer: string): RecommendationCard | undefined {
  const match = answer.match(/\{[\s\S]*"title"[\s\S]*\}/)
  if (!match) {
    return undefined
  }

  try {
    const parsed = JSON.parse(match[0]) as Partial<RecommendationCard>
    if (
      parsed.title &&
      Array.isArray(parsed.tags) &&
      parsed.reason &&
      parsed.toastLine &&
      parsed.shareCopy
    ) {
      return {
        title: parsed.title,
        tags: parsed.tags.map(String).slice(0, 5),
        reason: parsed.reason,
        toastLine: parsed.toastLine,
        shareCopy: parsed.shareCopy,
      }
    }
  } catch {
    return undefined
  }
}

function removeJsonBlock(answer: string) {
  return answer.replace(/\{[\s\S]*"title"[\s\S]*\}\s*$/, "").trim()
}

function createMockResponse(payload: ChatRequest): ChatResponse {
  const card = createFallbackCard(payload)
  const modeCopy: Record<AiMode, string> = {
    recommend: `今晚可以走「${card.title}」这一路：先把节奏放慢，让冰镇漓泉1998接住此刻的${payload.selections?.mood || "微醺"}，再留一点空间给朋友和桂林夜色。`,
    companion:
      "我在。今晚不用急着把话说满，先把这一刻安顿好。可以慢慢聊，也可以只让一口清爽陪你坐一会儿。记得理性饮酒，舒服最重要。",
    icebreaker:
      "给你备好今晚的开场：先用一句轻松祝酒词把气氛打开，再用一个不尴尬的话题接住大家，最后留一条适合发朋友圈的桂林微醺文案。",
  }

  return {
    answer: modeCopy[payload.mode || "recommend"],
    conversationId:
      payload.conversationId ||
      `mock-${payload.userId || "guest"}-${Date.now()}`,
    messageId: `mock-message-${Date.now()}`,
    card,
    source: "mock",
  }
}

function createFallbackCard(
  payload: ChatRequest,
  answer = "",
): RecommendationCard {
  const selections = payload.selections || {}
  const scene = selections.scene || "桂林夜色"
  const mood = selections.mood || "微醺"
  const party = selections.party || "朋友小聚"
  const taste = selections.taste || "清爽冰镇"
  const goal = selections.goal || "放松聊天"

  if (payload.mode === "icebreaker") {
    return {
      title: `${scene}破冰小局`,
      tags: [scene, party, "祝酒词", "聊天话题"],
      reason: `用一句轻松开场，把${party}的距离拉近一点。`,
      toastLine: "敬今晚刚刚好的相聚，也敬每个人都能慢慢尽兴。",
      shareCopy: "桂林的夜色刚好，朋友的笑声也刚好。",
    }
  }

  if (payload.mode === "companion") {
    return {
      title: `${mood}酒友陪伴`,
      tags: [mood, taste, "轻松陪聊", "理性饮酒"],
      reason: answer || "适合慢慢聊，不赶时间，也不把微醺变成负担。",
      toastLine: "这一口不为热闹，只为把今晚过得舒服一点。",
      shareCopy: "把桂林装进杯里，也把今晚留给自己。",
    }
  }

  return {
    title: `${scene}的一口漓泉`,
    tags: [scene, mood, party, taste, goal],
    reason: `${taste}的漓泉1998适合${scene}里的${goal}，让${mood}停在刚刚好的位置。`,
    toastLine: "敬今晚的山水、灯火和身边人。",
    shareCopy: `今晚推荐：${scene}、${mood}、${taste}，一口入桂林。`,
  }
}
