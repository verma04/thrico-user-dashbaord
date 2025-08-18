import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BadgeCheck, Star, Zap, MessageSquare, ShoppingBag, Lightbulb, Users, Handshake } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Badge {
  id: string
  name: string
  description: string
  icon: React.ElementType
  progress: number // 0-100
  imageUrl?: string
  criteria: string[]
  rewardPoints: number
}

const mockBadges: Badge[] = [
  {
    id: "1",
    name: "First Post",
    description: "Made your first discussion post.",
    icon: MessageSquare,
    progress: 100,
    imageUrl: "/placeholder.svg?height=64&width=64&text=First+Post",
    criteria: ["Create one discussion post."],
    rewardPoints: 50,
  },
  {
    id: "2",
    name: "Active Contributor",
    description: "Posted 10 discussions or replies.",
    icon: Zap,
    progress: 75,
    imageUrl: "/placeholder.svg?height=64&width=64&text=Active+Contributor",
    criteria: ["Post 10 discussions or replies.", "Maintain a positive reputation score."],
    rewardPoints: 100,
  },
  {
    id: "3",
    name: "Marketplace Explorer",
    description: "Viewed 50 listings in the marketplace.",
    icon: ShoppingBag,
    progress: 100,
    imageUrl: "/placeholder.svg?height=64&width=64&text=Marketplace+Explorer",
    criteria: ["View 50 unique marketplace listings."],
    rewardPoints: 75,
  },
  {
    id: "4",
    name: "Top Referrer",
    description: "Successfully referred 5 new users.",
    icon: Star,
    progress: 20,
    imageUrl: "/placeholder.svg?height=64&width=64&text=Top+Referrer",
    criteria: ["Successfully refer 5 new users who complete their profile."],
    rewardPoints: 200,
  },
  {
    id: "5",
    name: "Job Seeker",
    description: "Applied to 3 jobs.",
    icon: BadgeCheck,
    progress: 100,
    imageUrl: "/placeholder.svg?height=64&width=64&text=Job+Seeker",
    criteria: ["Apply to 3 unique job listings."],
    rewardPoints: 60,
  },
  {
    id: "6",
    name: "Idea Generator",
    description: "Submitted 5 ideas or suggestions.",
    icon: Lightbulb,
    progress: 40,
    imageUrl: "/placeholder.svg?height=64&width=64&text=Idea+Generator",
    criteria: ["Submit 5 unique ideas or suggestions to the platform."],
    rewardPoints: 80,
  },
  {
    id: "7",
    name: "Community Builder",
    description: "Invited 10 friends to the platform.",
    icon: Users,
    progress: 100,
    imageUrl: "/placeholder.svg?height=64&width=64&text=Community+Builder",
    criteria: ["Successfully invite 10 friends to join the platform."],
    rewardPoints: 150,
  },
  {
    id: "8",
    name: "Deal Maker",
    description: "Completed 3 successful transactions.",
    icon: Handshake,
    progress: 66,
    imageUrl: "/placeholder.svg?height=64&width=64&text=Deal+Maker",
    criteria: ["Complete 3 successful transactions (buy or sell) on the marketplace."],
    rewardPoints: 120,
  },
]

export function EarnedBadgesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earned Badges</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockBadges.map((badge) => (
          <Dialog key={badge.id}>
            <DialogTrigger asChild>
              <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
                {badge.imageUrl ? (
                  <Image
                    src={badge.imageUrl || "/placeholder.svg"}
                    alt={badge.name}
                    width={64}
                    height={64}
                    className="mb-2 rounded-full"
                  />
                ) : (
                  <badge.icon className="h-16 w-16 text-primary mb-2" />
                )}
                <h3 className="font-semibold text-lg">{badge.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{badge.description}</p>
                <div className="w-full">
                  <Progress value={badge.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{badge.progress}% Complete</p>
                </div>
                {badge.progress === 100 && (
                  <Button variant="ghost" size="sm" className="mt-2 text-green-600 hover:text-green-700">
                    Earned!
                  </Button>
                )}
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {badge.imageUrl ? (
                    <Image
                      src={badge.imageUrl || "/placeholder.svg"}
                      alt={badge.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <badge.icon className="h-10 w-10 text-primary" />
                  )}
                  {badge.name}
                </DialogTitle>
                <DialogDescription>{badge.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Criteria:</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {badge.criteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold">
                  Reward: <span className="text-primary">{badge.rewardPoints} Points</span>
                </p>
                {badge.progress < 100 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Your Progress:</h4>
                    <Progress value={badge.progress} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-1">{badge.progress}% Complete</p>
                  </div>
                )}
                {badge.progress === 100 && (
                  <p className="mt-4 text-green-600 font-semibold">Congratulations! You have earned this badge.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  )
}
