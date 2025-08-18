import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

interface EarnedBadgesCardProps {
  badgesEarned: number
  totalBadges: number
}

export function EarnedBadgesCard({ badgesEarned, totalBadges }: EarnedBadgesCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
        <Award className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {badgesEarned} / {totalBadges}
        </div>
        <p className="text-xs text-muted-foreground">Total badges collected.</p>
      </CardContent>
    </Card>
  )
}
