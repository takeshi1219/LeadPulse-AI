"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Lead trend data
const leadTrendData = [
  { month: "Jan", leads: 45, qualified: 28 },
  { month: "Feb", leads: 52, qualified: 35 },
  { month: "Mar", leads: 61, qualified: 42 },
  { month: "Apr", leads: 58, qualified: 38 },
  { month: "May", leads: 73, qualified: 52 },
  { month: "Jun", leads: 85, qualified: 61 },
  { month: "Jul", leads: 92, qualified: 68 },
  { month: "Aug", leads: 88, qualified: 65 },
  { month: "Sep", leads: 105, qualified: 78 },
  { month: "Oct", leads: 115, qualified: 85 },
  { month: "Nov", leads: 128, qualified: 95 },
  { month: "Dec", leads: 142, qualified: 108 },
]

// Pipeline funnel data
const pipelineData = [
  { stage: "New", value: 245, fill: "hsl(var(--chart-1))" },
  { stage: "Contacted", value: 186, fill: "hsl(var(--chart-2))" },
  { stage: "Qualified", value: 142, fill: "hsl(var(--chart-3))" },
  { stage: "Proposal", value: 98, fill: "hsl(var(--chart-4))" },
  { stage: "Won", value: 64, fill: "hsl(var(--chart-5))" },
]

// Industry distribution data
const industryData = [
  { name: "Technology", value: 35 },
  { name: "Finance", value: 25 },
  { name: "Healthcare", value: 20 },
  { name: "Retail", value: 12 },
  { name: "Other", value: 8 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function LeadTrendChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Lead Trend</CardTitle>
        <CardDescription>Monthly lead acquisition and qualification</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadTrendData}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorQualified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorLeads)"
                name="Total Leads"
              />
              <Area
                type="monotone"
                dataKey="qualified"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorQualified)"
                name="Qualified"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function PipelineFunnelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Funnel</CardTitle>
        <CardDescription>Leads by stage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis
                type="category"
                dataKey="stage"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                cursor={{ fill: "hsl(var(--muted))" }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {pipelineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function IndustryDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Industry Distribution</CardTitle>
        <CardDescription>Leads by industry</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={industryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {industryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

