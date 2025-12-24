"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Mail,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Target,
  Trash2,
  Users,
} from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatDate, formatCompactNumber } from "@/lib/utils"

// Mock campaigns data
const mockCampaigns = [
  {
    id: "1",
    name: "Q4 Enterprise Outreach",
    description: "Targeting enterprise companies for Q4 push",
    status: "ACTIVE",
    metrics: {
      sent: 450,
      opened: 198,
      replied: 45,
      converted: 12,
    },
    leadCount: 500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
  {
    id: "2",
    name: "SMB SaaS Campaign",
    description: "Outreach to small and medium SaaS companies",
    status: "ACTIVE",
    metrics: {
      sent: 280,
      opened: 112,
      replied: 28,
      converted: 8,
    },
    leadCount: 300,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: "3",
    name: "Re-engagement Series",
    description: "Re-engaging cold leads from Q2",
    status: "PAUSED",
    metrics: {
      sent: 150,
      opened: 45,
      replied: 12,
      converted: 3,
    },
    leadCount: 200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: "4",
    name: "Product Launch 2024",
    description: "New feature announcement campaign",
    status: "DRAFT",
    metrics: {
      sent: 0,
      opened: 0,
      replied: 0,
      converted: 0,
    },
    leadCount: 150,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "5",
    name: "Healthcare Vertical",
    description: "Specialized outreach for healthcare industry",
    status: "COMPLETED",
    metrics: {
      sent: 320,
      opened: 160,
      replied: 48,
      converted: 18,
    },
    leadCount: 320,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
  },
]

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  ACTIVE: "bg-green-500/10 text-green-500 border-green-500/20",
  PAUSED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  COMPLETED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
}

const statusIcons: Record<string, React.ReactNode> = {
  DRAFT: <Calendar className="h-3 w-3" />,
  ACTIVE: <Play className="h-3 w-3" />,
  PAUSED: <Pause className="h-3 w-3" />,
  COMPLETED: <BarChart3 className="h-3 w-3" />,
}

export default function CampaignsPage() {
  const [campaigns] = useState(mockCampaigns)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [newCampaign, setNewCampaign] = useState({ name: "", description: "" })

  const totalSent = campaigns.reduce((acc, c) => acc + c.metrics.sent, 0)
  const totalOpened = campaigns.reduce((acc, c) => acc + c.metrics.opened, 0)
  const totalReplied = campaigns.reduce((acc, c) => acc + c.metrics.replied, 0)
  const totalConverted = campaigns.reduce((acc, c) => acc + c.metrics.converted, 0)

  const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE").length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage your email outreach campaigns
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Campaigns</CardDescription>
            <CardTitle className="text-2xl">{activeCampaigns}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sent</CardDescription>
            <CardTitle className="text-2xl">{formatCompactNumber(totalSent)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open Rate</CardDescription>
            <CardTitle className="text-2xl">
              {totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0}%
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Reply Rate</CardDescription>
            <CardTitle className="text-2xl">
              {totalSent > 0 ? Math.round((totalReplied / totalSent) * 100) : 0}%
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversions</CardDescription>
            <CardTitle className="text-2xl">{totalConverted}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const openRate = campaign.metrics.sent > 0
            ? Math.round((campaign.metrics.opened / campaign.metrics.sent) * 100)
            : 0
          const replyRate = campaign.metrics.sent > 0
            ? Math.round((campaign.metrics.replied / campaign.metrics.sent) * 100)
            : 0
          const progress = campaign.leadCount > 0
            ? Math.round((campaign.metrics.sent / campaign.leadCount) * 100)
            : 0

          return (
            <Card key={campaign.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="text-lg font-semibold hover:underline"
                      >
                        {campaign.name}
                      </Link>
                      <Badge variant="outline" className={statusColors[campaign.status]}>
                        {statusIcons[campaign.status]}
                        <span className="ml-1">{campaign.status}</span>
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {campaign.description}
                    </p>
                    <div className="mt-4 flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{campaign.leadCount} leads</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{campaign.metrics.sent} sent</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Target className="h-4 w-4" />
                        <span>{campaign.metrics.converted} converted</span>
                      </div>
                      <div className="text-muted-foreground">
                        Created {formatDate(campaign.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="mt-1 flex items-center gap-2">
                        <Progress value={progress} className="w-24" />
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                    </div>

                    <div className="w-32 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Open</span>
                        <span className="font-medium">{openRate}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Reply</span>
                        <span className="font-medium">{replyRate}%</span>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/campaigns/${campaign.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        {campaign.status === "ACTIVE" ? (
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Campaign
                          </DropdownMenuItem>
                        ) : campaign.status === "PAUSED" || campaign.status === "DRAFT" ? (
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            {campaign.status === "DRAFT" ? "Start Campaign" : "Resume Campaign"}
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Create Campaign Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Set up a new outreach campaign to engage your leads
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="e.g., Q4 Enterprise Outreach"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the campaign goals and target audience..."
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setCreateDialogOpen(false)}>
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

