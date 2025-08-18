import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface CurrentRankCardProps {
  rank: string
  totalPoints: number
  nextRank?: string
  pointsToNextRank?: number
}

export function CurrentRankCard({ rank, totalPoints, nextRank, pointsToNextRank }: CurrentRankCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
        <Trophy className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{rank}</div>
        <p className="text-xs text-muted-foreground">You have accumulated {totalPoints} points.</p>
        {nextRank && pointsToNextRank !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">
            {pointsToNextRank > 0 ? `Need ${pointsToNextRank} points for ${nextRank}` : `You've reached ${nextRank}!`}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
