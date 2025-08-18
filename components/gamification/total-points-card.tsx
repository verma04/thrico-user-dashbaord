import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface TotalPointsCardProps {
  totalPoints: number
  pointsToday?: number
  pointsThisWeek?: number
}

export function TotalPointsCard({ totalPoints, pointsToday, pointsThisWeek }: TotalPointsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Points</CardTitle>
        <Sparkles className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalPoints}</div>
        <p className="text-xs text-muted-foreground">Points earned from various activities.</p>
        {pointsToday !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">
            {pointsToday > 0 ? `+${pointsToday} points today` : "No points earned today."}
          </p>
        )}
        {pointsThisWeek !== undefined && (
          <p className="text-xs text-muted-foreground">
            {pointsThisWeek > 0 ? `+${pointsThisWeek} points this week` : "No points earned this week."}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
