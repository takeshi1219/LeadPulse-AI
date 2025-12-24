"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bot,
  ChevronDown,
  Copy,
  Lightbulb,
  Mail,
  MessageSquare,
  Paperclip,
  RefreshCw,
  Send,
  Sparkles,
  Target,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Lead {
  id: string
  name: string
  company: string
}

const suggestedPrompts = [
  {
    icon: Target,
    title: "Score a lead",
    prompt: "Analyze and score TechCorp Industries as a potential lead",
  },
  {
    icon: Mail,
    title: "Draft outreach",
    prompt: "Write a personalized cold email for a SaaS decision maker",
  },
  {
    icon: Lightbulb,
    title: "Research company",
    prompt: "Research CloudScale Inc and provide key insights",
  },
  {
    icon: MessageSquare,
    title: "Meeting prep",
    prompt: "Help me prepare for a discovery call with an enterprise prospect",
  },
]

const mockLeads: Lead[] = [
  { id: "1", name: "Sarah Chen", company: "TechCorp Industries" },
  { id: "2", name: "John Smith", company: "DataFlow Systems" },
  { id: "3", name: "Emily Watson", company: "CloudScale Inc" },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          leadContext: selectedLead
            ? {
                id: selectedLead.id,
                company_name: selectedLead.company,
                contact_name: selectedLead.name,
              }
            : undefined,
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast.error("Failed to get response from AI assistant")
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again or check if the AI service is running.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
    textareaRef.current?.focus()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const clearChat = () => {
    setMessages([])
    setSelectedLead(null)
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-6">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col rounded-lg border bg-card">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">AI Sales Assistant</h2>
              <p className="text-xs text-muted-foreground">
                Powered by GPT-4 • Always learning from your data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedLead && (
              <Badge variant="secondary" className="gap-1">
                <Target className="h-3 w-3" />
                {selectedLead.company}
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {selectedLead ? "Change Lead" : "Select Lead"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedLead(null)}>
                  No context
                </DropdownMenuItem>
                {mockLeads.map((lead) => (
                  <DropdownMenuItem
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                  >
                    {lead.name} - {lead.company}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={clearChat}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">How can I help you today?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask me anything about your leads, sales strategy, or let me help draft outreach
                </p>
              </div>
              <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt.title}
                    onClick={() => handleSuggestedPrompt(prompt.prompt)}
                    className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4 text-left transition-colors hover:bg-muted/50"
                  >
                    <div className="rounded-lg bg-primary/10 p-2">
                      <prompt.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{prompt.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {prompt.prompt}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "group relative max-w-[80%] rounded-lg px-4 py-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    {message.role === "assistant" && (
                      <div className="mt-2 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg bg-muted px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your leads..."
                className="min-h-[60px] resize-none pr-12"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute bottom-2 right-2"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden w-80 space-y-4 lg:block">
        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleSuggestedPrompt("Research a new company for me")}
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Research Company
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleSuggestedPrompt("Help me score my current leads")}
            >
              <Target className="mr-2 h-4 w-4" />
              Score Leads
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleSuggestedPrompt("Draft a cold outreach email")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Draft Email
            </Button>
          </CardContent>
        </Card>

        {/* Selected Lead Context */}
        {selectedLead && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Lead Context</CardTitle>
              <CardDescription>
                AI responses will consider this lead&apos;s data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Contact</span>
                  <span>{selectedLead.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Company</span>
                  <span>{selectedLead.company}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Pro Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <Sparkles className="h-3 w-3 mt-0.5 text-primary" />
                Select a lead for contextual responses
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-3 w-3 mt-0.5 text-primary" />
                Be specific about your goals
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-3 w-3 mt-0.5 text-primary" />
                Ask for different outreach tones
              </li>
              <li className="flex gap-2">
                <Sparkles className="h-3 w-3 mt-0.5 text-primary" />
                Request meeting prep summaries
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

