"use client"

import { useState } from "react"
import Link from "next/link"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Building2, MoreHorizontal, Sparkles } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getInitials, getScoreBgColor } from "@/lib/utils"
import { LEAD_STAGES, LEAD_STAGE_LABELS, LeadStage } from "@/lib/types"

interface KanbanLead {
  id: string
  companyName: string
  contactName: string
  score: number
  revenue: string
  stage: LeadStage
}

// Mock data organized by stage
const initialLeads: Record<LeadStage, KanbanLead[]> = {
  NEW: [
    { id: "1", companyName: "TechStartup Inc", contactName: "Alex Brown", score: 65, revenue: "$1M - $5M", stage: "NEW" },
    { id: "2", companyName: "DataSystems Co", contactName: "Maria Garcia", score: 58, revenue: "$5M - $10M", stage: "NEW" },
    { id: "3", companyName: "CloudFirst", contactName: "James Lee", score: 72, revenue: "$10M+", stage: "NEW" },
  ],
  CONTACTED: [
    { id: "4", companyName: "Enterprise Solutions", contactName: "Sarah Chen", score: 78, revenue: "$50M+", stage: "CONTACTED" },
    { id: "5", companyName: "SmartTech Labs", contactName: "John Smith", score: 71, revenue: "$20M - $50M", stage: "CONTACTED" },
  ],
  QUALIFIED: [
    { id: "6", companyName: "GlobalCorp", contactName: "Emily Watson", score: 85, revenue: "$100M+", stage: "QUALIFIED" },
    { id: "7", companyName: "Innovate Inc", contactName: "Mike Johnson", score: 82, revenue: "$50M - $100M", stage: "QUALIFIED" },
    { id: "8", companyName: "FutureTech", contactName: "Lisa Anderson", score: 88, revenue: "$20M - $50M", stage: "QUALIFIED" },
  ],
  PROPOSAL: [
    { id: "9", companyName: "MegaCorp Industries", contactName: "David Wilson", score: 92, revenue: "$100M+", stage: "PROPOSAL" },
  ],
  WON: [
    { id: "10", companyName: "SuccessStory Co", contactName: "Jennifer Taylor", score: 95, revenue: "$50M+", stage: "WON" },
  ],
  LOST: [
    { id: "11", companyName: "MissedOpp Inc", contactName: "Robert Brown", score: 45, revenue: "$10M - $20M", stage: "LOST" },
  ],
}

const stageColors: Record<LeadStage, string> = {
  NEW: "border-blue-500/50 bg-blue-500/5",
  CONTACTED: "border-purple-500/50 bg-purple-500/5",
  QUALIFIED: "border-yellow-500/50 bg-yellow-500/5",
  PROPOSAL: "border-orange-500/50 bg-orange-500/5",
  WON: "border-green-500/50 bg-green-500/5",
  LOST: "border-red-500/50 bg-red-500/5",
}

const headerColors: Record<LeadStage, string> = {
  NEW: "text-blue-500",
  CONTACTED: "text-purple-500",
  QUALIFIED: "text-yellow-500",
  PROPOSAL: "text-orange-500",
  WON: "text-green-500",
  LOST: "text-red-500",
}

export function LeadKanban() {
  const [leads, setLeads] = useState(initialLeads)

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceStage = source.droppableId as LeadStage
    const destStage = destination.droppableId as LeadStage

    const sourceLeads = Array.from(leads[sourceStage])
    const [movedLead] = sourceLeads.splice(source.index, 1)
    
    if (sourceStage === destStage) {
      sourceLeads.splice(destination.index, 0, movedLead)
      setLeads({
        ...leads,
        [sourceStage]: sourceLeads,
      })
    } else {
      const destLeads = Array.from(leads[destStage])
      const updatedLead = { ...movedLead, stage: destStage }
      destLeads.splice(destination.index, 0, updatedLead)
      setLeads({
        ...leads,
        [sourceStage]: sourceLeads,
        [destStage]: destLeads,
      })
    }
  }

  const getTotalValue = (stageLeads: KanbanLead[]) => {
    return stageLeads.length
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {LEAD_STAGES.map((stage) => (
          <div key={stage} className="w-72 flex-shrink-0">
            <Card className={`${stageColors[stage]} border-t-4`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-sm font-semibold ${headerColors[stage]}`}>
                    {LEAD_STAGE_LABELS[stage]}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {getTotalValue(leads[stage])}
                  </Badge>
                </div>
              </CardHeader>
              <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                  <CardContent
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] space-y-2 ${
                      snapshot.isDraggingOver ? "bg-muted/50" : ""
                    }`}
                  >
                    {leads[stage].map((lead, index) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`rounded-lg border bg-card p-3 transition-shadow ${
                              snapshot.isDragging ? "shadow-lg" : ""
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <Link
                                href={`/leads/${lead.id}`}
                                className="flex items-center gap-2 hover:underline"
                              >
                                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                                  <Building2 className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium line-clamp-1">
                                    {lead.companyName}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {lead.revenue}
                                  </div>
                                </div>
                              </Link>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/leads/${lead.id}`}>View Details</Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Generate Insights</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-[10px]">
                                    {getInitials(lead.contactName)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                  {lead.contactName}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${getScoreBgColor(lead.score)}`}
                              >
                                <Sparkles className="mr-0.5 h-2.5 w-2.5" />
                                {lead.score}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </CardContent>
                )}
              </Droppable>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

