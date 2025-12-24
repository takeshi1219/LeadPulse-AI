import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: LucideIcon
  iconColor?: string
}

export function MetricsCard({
  title,
  value,
  change,
  changeLabel = "from last month",
  icon: Icon,
  iconColor = "text-primary",
}: MetricsCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            {isPositive && (
              <>
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">+{change}%</span>
              </>
            )}
            {isNegative && (
              <>
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                <span className="text-red-500">{change}%</span>
              </>
            )}
            {change === 0 && <span>0%</span>}
            <span className="ml-1">{changeLabel}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

