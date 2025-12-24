// Lead stages
export type LeadStage = "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL" | "WON" | "LOST"

export const LEAD_STAGES: LeadStage[] = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"]

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  PROPOSAL: "Proposal",
  WON: "Won",
  LOST: "Lost",
}

// User roles
export type UserRole = "ADMIN" | "MEMBER"

// Organization plans
export type OrgPlan = "FREE" | "PRO" | "ENTERPRISE"

// Campaign statuses
export type CampaignStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED"

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  DRAFT: "Draft",
  ACTIVE: "Active",
  PAUSED: "Paused",
  COMPLETED: "Completed",
}

// Interaction types
export type InteractionType = "email" | "call" | "meeting" | "note" | "linkedin"

export const INTERACTION_TYPE_LABELS: Record<InteractionType, string> = {
  email: "Email",
  call: "Call",
  meeting: "Meeting",
  note: "Note",
  linkedin: "LinkedIn",
}

// AI Insight types
export type AIInsightType = "scoring" | "research" | "outreach" | "recommendation"

// Lead with relations
export interface LeadWithRelations {
  id: string
  companyName: string
  contactName: string | null
  email: string | null
  phone: string | null
  website: string | null
  industry: string | null
  employeeCount: number | null
  revenue: string | null
  location: string | null
  description: string | null
  linkedIn: string | null
  score: number
  stage: LeadStage
  source: string | null
  tags: string | null
  organizationId: string
  createdAt: Date
  updatedAt: Date
  interactions?: InteractionData[]
  aiInsights?: AIInsightData[]
}

// Interaction data
export interface InteractionData {
  id: string
  leadId: string
  type: InteractionType
  content: string
  metadata: string | null
  userId: string | null
  createdAt: Date
}

// AI Insight data
export interface AIInsightData {
  id: string
  leadId: string
  type: AIInsightType
  content: string
  confidence: number
  createdAt: Date
}

// Campaign with relations
export interface CampaignWithRelations {
  id: string
  name: string
  description: string | null
  status: CampaignStatus
  organizationId: string
  metrics: string | null
  settings: string | null
  createdAt: Date
  updatedAt: Date
  campaignLeads?: CampaignLeadData[]
}

// Campaign lead data
export interface CampaignLeadData {
  id: string
  campaignId: string
  leadId: string
  status: string
  sentAt: Date | null
  openedAt: Date | null
  repliedAt: Date | null
  createdAt: Date
  lead?: LeadWithRelations
}

// Dashboard metrics
export interface DashboardMetrics {
  totalLeads: number
  newLeads: number
  qualifiedLeads: number
  conversionRate: number
  pipelineValue: number
  aiInsightsGenerated: number
  leadsThisMonth: number
  leadsLastMonth: number
}

// Chart data types
export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export interface FunnelData {
  stage: string
  count: number
  percentage: number
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
  search?: string
  stage?: LeadStage
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Chat message
export interface ChatMessageData {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

