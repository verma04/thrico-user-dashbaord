import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Star } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LeaderboardUser {
  id: string
  name: string
  avatarUrl: string
  points: number
  rank: number
}

const mockLeaderboard: LeaderboardUser[] = [
  { id: "1", name: "Alice Johnson", avatarUrl: "/placeholder.svg?height=40&width=40&text=AJ", points: 1250, rank: 1 },
  { id: "2", name: "Bob Smith", avatarUrl: "/placeholder.svg?height=40&width=40&text=BS", points: 1180, rank: 2 },
  { id: "3", name: "Charlie Brown", avatarUrl: "/placeholder.svg?height=40&width=40&text=CB", points: 1020, rank: 3 },
  { id: "4", name: "Diana Prince", avatarUrl: "/placeholder.svg?height=40&width=40&text=DP", points: 950, rank: 4 },
  { id: "5", name: "Eve Adams", avatarUrl: "/placeholder.svg?height=40&width=40&text=EA", points: 880, rank: 5 },
  { id: "6", name: "Frank White", avatarUrl: "/placeholder.svg?height=40&width=40&text=FW", points: 720, rank: 6 },
  { id: "7", name: "Grace Lee", avatarUrl: "/placeholder.svg?height=40&width=40&text=GL", points: 650, rank: 7 },
  { id: "8", name: "Henry King", avatarUrl: "/placeholder.svg?height=40,&width=40&text=HK", points: 580, rank: 8 },
  { id: "9", name: "Ivy Queen", avatarUrl: "/placeholder.svg?height=40&width=40&text=IQ", points: 510, rank: 9 },
  { id: "10", name: "Jack Black", avatarUrl: "/placeholder.svg?height=40&width=40&text=JB", points: 450, rank: 10 },
]

export function Leaderboard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Leaderboard</CardTitle>
        </div>
        <Crown className="h-5 w-5 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <div className="space-y-2 p-2">
            {mockLeaderboard.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg w-6 text-center">
                    {user.rank === 1 && <Crown className="h-5 w-5 text-yellow-500 inline-block" />}
                    {user.rank === 2 && <Star className="h-5 w-5 text-gray-400 inline-block" />}
                    {user.rank === 3 && <Star className="h-5 w-5 text-amber-700 inline-block" />}
                    {user.rank > 3 && user.rank}
                  </span>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
                <span className="font-semibold text-lg">{user.points} pts</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
