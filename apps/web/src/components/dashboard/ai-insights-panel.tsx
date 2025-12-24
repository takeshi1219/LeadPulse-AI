"use client"

import { Bot, ChevronRight, Lightbulb, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const insights = [
  {
    id: "1",
    type: "opportunity",
    title: "High-Value Lead Detected",
    description: "TechCorp Inc. shows strong buying signals. Their recent funding round and team expansion suggest readiness for enterprise solutions.",
    action: "View Lead",
    leadId: "lead-1",
    confidence: 92,
  },
  {
    id: "2",
    type: "recommendation",
    title: "Optimal Outreach Time",
    description: "Data shows Tuesday mornings have 3x higher response rates for your target industry. Consider scheduling emails accordingly.",
    action: "Learn More",
    confidence: 87,
  },
  {
    id: "3",
    type: "trend",
    title: "Pipeline Health Alert",
    description: "Your proposal-to-close ratio improved by 15% this month. Continue personalized follow-ups for best results.",
    action: "View Analytics",
    confidence: 95,
  },
]

const insightIcons = {
  opportunity: Lightbulb,
  recommendation: Sparkles,
  trend: TrendingUp,
}

const insightColors = {
  opportunity: "bg-yellow-500/10 text-yellow-500",
  recommendation: "bg-purple-500/10 text-purple-500",
  trend: "bg-green-500/10 text-green-500",
}

export function AIInsightsPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Insights
          </CardTitle>
          <CardDescription>Personalized recommendations from your AI assistant</CardDescription>
        </div>
        <Button variant="ghost" size="sm">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = insightIcons[insight.type as keyof typeof insightIcons]
            const colorClass = insightColors[insight.type as keyof typeof insightColors]

            return (
              <div
                key={insight.id}
                className="group rounded-lg border bg-card p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{insight.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-primary"
                    >
                      {insight.action}
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

