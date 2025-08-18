import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  Heart, 
  MessageCircle, 
  BarChart2, 
  Bookmark, 
  TrendingUp, 
  Users,
  Eye,
  Settings,
  Edit,
  Star,
  Clock,
  Activity,
  Bell
} from "lucide-react"

// Import the structured data
import { 
  currentUser, 
  feedStats, 
  recentFeedActivity, 
  suggestedUsers, 
  trendingTopics,
  feedQuickActions 
} from "@/lib/user-data"

export function FeedSidebar() {
  // Create feed stats array from the data
  const feedStatsArray = [
    { label: "Your Posts", value: currentUser.posts.toString(), icon: MessageCircle },
    { label: "Saved Posts", value: currentUser.savedPosts.toString(), icon: Bookmark },
    { label: "Liked Posts", value: feedStats.likedPosts.toString(), icon: Heart },
    { label: "Views This Week", value: `${(feedStats.viewsThisWeek / 1000).toFixed(1)}K`, icon: Eye },
  ]

  return (
    <div className="space-y-6 sticky top-4 h-fit">
      {/* Feed Stats Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Your Feed Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {feedStatsArray.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{stat.label}</span>
                </div>
                <span className="font-semibold text-sm">{stat.value}</span>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {feedQuickActions.map((action, index) => {
            const getIcon = (iconName: string) => {
              switch (iconName) {
                case 'Plus': return Plus
                case 'Edit': return Edit
                case 'Bookmark': return Bookmark
                case 'Heart': return Heart
                case 'BarChart2': return BarChart2
                case 'Settings': return Settings
                case 'Bell': return Bell
                default: return Plus
              }
            }
            const IconComponent = getIcon(action.icon)
            return (
              <Button 
                key={index}
                variant={action.variant || "outline"} 
                className="w-full justify-start bg-transparent"
                size="sm"
              >
                <IconComponent className="w-4 h-4 mr-2" />
                <span className="flex-1 text-left">{action.label}</span>
                {action.count && (
                  <Badge variant="secondary" className="ml-auto">
                    {action.count}
                  </Badge>
                )}
              </Button>
            )
          })}
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentFeedActivity.slice(0, 4).map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-xs">{activity.message}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </p>
              </div>
              {!activity.read && (
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Topics Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingTopics.slice(0, 5).map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${topic.color} rounded-full`}></div>
                  <div>
                    <span className="text-sm font-medium">{topic.name}</span>
                    <p className="text-xs text-green-600">{topic.growth}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{topic.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Users Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" />
            Suggested for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestedUsers.slice(0, 3).map((user, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {user.verified && (
                        <div className="absolute -bottom-1 -right-1">
                          <Badge variant="secondary" className="h-3 w-3 p-0 rounded-full bg-blue-500">
                            <Star className="h-2 w-2 text-white" />
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.designation}</p>
                      <p className="text-xs text-muted-foreground">{user.company}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Follow
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground ml-11">
                  {user.mutualConnections} mutual connections
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
