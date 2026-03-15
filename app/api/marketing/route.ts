import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export type MarketingIdea = {
  platform: string
  idea: string
  hook: string
  why: string
}

const SYSTEM_PROMPT = `You are a growth marketer for ReadThePrint, an AI contract reviewer for small businesses and freelancers. Your job is to generate creative, specific, non-generic marketing ideas based on what's happening with the product today.

Given a short update about the product, generate 10 marketing ideas. Each idea should include:
- platform: where to post it (Reddit, Twitter, ProductHunt, cold email, TikTok, etc)
- idea: a specific, creative angle — not generic advice
- hook: the exact opening line or subject line to use
- why: one sentence on why this will work right now

Be specific. Never say 'post on social media'. Always give a concrete angle, a real subreddit name, a specific type of person to target, or an exact hook. Think like a founder who has gone viral before.

Return only valid JSON in this exact shape, no markdown:
{
  "ideas": [
    {
      "platform": "string",
      "idea": "string",
      "hook": "string",
      "why": "string"
    }
  ]
}`

export async function POST(req: NextRequest) {
  try {
    const { update } = await req.json()

    if (!update || typeof update !== 'string' || update.trim().length < 3) {
      return NextResponse.json({ error: 'Please provide an update about ReadThePrint.' }, { status: 400 })
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here's what's happening with ReadThePrint today: ${update.trim()}`,
        },
      ],
    })

    const raw = message.content[0]
    if (raw.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response from AI.' }, { status: 500 })
    }

    let result: { ideas: MarketingIdea[] }
    try {
      result = JSON.parse(raw.text)
    } catch {
      const match = raw.text.match(/\{[\s\S]*\}/)
      if (!match) return NextResponse.json({ error: 'Could not parse AI response.' }, { status: 500 })
      result = JSON.parse(match[0])
    }

    if (!Array.isArray(result.ideas)) {
      return NextResponse.json({ error: 'Unexpected response shape.' }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error.'
    console.error('Marketing API error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
