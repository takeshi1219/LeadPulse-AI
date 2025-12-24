import { Building2, Mail, MessageSquare, Phone, UserPlus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatRelativeTime, getInitials, getScoreBgColor } from "@/lib/utils"

// Mock activity data
const activities = [
  {
    id: "1",
    type: "lead_created",
    leadName: "TechCorp Inc.",
    contactName: "Sarah Chen",
    score: 85,
    time: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "email_sent",
    leadName: "DataFlow Systems",
    contactName: "John Smith",
    score: 72,
    time: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    type: "call_completed",
    leadName: "CloudScale Inc.",
    contactName: "Emily Watson",
    score: 91,
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "4",
    type: "meeting_scheduled",
    leadName: "FinanceHub",
    contactName: "Mike Johnson",
    score: 68,
    time: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "5",
    type: "ai_insight",
    leadName: "StartupXYZ",
    contactName: "Alex Brown",
    score: 78,
    time: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
]

const activityIcons = {
  lead_created: UserPlus,
  email_sent: Mail,
  call_completed: Phone,
  meeting_scheduled: Building2,
  ai_insight: MessageSquare,
}

const activityLabels = {
  lead_created: "New lead added",
  email_sent: "Email sent to",
  call_completed: "Call completed with",
  meeting_scheduled: "Meeting scheduled with",
  ai_insight: "AI insight generated for",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type as keyof typeof activityIcons]
            const label = activityLabels[activity.type as keyof typeof activityLabels]

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className="mt-0.5 rounded-full bg-primary/10 p-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{label}</span>
                    <span className="font-medium text-sm">{activity.leadName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[10px]">
                        {getInitials(activity.contactName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {activity.contactName}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${getScoreBgColor(activity.score)}`}
                    >
                      {activity.score}
                    </Badge>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(activity.time)}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

