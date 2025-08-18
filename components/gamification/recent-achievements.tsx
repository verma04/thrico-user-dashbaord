import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListChecks } from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "../ui/scroll-area"

interface Achievement {
  id: string
  type: "badge" | "points" | "rank"
  name: string
  description: string
  date: string
  icon?: React.ElementType
  imageUrl?: string
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    type: "badge",
    name: "First Post Badge",
    description: "Earned for creating your first discussion post.",
    date: "2024-07-20",
    imageUrl: "/placeholder.svg?height=40&width=40&text=First+Post",
  },
  {
    id: "2",
    type: "points",
    name: "+100 Points",
    description: "Successfully referred a friend.",
    date: "2024-07-18",
    icon: ListChecks, // Using a generic icon for points
  },
  {
    id: "3",
    type: "rank",
    name: "Reached Gold Tier",
    description: "Achieved Gold Tier status in the ranking system.",
    date: "2024-07-17",
    icon: ListChecks, // Using a generic icon for rank
  },
  {
    id: "4",
    type: "badge",
    name: "Marketplace Explorer Badge",
    description: "Earned for viewing 50 marketplace listings.",
    date: "2024-07-15",
    imageUrl: "/placeholder.svg?height=40&width=40&text=Marketplace+Explorer",
  },
  {
    id: "5",
    type: "points",
    name: "+50 Points",
    description: "Received a badge: 'First Post'.",
    date: "2024-07-14",
    icon: ListChecks,
  },
]

export function RecentAchievements() {
  return (
    <Card >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recent Achievements</CardTitle>
        <ListChecks className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border">
        <ul className="space-y-2 p-2">
          {mockAchievements.map((achievement) => (
            <li key={achievement.id} className="flex items-center gap-3 p-2">
              {achievement.imageUrl ? (
                <Image
                  src={achievement.imageUrl || "/placeholder.svg"}
                  alt={achievement.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                achievement.icon && <achievement.icon className="h-8 w-8 text-primary" />
              )}
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">{achievement.date}</p>
              </div>
            </li>
          ))}
        </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
