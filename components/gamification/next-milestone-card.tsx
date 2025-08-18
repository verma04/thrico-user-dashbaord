import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NextMilestoneCardProps {
  nextMilestoneName: string
  pointsNeeded: number
  actionLink: string
  actionText: string
}

export function NextMilestoneCard({ nextMilestoneName, pointsNeeded, actionLink, actionText }: NextMilestoneCardProps) {
  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Next Goal</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{nextMilestoneName}</div>
        <p className="text-sm text-muted-foreground mb-4">
          You need <span className="font-semibold text-primary">{pointsNeeded} more points</span> to reach this
          milestone!
        </p>
        <Button asChild>
          <Link href={actionLink}>{actionText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
