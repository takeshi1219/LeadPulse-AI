import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { z } from "zod"

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://localhost:8000"

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })),
  leadContext: z.object({
    id: z.string(),
    company_name: z.string(),
    contact_name: z.string().optional(),
    email: z.string().optional(),
    industry: z.string().optional(),
    stage: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
})

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const result = chatSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { messages, leadContext } = result.data

    // Forward request to AI engine
    const response = await fetch(`${AI_ENGINE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        organization_id: session.user.organizationId,
        lead_context: leadContext,
      }),
    })

    if (!response.ok) {
      throw new Error(`AI Engine error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Chat API error:", error)
    
    // Fallback response if AI engine is not running
    return NextResponse.json({
      message: "I'm your AI sales assistant. I can help you with lead research, outreach strategies, and sales recommendations. However, it seems the AI engine is not currently available. Please ensure the AI service is running at localhost:8000.",
      suggestions: [
        "Start the AI engine service",
        "Check the connection settings",
        "Try again later",
      ],
    })
  }
}

