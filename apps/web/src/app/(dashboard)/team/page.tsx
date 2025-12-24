"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  UserPlus,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Calendar,
  Shield,
  Users,
} from "lucide-react"
import { getInitials } from "@/lib/utils"

// Mock team data
const teamMembers = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@leadpulse.ai",
    role: "Sales Manager",
    avatar: null,
    phone: "+1 (555) 123-4567",
    deals: 24,
    revenue: 156000,
    leads: 45,
    winRate: 32,
    status: "online",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@leadpulse.ai",
    role: "Account Executive",
    avatar: null,
    phone: "+1 (555) 234-5678",
    deals: 18,
    revenue: 124000,
    leads: 38,
    winRate: 28,
    status: "online",
  },
  {
    id: "3",
    name: "Emily Watson",
    email: "emily@leadpulse.ai",
    role: "Account Executive",
    avatar: null,
    phone: "+1 (555) 345-6789",
    deals: 21,
    revenue: 145000,
    leads: 52,
    winRate: 35,
    status: "away",
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@leadpulse.ai",
    role: "Sales Development Rep",
    avatar: null,
    phone: "+1 (555) 456-7890",
    deals: 15,
    revenue: 98000,
    leads: 65,
    winRate: 24,
    status: "offline",
  },
  {
    id: "5",
    name: "Amanda Garcia",
    email: "amanda@leadpulse.ai",
    role: "Sales Development Rep",
    avatar: null,
    phone: "+1 (555) 567-8901",
    deals: 12,
    revenue: 76000,
    leads: 72,
    winRate: 22,
    status: "online",
  },
]

const roles = [
  { value: "admin", label: "Admin", description: "Full access to all features" },
  { value: "manager", label: "Sales Manager", description: "Manage team and view reports" },
  { value: "ae", label: "Account Executive", description: "Close deals and manage accounts" },
  { value: "sdr", label: "Sales Dev Rep", description: "Prospect and qualify leads" },
]

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500"
      case "away":
        return "bg-amber-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage your sales team and permissions
          </p>
        </div>
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="colleague@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div>
                          <p className="font-medium">{role.label}</p>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setInviteDialogOpen(false)}>
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.reduce((acc, m) => acc + m.deals, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Closed this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(teamMembers.reduce((acc, m) => acc + m.revenue, 0) / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(teamMembers.reduce((acc, m) => acc + m.winRate, 0) / teamMembers.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Team average</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="relative overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || undefined} />
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${getStatusColor(member.status)}`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {member.phone}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t pt-4">
                <div className="text-center">
                  <p className="text-lg font-semibold">{member.deals}</p>
                  <p className="text-xs text-muted-foreground">Deals</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{member.leads}</p>
                  <p className="text-xs text-muted-foreground">Leads</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{member.winRate}%</p>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roles & Permissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Roles & Permissions</CardTitle>
          </div>
          <CardDescription>Manage access levels for your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <div
                key={role.value}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{role.label}</p>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <Badge variant="secondary">
                  {teamMembers.filter((m) => 
                    m.role.toLowerCase().includes(role.label.toLowerCase().split(" ")[0])
                  ).length} members
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

