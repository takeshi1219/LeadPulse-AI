import { DollarSign, Sparkles, Target, TrendingUp, Users } from "lucide-react"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import {
  LeadTrendChart,
  PipelineFunnelChart,
  IndustryDistributionChart,
} from "@/components/dashboard/charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel"

export const metadata = {
  title: "Dashboard",
}

// Mock data - in production, this would come from the database
const metrics = {
  totalLeads: 1247,
  totalLeadsChange: 12.5,
  newLeads: 342,
  newLeadsChange: 18.2,
  qualifiedLeads: 186,
  qualifiedLeadsChange: 8.3,
  conversionRate: 26.4,
  conversionRateChange: 4.1,
  pipelineValue: 2450000,
  pipelineValueChange: 22.8,
  aiInsights: 89,
  aiInsightsChange: 35.6,
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your leads today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricsCard
          title="Total Leads"
          value={metrics.totalLeads.toLocaleString()}
          change={metrics.totalLeadsChange}
          icon={Users}
          iconColor="text-blue-500"
        />
        <MetricsCard
          title="New Leads"
          value={metrics.newLeads.toLocaleString()}
          change={metrics.newLeadsChange}
          icon={Target}
          iconColor="text-green-500"
        />
        <MetricsCard
          title="Qualified"
          value={metrics.qualifiedLeads.toLocaleString()}
          change={metrics.qualifiedLeadsChange}
          icon={TrendingUp}
          iconColor="text-purple-500"
        />
        <MetricsCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          change={metrics.conversionRateChange}
          icon={Target}
          iconColor="text-orange-500"
        />
        <MetricsCard
          title="Pipeline Value"
          value={`$${(metrics.pipelineValue / 1000000).toFixed(1)}M`}
          change={metrics.pipelineValueChange}
          icon={DollarSign}
          iconColor="text-emerald-500"
        />
        <MetricsCard
          title="AI Insights"
          value={metrics.aiInsights.toLocaleString()}
          change={metrics.aiInsightsChange}
          icon={Sparkles}
          iconColor="text-pink-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <LeadTrendChart />
        <PipelineFunnelChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <RecentActivity />
        <AIInsightsPanel />
        <IndustryDistributionChart />
      </div>
    </div>
  )
}

