import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin, type Analysis } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
    }
    if (!file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are supported.' }, { status: 400 })
    }

    // Extract text from PDF
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let fileText: string
    try {
      // Import from lib path to avoid Next.js bundling issues with pdf-parse's test file loader
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse/lib/pdf-parse.js')
      const parsed = await pdfParse(buffer)
      fileText = parsed.text
    } catch (pdfErr) {
      console.error('pdf-parse error:', pdfErr)
      return NextResponse.json({ error: 'Could not read PDF. Please ensure it contains selectable text.' }, { status: 422 })
    }

    if (!fileText || fileText.trim().length < 50) {
      return NextResponse.json({ error: 'PDF appears to be empty or image-only. Please use a PDF with selectable text.' }, { status: 422 })
    }

    // Truncate to avoid token limits (~60k chars ≈ 15k tokens)
    const truncated = fileText.slice(0, 60_000)

    // Call Anthropic
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: `You are a contract review assistant. Analyze this contract and return JSON with this exact shape:
{
  "risk_score": <number 1-10>,
  "summary": "<2-3 sentences, plain English>",
  "clauses": [
    {
      "clause_text": "<the actual clause text>",
      "risk_level": "<high | medium | low>",
      "explanation": "<plain English explanation>",
      "suggestion": "<what to ask or watch out for>"
    }
  ]
}
Return only valid JSON, no markdown.`,
      messages: [
        {
          role: 'user',
          content: `Please review this contract:\n\n${truncated}`,
        },
      ],
    })

    const rawContent = message.content[0]
    if (rawContent.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response from AI.' }, { status: 500 })
    }

    let analysis: Analysis
    try {
      analysis = JSON.parse(rawContent.text)
    } catch {
      // Try to extract JSON if wrapped in markdown
      const match = rawContent.text.match(/\{[\s\S]*\}/)
      if (!match) {
        return NextResponse.json({ error: 'Could not parse AI response.' }, { status: 500 })
      }
      analysis = JSON.parse(match[0])
    }

    // Save to Supabase
    const db = supabaseAdmin()

    const { data: contract, error: contractError } = await db
      .from('contracts')
      .insert({
        file_name: file.name,
        file_text: fileText.slice(0, 10_000), // store a preview
        risk_score: analysis.risk_score,
        analysis,
      })
      .select('id')
      .single()

    if (contractError || !contract) {
      console.error('Supabase insert error:', contractError)
      return NextResponse.json({ error: 'Failed to save analysis.' }, { status: 500 })
    }

    if (analysis.clauses?.length > 0) {
      const clauseRows = analysis.clauses.map((c) => ({
        contract_id: contract.id,
        clause_text: c.clause_text,
        risk_level: c.risk_level,
        explanation: c.explanation,
        suggestion: c.suggestion,
      }))

      await db.from('clauses').insert(clauseRows)
    }

    return NextResponse.json({ id: contract.id, analysis })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Review API error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
