/**
 * AI Engine Client - Communicates with the FastAPI AI service
 */

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://localhost:8000"

interface LeadData {
  id: string
  company_name: string
  contact_name?: string
  email?: string
  phone?: string
  website?: string
  industry?: string
  employee_count?: number
  revenue?: string
  location?: string
  description?: string
  stage?: string
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ResearchResponse {
  lead_id: string
  company_summary: string
  key_insights: string[]
  decision_makers: { name: string; title: string }[]
  recent_news: string[]
  funding_info?: string
  tech_stack: string[]
  confidence: number
}

export interface ScoringFactor {
  name: string
  score: number
  reason: string
  weight: number
}

export interface ScoringResponse {
  lead_id: string
  overall_score: number
  factors: ScoringFactor[]
  recommendation: string
  confidence: number
}

export interface OutreachResponse {
  lead_id: string
  outreach_type: string
  subject?: string
  content: string
  best_send_time: string
  follow_up_suggestions: string[]
  confidence: number
}

export interface Insight {
  type: string
  title: string
  description: string
  action?: string
  confidence: number
}

export interface InsightResponse {
  lead_id: string
  insights: Insight[]
  priority_score: number
}

export interface ChatResponse {
  message: string
  suggestions: string[]
}

class AIClient {
  private baseUrl: string

  constructor(baseUrl: string = AI_ENGINE_URL) {
    this.baseUrl = baseUrl
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error" }))
      throw new Error(error.detail || `API error: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Research a company
   */
  async research(lead: LeadData, depth: "quick" | "standard" | "deep" = "standard"): Promise<ResearchResponse> {
    return this.fetch<ResearchResponse>("/research", {
      method: "POST",
      body: JSON.stringify({ lead, depth }),
    })
  }

  /**
   * Score a lead
   */
  async score(lead: LeadData, icpCriteria?: Record<string, string>): Promise<ScoringResponse> {
    return this.fetch<ScoringResponse>("/score", {
      method: "POST",
      body: JSON.stringify({ lead, icp_criteria: icpCriteria }),
    })
  }

  /**
   * Generate outreach content
   */
  async generateOutreach(
    lead: LeadData,
    options: {
      outreach_type?: "email" | "linkedin" | "call_script"
      tone?: "professional" | "casual" | "formal"
      goal?: string
    } = {}
  ): Promise<OutreachResponse> {
    return this.fetch<OutreachResponse>("/outreach", {
      method: "POST",
      body: JSON.stringify({
        lead,
        outreach_type: options.outreach_type || "email",
        tone: options.tone || "professional",
        goal: options.goal || "schedule a discovery call",
      }),
    })
  }

  /**
   * Generate insights for a lead
   */
  async generateInsights(
    lead: LeadData,
    insightTypes: string[] = ["general", "opportunity", "risk", "next_action"]
  ): Promise<InsightResponse> {
    return this.fetch<InsightResponse>("/insights", {
      method: "POST",
      body: JSON.stringify({ lead, insight_types: insightTypes }),
    })
  }

  /**
   * Chat with the AI assistant
   */
  async chat(
    messages: ChatMessage[],
    organizationId: string,
    leadContext?: LeadData
  ): Promise<ChatResponse> {
    return this.fetch<ChatResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({
        messages,
        organization_id: organizationId,
        lead_context: leadContext,
      }),
    })
  }

  /**
   * Stream chat responses
   */
  async *streamChat(
    messages: ChatMessage[],
    organizationId: string,
    leadContext?: LeadData
  ): AsyncGenerator<string, void, unknown> {
    const url = `${this.baseUrl}/api/chat/stream`
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        organization_id: organizationId,
        lead_context: leadContext,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error("No response body")

    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6)
          if (data === "[DONE]") return
          try {
            const parsed = JSON.parse(data)
            if (parsed.content) yield parsed.content
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }
  }
}

export const aiClient = new AIClient()
export default aiClient

