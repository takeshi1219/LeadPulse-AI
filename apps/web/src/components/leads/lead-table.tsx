"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MoreHorizontal,
  Sparkles,
  Trash2,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  formatRelativeTime,
  getInitials,
  getScoreBgColor,
  getStageColor,
} from "@/lib/utils"
import { LEAD_STAGE_LABELS, LeadStage } from "@/lib/types"

// Mock data for demo
const mockLeads = [
  {
    id: "1",
    companyName: "TechCorp Industries",
    contactName: "Sarah Chen",
    email: "sarah@techcorp.com",
    phone: "+1 555-0123",
    website: "https://techcorp.com",
    industry: "Technology",
    employeeCount: 250,
    revenue: "$50M - $100M",
    location: "San Francisco, CA",
    score: 92,
    stage: "QUALIFIED" as LeadStage,
    source: "LinkedIn",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    companyName: "DataFlow Systems",
    contactName: "John Smith",
    email: "john@dataflow.io",
    phone: "+1 555-0124",
    website: "https://dataflow.io",
    industry: "Software",
    employeeCount: 120,
    revenue: "$10M - $50M",
    location: "Austin, TX",
    score: 78,
    stage: "CONTACTED" as LeadStage,
    source: "Website",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    companyName: "CloudScale Inc",
    contactName: "Emily Watson",
    email: "emily@cloudscale.co",
    phone: "+1 555-0125",
    website: "https://cloudscale.co",
    industry: "Cloud Services",
    employeeCount: 500,
    revenue: "$100M+",
    location: "Seattle, WA",
    score: 95,
    stage: "PROPOSAL" as LeadStage,
    source: "Referral",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "4",
    companyName: "FinanceHub Global",
    contactName: "Michael Brown",
    email: "michael@financehub.com",
    phone: "+1 555-0126",
    website: "https://financehub.com",
    industry: "Finance",
    employeeCount: 1000,
    revenue: "$100M+",
    location: "New York, NY",
    score: 65,
    stage: "NEW" as LeadStage,
    source: "Conference",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "5",
    companyName: "HealthTech Solutions",
    contactName: "Jessica Lee",
    email: "jessica@healthtech.io",
    phone: "+1 555-0127",
    website: "https://healthtech.io",
    industry: "Healthcare",
    employeeCount: 75,
    revenue: "$5M - $10M",
    location: "Boston, MA",
    score: 82,
    stage: "CONTACTED" as LeadStage,
    source: "LinkedIn",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: "6",
    companyName: "RetailMax",
    contactName: "David Wilson",
    email: "david@retailmax.com",
    phone: "+1 555-0128",
    website: "https://retailmax.com",
    industry: "Retail",
    employeeCount: 350,
    revenue: "$50M - $100M",
    location: "Chicago, IL",
    score: 58,
    stage: "NEW" as LeadStage,
    source: "Website",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "7",
    companyName: "EduTech Academy",
    contactName: "Amanda Garcia",
    email: "amanda@edutech.edu",
    phone: "+1 555-0129",
    website: "https://edutech.edu",
    industry: "Education",
    employeeCount: 45,
    revenue: "$1M - $5M",
    location: "Los Angeles, CA",
    score: 71,
    stage: "QUALIFIED" as LeadStage,
    source: "Webinar",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "8",
    companyName: "GreenEnergy Co",
    contactName: "Robert Taylor",
    email: "robert@greenenergy.com",
    phone: "+1 555-0130",
    website: "https://greenenergy.com",
    industry: "Energy",
    employeeCount: 200,
    revenue: "$20M - $50M",
    location: "Denver, CO",
    score: 88,
    stage: "WON" as LeadStage,
    source: "Referral",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
]

interface LeadTableProps {
  searchQuery: string
}

export function LeadTable({ searchQuery }: LeadTableProps) {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [leads, setLeads] = useState(mockLeads)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockLeads.filter(
        (lead) =>
          lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setLeads(filtered)
    } else {
      setLeads(mockLeads)
    }
  }, [searchQuery])

  const toggleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(leads.map((lead) => lead.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id))
    } else {
      setSelectedLeads([...selectedLeads, id])
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" />
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell><Skeleton className="h-8 w-40" /></TableCell>
                <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-8 w-8" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedLeads.length === leads.length && leads.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="group"
                data-state={selectedLeads.includes(lead.id) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={() => toggleSelect(lead.id)}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/leads/${lead.id}`}
                    className="flex items-center gap-3 hover:underline"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{lead.companyName}</div>
                      <div className="text-xs text-muted-foreground">
                        {lead.industry} · {lead.employeeCount} employees
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {getInitials(lead.contactName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm">{lead.contactName}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getScoreBgColor(lead.score)}>
                    <Sparkles className="mr-1 h-3 w-3" />
                    {lead.score}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStageColor(lead.stage)}>
                    {LEAD_STAGE_LABELS[lead.stage]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{lead.source}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatRelativeTime(lead.updatedAt)}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/leads/${lead.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Insights
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{leads.length}</span> of{" "}
          <span className="font-medium">{mockLeads.length}</span> leads
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

