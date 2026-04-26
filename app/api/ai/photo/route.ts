import { NextResponse } from "next/server"

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

type PhotoRequest = {
  imageBase64?: string
  style?: PhotoStyle
  photoNote?: string
}

const STYLE_LABELS: Record<PhotoStyle, string> = {
  "guilin-night": "桂林夜色",
  "amber-tipsy": "琥珀微醺",
  "riverside-light": "江边灯火",
  "natural-moments": "朋友圈自然感",
  "bbq-midnight": "烧烤夜宵",
  "friends-toast": "朋友碰杯",
  "product-closeup": "产品特写",
  "festival-table": "热闹饭桌",
  "street-snack": "街边小摊",
  "ktv-party": "KTV聚会",
  "home-dinner": "家中小酌",
  "guilin-travel": "桂林旅行",
  "couple-date": "两人约会",
  "late-night-alone": "深夜独饮",
}

const STYLE_PROMPTS: Record<PhotoStyle, string> = {
  "guilin-night":
    "场景目标：桂林夜色。将照片处理成深青绿色夜景基调，保留暗部层次，增强远处灯火、山水夜游感和微微雾气般的柔和空气感。整体像两江四湖夜色下的一张真实手机照片。",
  "amber-tipsy":
    "场景目标：琥珀微醺。突出啤酒、酒杯、瓶身或桌面上的金色反光，色调偏暖金、琥珀、柔和高光，背景保持轻微虚化，让画面中心像一口冰镇漓泉1998的温暖特写。",
  "riverside-light":
    "场景目标：江边灯火。增强冷暖对比，加入清爽夜风感，突出边缘灯光、倒影、蓝绿色暗部和自然肤色。画面要像江边坐着聊天时随手拍下的照片。",
  "natural-moments":
    "场景目标：朋友圈自然感。只做真实手机摄影级别的优化，提升清晰度、白平衡、肤色、曝光和轻微对比度，不要明显滤镜感，不要制造夸张光效。",
  "bbq-midnight":
    "场景目标：烧烤夜宵。增强炭火、油亮食物、夜宵摊灯光和热闹烟火气，色调偏暖橙和深夜暗部，对食物和酒杯做清晰提亮，背景保留街边夜晚真实感。",
  "friends-toast":
    "场景目标：朋友碰杯。突出手、杯子、碰杯瞬间和笑脸氛围，增加轻微动态感和高光闪烁，肤色自然，背景略微虚化，让画面像朋友聚会中最值得发的一刻。",
  "product-closeup":
    "场景目标：产品特写。突出漓泉1998瓶身、酒杯、冷凝水珠、琥珀酒液和桌面质感，背景压暗并轻微虚化，画面干净高级，适合品牌感朋友圈照片。",
  "festival-table":
    "场景目标：热闹饭桌。增强多人饭桌的丰富层次、餐盘、灯光和笑闹氛围，色彩饱满但不过曝，整体像聚餐高潮时的一张热闹纪念照。",
  "street-snack":
    "场景目标：街边小摊。突出塑料凳、小桌、路边灯牌、夜市摊位、食物热气和真实街头感，色调有生活气但不脏乱，像桂林街头夜宵随手拍。",
  "ktv-party":
    "场景目标：KTV聚会。增强彩色氛围灯、暗环境层次、朋友互动和桌面酒杯高光，画面要热闹、有节奏感，但保持人物肤色自然不过度霓虹。",
  "home-dinner":
    "场景目标：家中小酌。强调温暖室内灯光、家常菜、桌面亲近感和安静微醺氛围，色调柔和温暖，像朋友或家人在家里轻松小聚。",
  "guilin-travel":
    "场景目标：桂林旅行。增强旅行随拍感、山水/街景/行李/路边餐桌的在路上氛围，色调清爽通透，画面像旅行途中打开漓泉1998的一刻。",
  "couple-date":
    "场景目标：两人约会。强化柔和暖光、低对比、桌面细节和亲密安静的气氛，背景轻微虚化，整体浪漫但自然，不要过度甜腻。",
  "late-night-alone":
    "场景目标：深夜独饮。强化安静、留白、单人桌面、杯中反光和深夜灯光，色调克制，画面有独处感但不消沉，适合发一张安静的朋友圈。",
}

export async function POST(request: Request) {
  let payload: PhotoRequest

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "请求内容不是有效 JSON。" }, { status: 400 })
  }

  if (!payload.imageBase64?.startsWith("data:image/")) {
    return NextResponse.json({ error: "请上传有效的图片。" }, { status: 400 })
  }

  const style = payload.style || "guilin-night"

  if (!process.env.DASHSCOPE_API_KEY) {
    return NextResponse.json({
      imageUrl: payload.imageBase64,
      captions: await createCaptions(style, payload.photoNote, ""),
      source: "mock",
    })
  }

  try {
    const imageScene = await analyzePhotoScene(payload.imageBase64, style)
    const imageUrl = await callDashScope(payload.imageBase64, style)
    return NextResponse.json({
      imageUrl,
      captions: await createCaptions(style, payload.photoNote, imageScene),
      source: "dashscope",
    })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "照片美化失败，请稍后重试。",
      },
      { status: 502 },
    )
  }
}

async function callDashScope(imageBase64: string, style: PhotoStyle) {
  const baseUrl =
    process.env.DASHSCOPE_API_BASE_URL || "https://dashscope.aliyuncs.com/api/v1"
  const model = process.env.DASHSCOPE_IMAGE_MODEL || "wan2.7-image"

  const response = await fetch(
    `${baseUrl}/services/aigc/multimodal-generation/generation`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: {
          messages: [
            {
              role: "user",
              content: [
                { image: imageBase64 },
                {
                  text: [
                    STYLE_PROMPTS[style],
                    "必须保留原照片构图、人物身份、五官、桌面结构和真实场景。",
                    "只优化光影、色调、清晰度和氛围，不换脸，不改变人物身份，不添加夸张元素。",
                    "不要把不同场景处理成同一种滤镜；必须严格按照所选场景的光源、色温、主体和氛围进行差异化美化。",
                    "整体适合漓泉1998品牌的桂林夜色、琥珀酒液、桌边微醺氛围。",
                  ].join(" "),
                },
              ],
            },
          ],
        },
        parameters: {
          size: "1K",
          n: 1,
          watermark: false,
        },
      }),
    },
  )

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`百炼请求失败：${response.status} ${detail.slice(0, 300)}`)
  }

  const data = await response.json()
  const imageUrl = data.output?.choices?.[0]?.message?.content?.find(
    (item: { image?: string }) => item.image,
  )?.image

  if (!imageUrl) {
    throw new Error("百炼没有返回图片结果，请重试。")
  }

  return String(imageUrl)
}

async function analyzePhotoScene(imageBase64: string, style: PhotoStyle) {
  const baseUrl =
    process.env.DASHSCOPE_VISION_BASE_URL ||
    "https://dashscope.aliyuncs.com/compatible-mode/v1"
  const model = process.env.DASHSCOPE_VISION_MODEL || "qwen3-vl-flash"

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: [
                  "请分析这张照片的真实情景，用中文输出 80 字以内的摘要。",
                  `用户选择的美化场景是：${STYLE_LABELS[style]}。`,
                  "重点观察：人物数量和关系感、桌面物品、食物/酒杯/酒瓶、光线、地点氛围、最适合朋友圈表达的情绪。",
                  "不要编造看不见的具体地名或人物身份。",
                ].join(""),
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                },
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      return ""
    }

    const data = await response.json()
    return String(data.choices?.[0]?.message?.content || "").trim()
  } catch {
    return ""
  }
}

async function createCaptions(
  style: PhotoStyle,
  photoNote = "",
  imageScene = "",
) {
  if (process.env.DEEPSEEK_API_KEY && process.env.AI_PROVIDER !== "mock") {
    const aiCaptions = await createCaptionsWithDeepSeek(
      style,
      photoNote,
      imageScene,
    )
    if (aiCaptions.length) {
      return aiCaptions
    }
  }

  const captions: Record<PhotoStyle, string[]> = {
    "guilin-night": [
      "桂林的夜色刚好落进杯沿，漓泉1998也刚好冰镇。",
      "山水在远处，朋友在身边，今晚这一口有桂林的光。",
      "夜色不必说满，一点灯火，一点微醺，就够了。",
    ],
    "amber-tipsy": [
      "杯里的琥珀色，刚好接住今晚的慢节奏。",
      "这一口不赶时间，只把灯光和微醺慢慢留住。",
      "漓泉1998冰得刚好，今晚也刚好。",
    ],
    "riverside-light": [
      "江边的风吹过来，杯沿也亮了一下。",
      "不赶路的时候，桂林的夜会自己慢下来。",
      "把灯火留给江面，把这一口留给朋友。",
    ],
    "natural-moments": [
      "今晚没有特别赶路，只是朋友、灯光和一瓶漓泉1998刚好在场。",
      "普通的一桌，被桂林夜色轻轻照亮。",
      "不必说太满，微醺和朋友都刚刚好。",
    ],
    "bbq-midnight": [
      "炭火很热，漓泉刚冰，朋友刚好。",
      "夜宵摊的烟火气，和这一口清爽最搭。",
      "今晚的快乐，是烧烤声和开瓶声一起响起。",
    ],
    "friends-toast": [
      "碰杯这一秒，桂林夜色也入座了。",
      "敬今晚刚好在场的人，也敬这一口刚好的冰爽。",
      "朋友的笑声，比灯火更亮一点。",
    ],
    "product-closeup": [
      "冷凝水珠挂在瓶身上，桂林的夜也有了形状。",
      "一口入桂林，从这一点琥珀色开始。",
      "漓泉1998在桌上，今晚就有了记忆点。",
    ],
    "festival-table": [
      "一桌热闹，一瓶冰爽，今晚就这样开始。",
      "饭桌上的灯火和笑声，都是桂林夜色的一部分。",
      "人齐了，杯满了，故事也就开始了。",
    ],
    "street-snack": [
      "路边小摊的快乐，往往从一瓶冰镇漓泉开始。",
      "塑料凳、夜市灯、开瓶声，今晚的桂林很真实。",
      "烟火气很满，漓泉1998刚好清爽。",
    ],
    "ktv-party": [
      "歌声还没停，杯里的光已经亮起来了。",
      "今晚的节奏，是朋友、灯光和漓泉1998一起给的。",
      "唱到副歌的时候，刚好碰一杯。",
    ],
    "home-dinner": [
      "不用出门，这一桌也有刚刚好的微醺。",
      "家常菜、暖灯光和一瓶漓泉1998，今晚很舒服。",
      "慢慢吃，慢慢聊，冰镇刚好。",
    ],
    "guilin-travel": [
      "在桂林的路上，连开瓶声都像一段风景。",
      "山水看了一天，夜晚留给这一口清爽。",
      "旅行的记忆，有时候就藏在一张桌边照片里。",
    ],
    "couple-date": [
      "两个人的夜色，不需要太热闹。",
      "灯光轻一点，杯子近一点，今晚刚刚好。",
      "这一口不敬热闹，敬身边这个人。",
    ],
    "late-night-alone": [
      "一个人的夜，也可以被一口清爽照亮。",
      "不必赶路，不必解释，今晚慢慢坐一会儿。",
      "把桂林夜色留给窗外，把微醺留给自己。",
    ],
  }

  return captions[style] || captions["guilin-night"]
}

async function createCaptionsWithDeepSeek(
  style: PhotoStyle,
  photoNote: string,
  imageScene: string,
) {
  const baseUrl = process.env.DEEPSEEK_API_BASE_URL || "https://api.deepseek.com"
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash"
  const styleLabel = STYLE_LABELS[style]
  const scene = imageScene.trim() || "视觉模型没有返回情景摘要，请根据所选场景写得自然一些。"
  const note = photoNote.trim() || "用户没有补充想表达的情绪。"

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.82,
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content:
              "你是漓泉1998的朋友圈配文助手。你要根据用户照片描述和美化场景，写有感觉、自然、不生硬的中文短文案。不要硬广，不要劝酒，不要说教。只输出严格 JSON。",
          },
          {
            role: "user",
            content: [
              `美化场景：${styleLabel}`,
              `视觉识别到的照片情景：${scene}`,
              `用户补充：${note}`,
              "请写 3 条适合朋友圈或小红书配图的中文文案。",
              "要求：每条 10-30 个中文字符；必须贴合视觉情景里的具体物体、光线或关系感；有画面感；不要生硬口号；不要都以今晚开头；不要使用夸张营销词；可以自然出现漓泉1998，但不要每条都出现。",
              "写法参考：像真实用户发朋友圈的短句，可以有一点留白、情绪和现场感。不要像广告文案。",
              '返回 JSON：{"captions":["文案1","文案2","文案3"]}',
              "不要 Markdown，不要代码块，不要额外解释。",
            ].join("\n"),
          },
        ],
      }),
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    const answer = String(data.choices?.[0]?.message?.content || "").trim()
    const match = answer.match(/\{[\s\S]*"captions"[\s\S]*\}/)
    if (!match) {
      return []
    }

    const parsed = JSON.parse(match[0]) as { captions?: string[] }
    return Array.isArray(parsed.captions)
      ? parsed.captions.map(String).filter(Boolean).slice(0, 3)
      : []
  } catch {
    return []
  }
}
