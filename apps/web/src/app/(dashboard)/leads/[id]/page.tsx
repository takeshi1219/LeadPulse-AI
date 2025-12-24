"use client"

import { useState, use } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bot,
  Building2,
  Calendar,
  ChevronRight,
  Edit,
  ExternalLink,
  Globe,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  formatDate,
  formatRelativeTime,
  getInitials,
  getScoreBgColor,
  getStageColor,
} from "@/lib/utils"
import { LEAD_STAGE_LABELS, LeadStage } from "@/lib/types"

// Mock lead data
const mockLead = {
  id: "1",
  companyName: "TechCorp Industries",
  contactName: "Sarah Chen",
  email: "sarah.chen@techcorp.com",
  phone: "+1 (555) 123-4567",
  website: "https://techcorp.com",
  linkedIn: "https://linkedin.com/company/techcorp",
  industry: "Technology",
  employeeCount: 250,
  revenue: "$50M - $100M",
  location: "San Francisco, CA",
  description: "TechCorp Industries is a leading enterprise software company specializing in cloud-based solutions for Fortune 500 companies. They recently raised Series C funding and are expanding their operations.",
  score: 92,
  stage: "QUALIFIED" as LeadStage,
  source: "LinkedIn",
  tags: ["Enterprise", "SaaS", "High Priority"],
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  updatedAt: new Date(Date.now() - 1000 * 60 * 30),
}

const mockInsights = [
  {
    id: "1",
    type: "scoring",
    title: "Lead Score Breakdown",
    content: {
      overall: 92,
      factors: [
        { name: "Company Size", score: 95, reason: "250+ employees indicates enterprise-level potential" },
        { name: "Industry Match", score: 90, reason: "Technology sector aligns perfectly with ICP" },
        { name: "Budget Potential", score: 88, reason: "$50M+ revenue suggests adequate budget" },
        { name: "Engagement Level", score: 95, reason: "Multiple touchpoints and quick responses" },
      ],
    },
    confidence: 0.95,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "2",
    type: "research",
    title: "Company Research Summary",
    content: {
      summary: "TechCorp Industries has been experiencing rapid growth, with a 40% YoY revenue increase. Recent Series C funding of $75M positions them for expansion. Key decision makers include CTO James Wilson and VP of Engineering Maria Garcia.",
      keyPoints: [
        "Recently raised $75M Series C",
        "40% YoY revenue growth",
        "Expanding engineering team by 50%",
        "Active in cloud infrastructure investments",
      ],
    },
    confidence: 0.88,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "3",
    type: "outreach",
    title: "Recommended Outreach",
    content: {
      subject: "Scaling your cloud infrastructure as TechCorp grows",
      preview: "Hi Sarah, I noticed TechCorp's impressive Series C raise and expansion plans. Many fast-growing tech companies face challenges with...",
      bestTime: "Tuesday 10 AM PST",
      channel: "Email",
    },
    confidence: 0.91,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
]

const mockInteractions = [
  {
    id: "1",
    type: "email",
    content: "Sent introduction email with product overview",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: "2",
    type: "linkedin",
    content: "Connected on LinkedIn, Sarah accepted",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: "3",
    type: "call",
    content: "15-minute discovery call - discussed current pain points with scaling infrastructure",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: "4",
    type: "email",
    content: "Sent case study on similar enterprise deployment",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "5",
    type: "meeting",
    content: "Demo scheduled for next week - Sarah invited CTO James Wilson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
]

const interactionIcons = {
  email: Mail,
  call: Phone,
  meeting: Calendar,
  linkedin: Linkedin,
  note: MessageSquare,
}

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshInsights = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/leads">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{mockLead.companyName}</h1>
              <Badge variant="outline" className={getStageColor(mockLead.stage)}>
                {LEAD_STAGE_LABELS[mockLead.stage]}
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {mockLead.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {mockLead.employeeCount} employees
              </span>
              <span className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {mockLead.industry}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`text-lg ${getScoreBgColor(mockLead.score)}`}>
            <Sparkles className="mr-1 h-4 w-4" />
            {mockLead.score}
          </Badge>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Move to Contacted</DropdownMenuItem>
              <DropdownMenuItem>Move to Proposal</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete Lead</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* AI Insights */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Insights
                </CardTitle>
                <CardDescription>
                  AI-generated analysis and recommendations
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshInsights}
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="scoring" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="scoring">Score</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="outreach">Outreach</TabsTrigger>
                </TabsList>

                <TabsContent value="scoring" className="space-y-4">
                  {(() => {
                    const scoringInsight = mockInsights[0]
                    if (!scoringInsight) return null
                    const factors = scoringInsight.content.factors as Array<{ name: string; score: number; reason: string }> | undefined
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Overall Score</span>
                          <span className="text-2xl font-bold">{scoringInsight.content.overall}/100</span>
                        </div>
                        <Progress value={scoringInsight.content.overall} />
                        <div className="space-y-3">
                          {factors?.map((factor) => (
                            <div key={factor.name} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{factor.name}</span>
                                <span className={getScoreBgColor(factor.score).split(" ")[1]}>
                                  {factor.score}
                                </span>
                              </div>
                              <Progress value={factor.score} className="h-2" />
                              <p className="text-xs text-muted-foreground">{factor.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </TabsContent>

                <TabsContent value="research" className="space-y-4">
                  {(() => {
                    const researchInsight = mockInsights[1]
                    if (!researchInsight) return null
                    const keyPoints = researchInsight.content.keyPoints as string[] | undefined
                    return (
                      <div className="space-y-4">
                        <p className="text-sm">{researchInsight.content.summary}</p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Key Points:</h4>
                          <ul className="space-y-1">
                            {keyPoints?.map((point, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <Lightbulb className="mt-0.5 h-4 w-4 text-yellow-500" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })()}
                </TabsContent>

                <TabsContent value="outreach" className="space-y-4">
                  {(() => {
                    const outreachInsight = mockInsights[2]
                    if (!outreachInsight) return null
                    return (
                      <div className="space-y-4">
                        <div className="rounded-lg border bg-muted/30 p-4">
                          <div className="mb-2 text-sm font-medium">
                            Subject: {outreachInsight.content.subject}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {outreachInsight.content.preview}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">Best time:</span>
                          <Badge variant="secondary">{outreachInsight.content.bestTime}</Badge>
                          <span className="text-muted-foreground">Channel:</span>
                          <Badge variant="secondary">{outreachInsight.content.channel}</Badge>
                        </div>
                        <Button className="w-full">
                          <Mail className="mr-2 h-4 w-4" />
                          Generate Full Email
                        </Button>
                      </div>
                    )
                  })()}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>All interactions with this lead</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Activity
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInteractions.map((interaction, index) => {
                  const Icon = interactionIcons[interaction.type as keyof typeof interactionIcons] || MessageSquare
                  return (
                    <div key={interaction.id} className="flex gap-4">
                      <div className="relative flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        {index < mockInteractions.length - 1 && (
                          <div className="absolute top-8 h-full w-px bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="capitalize">
                            {interaction.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(interaction.createdAt)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{interaction.content}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{getInitials(mockLead.contactName)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{mockLead.contactName}</div>
                  <div className="text-sm text-muted-foreground">Primary Contact</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <a
                  href={`mailto:${mockLead.email}`}
                  className="flex items-center gap-3 text-sm hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {mockLead.email}
                </a>
                <a
                  href={`tel:${mockLead.phone}`}
                  className="flex items-center gap-3 text-sm hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {mockLead.phone}
                </a>
                <a
                  href={mockLead.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary"
                >
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  {mockLead.website.replace("https://", "")}
                  <ExternalLink className="h-3 w-3" />
                </a>
                {mockLead.linkedIn && (
                  <a
                    href={mockLead.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    LinkedIn Profile
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Industry</span>
                <span>{mockLead.industry}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Size</span>
                <span>{mockLead.employeeCount} employees</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Revenue</span>
                <span>{mockLead.revenue}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span>{mockLead.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Source</span>
                <span>{mockLead.source}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDate(mockLead.createdAt)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{formatRelativeTime(mockLead.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockLead.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-6">
                  <Plus className="mr-1 h-3 w-3" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Log Call
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bot className="mr-2 h-4 w-4" />
                Ask AI Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

