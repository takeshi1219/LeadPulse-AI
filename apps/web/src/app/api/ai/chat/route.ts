import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { z } from "zod"

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || ""
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""

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

const SYSTEM_PROMPT = `You are an AI sales assistant for LeadPulse AI, a B2B sales intelligence platform. Your job is to help sales professionals be more effective.

You can help with:
- Answering questions about leads and companies
- Drafting personalized emails and messages
- Providing sales strategy advice
- Analyzing deal opportunities
- Preparing for meetings
- Suggesting next best actions

Guidelines:
- Be concise and actionable
- Use specific data when available
- Suggest follow-up actions
- Be encouraging but realistic
- Reference best practices in B2B sales

Always end with 2-3 suggested follow-up questions or actions.`

async function callOpenAIDirect(messages: Array<{role: string, content: string}>, leadContext?: any) {
  const systemMessage = leadContext 
    ? `${SYSTEM_PROMPT}\n\nCurrent Lead Context:\n- Company: ${leadContext.company_name}\n- Contact: ${leadContext.contact_name || 'Unknown'}\n- Email: ${leadContext.email || 'Unknown'}\n- Industry: ${leadContext.industry || 'Unknown'}\n- Stage: ${leadContext.stage || 'Unknown'}`
    : SYSTEM_PROMPT

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

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

    // Try Railway AI Engine first if configured
    if (AI_ENGINE_URL) {
      try {
        const response = await fetch(`${AI_ENGINE_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages,
            organization_id: session.user.organizationId,
            lead_context: leadContext,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          return NextResponse.json(data)
        }
      } catch (engineError) {
        console.log("AI Engine unavailable, falling back to direct OpenAI")
      }
    }

    // Fallback to direct OpenAI if AI Engine is unavailable
    if (OPENAI_API_KEY) {
      const aiResponse = await callOpenAIDirect(messages, leadContext)
      
      return NextResponse.json({
        message: aiResponse,
        suggestions: [
          "Tell me more about this lead",
          "Draft a follow-up email",
          "What are the next steps?",
        ],
      })
    }

    // No AI available - return helpful message
    return NextResponse.json({
      message: "I'm your AI sales assistant. To enable AI features, please configure your OpenAI API key in the environment variables. How can I help you today?",
      suggestions: [
        "View your leads",
        "Check the dashboard",
        "Review campaigns",
      ],
    })
  } catch (error) {
    console.error("Chat API error:", error)
    
    return NextResponse.json({
      message: "I encountered an issue processing your request. Please try again or check your API configuration.",
      suggestions: [
        "Try a simpler question",
        "Refresh the page",
        "Contact support",
      ],
    })
  }
}
