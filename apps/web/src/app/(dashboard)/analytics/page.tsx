"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  Calendar,
  Download,
  Filter,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 45000, target: 40000 },
  { month: "Feb", revenue: 52000, target: 45000 },
  { month: "Mar", revenue: 48000, target: 50000 },
  { month: "Apr", revenue: 61000, target: 55000 },
  { month: "May", revenue: 55000, target: 58000 },
  { month: "Jun", revenue: 67000, target: 62000 },
  { month: "Jul", revenue: 72000, target: 68000 },
  { month: "Aug", revenue: 78000, target: 72000 },
]

const conversionData = [
  { stage: "Lead", count: 1247, rate: 100 },
  { stage: "Contacted", count: 892, rate: 71.5 },
  { stage: "Qualified", count: 456, rate: 36.6 },
  { stage: "Proposal", count: 234, rate: 18.8 },
  { stage: "Won", count: 89, rate: 7.1 },
]

const sourceData = [
  { name: "LinkedIn", value: 35, color: "#0077B5" },
  { name: "Website", value: 28, color: "#10B981" },
  { name: "Referral", value: 20, color: "#F59E0B" },
  { name: "Conference", value: 12, color: "#8B5CF6" },
  { name: "Other", value: 5, color: "#6B7280" },
]

const teamPerformance = [
  { name: "Sarah Chen", deals: 24, revenue: 156000, winRate: 32 },
  { name: "John Smith", deals: 18, revenue: 124000, winRate: 28 },
  { name: "Emily Watson", deals: 21, revenue: 145000, winRate: 35 },
  { name: "Mike Johnson", deals: 15, revenue: 98000, winRate: 24 },
]

const weeklyActivity = [
  { day: "Mon", emails: 45, calls: 12, meetings: 4 },
  { day: "Tue", emails: 52, calls: 15, meetings: 6 },
  { day: "Wed", emails: 38, calls: 18, meetings: 8 },
  { day: "Thu", emails: 48, calls: 14, meetings: 5 },
  { day: "Fri", emails: 35, calls: 10, meetings: 3 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your sales performance and team metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$478,000</div>
            <div className="flex items-center text-sm text-emerald-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              +18.2% from last quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26.4%</div>
            <div className="flex items-center text-sm text-emerald-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              +4.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <div className="flex items-center text-sm text-emerald-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              +12.3% from last quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sales Cycle</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 days</div>
            <div className="flex items-center text-sm text-emerald-600">
              <TrendingDown className="mr-1 h-4 w-4" />
              -5 days from last quarter
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue vs Target</CardTitle>
                <CardDescription>Monthly revenue performance against targets</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`$${(value as number)?.toLocaleString() ?? 0}`, ""]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#10b981"
                      strokeDasharray="5 5"
                      name="Target"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Distribution by source</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Lead progression through sales stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={conversionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="stage" type="category" className="text-xs" width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => [
                      name === "count" ? value : `${value}%`,
                      name === "count" ? "Leads" : "Conversion Rate",
                    ]}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Team sales activities this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="emails" fill="#3b82f6" name="Emails" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="calls" fill="#10b981" name="Calls" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="meetings" fill="#f59e0b" name="Meetings" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Individual sales rep metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div
                    key={member.name}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.deals} deals closed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-medium">${member.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                      <Badge
                        variant={member.winRate >= 30 ? "default" : "secondary"}
                        className="w-16 justify-center"
                      >
                        {member.winRate}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

