"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, X, Eye, Vote, Clock, Shield } from "lucide-react"
import { format } from "date-fns"
import type { PollTypeData } from "@/lib/post-store"

interface PollPreviewProps {
  pollData: PollTypeData
  onEdit?: () => void
  onRemove?: () => void
}

export function PollPreview({ pollData, onEdit, onRemove }: PollPreviewProps) {
  const getResultVisibilityText = (visibility: string) => {
    switch (visibility) {
      case "ALWAYS":
        return "Results are always visible"
      case "AFTER_VOTE":
        return "Results shown after voting"
      case "AFTER_END":
        return "Results shown after poll ends"
      case "ADMIN":
        return "Only admins can see results"
      default:
        return "Results shown after voting"
    }
  }

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "ALWAYS":
        return <Eye className="h-4 w-4" />
      case "AFTER_VOTE":
        return <Vote className="h-4 w-4" />
      case "AFTER_END":
        return <Clock className="h-4 w-4" />
      case "ADMIN":
        return <Shield className="h-4 w-4" />
      default:
        return <Vote className="h-4 w-4" />
    }
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        {/* Header with actions */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="gap-1">
            <Vote className="h-3 w-3" />
            Poll
          </Badge>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onRemove && (
              <Button variant="ghost" size="sm" onClick={onRemove}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Poll content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{pollData.title}</h3>
            <p className="text-base text-foreground mb-4">{pollData.question}</p>
          </div>

          {/* Visibility info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            {getVisibilityIcon(pollData.resultVisibility)}
            <span>{getResultVisibilityText(pollData.resultVisibility)}</span>
          </div>

          {/* Poll options */}
          <div className="space-y-2">
            {pollData.options.map((option, index) => (
              <div
                key={index}
                className="border-2 border-primary rounded-full px-4 py-2 text-center text-sm font-medium text-primary bg-transparent hover:bg-primary/5 transition-colors"
              >
                {option.option}
              </div>
            ))}
          </div>

          {/* End date if set */}
          {pollData.lastDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <Clock className="h-4 w-4" />
              <span>Ends on {format(pollData.lastDate, "PPP")}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
