import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Users,
  Heart,
  MessageSquare,
  Eye
} from "lucide-react"

interface ProfileStatsProps {
  className?: string
}

export function ProfileStats({ className }: ProfileStatsProps) {
  const monthlyGoals = [
    { name: "Posts Created", current: 12, target: 15, progress: 80 },
    { name: "Engagement Rate", current: 8.5, target: 10, progress: 85 },
    { name: "New Followers", current: 45, target: 50, progress: 90 },
  ]

  const achievements = [
    { name: "Content Creator", level: "Gold", description: "Posted 100+ quality posts" },
    { name: "Community Builder", level: "Silver", description: "Helped 50+ members" },
    { name: "Engagement Master", level: "Bronze", description: "Maintained 5%+ engagement" },
  ]

  const weeklyStats = [
    { label: "Profile Views", value: 156, change: "+12%", icon: Eye },
    { label: "Post Likes", value: 234, change: "+8%", icon: Heart },
    { label: "Comments", value: 45, change: "+15%", icon: MessageSquare },
    { label: "Followers", value: 12, change: "+5%", icon: Users },
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Weekly Performance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            This Week's Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeklyStats.map((stat, index) => {
            const IconComponent = stat.icon
            const isPositive = stat.change.startsWith('+')
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{stat.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{stat.value}</p>
                  <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Monthly Goals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4" />
            Monthly Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {monthlyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{achievement.name}</p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      achievement.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                      achievement.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {achievement.level}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Quick Boosts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Posts
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Users className="w-4 h-4 mr-2" />
            Find Collaborators
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <TrendingUp className="w-4 h-4 mr-2" />
            Boost Engagement
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
