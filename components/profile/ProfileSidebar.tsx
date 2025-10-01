import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export function ProfileSidebar({ userRank }: { userRank: string }) {
  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Strength</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>All-Star</span>
                <span>89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>✅ Profile Photo</span>
              </div>
              <div className="flex items-center justify-between">
                <span>✅ Work Experience</span>
              </div>
              <div className="flex items-center justify-between">
                <span>✅ Skills & Endorsements</span>
              </div>
              <div className="flex items-center justify-between">
                <span>❌ Portfolio Projects</span>
              </div>
            </div>
            <Button size="sm" className="w-full">
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Gamification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gamification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <div>
              <p className="font-semibold text-sm">Current Rank</p>
              <p className="text-lg font-bold text-gray-800">{userRank}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "Top Contributor", description: "Most helpful posts this month", icon: "🏆" },
              { title: "Community Builder", description: "Connected 100+ members", icon: "🤝" },
              { title: "Event Organizer", description: "Hosted 5 successful events", icon: "🎪" },
            ].map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{achievement.title}</p>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}