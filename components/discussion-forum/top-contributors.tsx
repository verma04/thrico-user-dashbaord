import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const contributors = [
  {
    name: "Marcus Johnson",
    posts: 45,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Expert",
  },
  {
    name: "Elena Rodriguez",
    posts: 38,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Helper",
  },
  {
    name: "David Kim",
    posts: 32,
    avatar: "/placeholder.svg?height=32&width=32",
    badge: "Active",
  },
]

export function TopContributors() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top Contributors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contributors.map((contributor, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                <AvatarFallback className="text-xs">
                  {contributor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{contributor.name}</p>
                <p className="text-xs text-gray-500">{contributor.posts} posts</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {contributor.badge}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
