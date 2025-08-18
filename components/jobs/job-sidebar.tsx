import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Briefcase, Bookmark, BarChart2 } from "lucide-react"

// Mock data for sidebar components
const jobStats = [
  { label: "Total Jobs", value: "5,678" },
  { label: "New Today", value: "78" },
  { label: "Your Applications", value: "15" },
  { label: "Saved Jobs", value: "23" },
]

const popularCategories = [
  { name: "Software Dev", count: 1234, color: "bg-blue-500" },
  { name: "Design", count: 876, color: "bg-green-500" },
  { name: "Marketing", count: 654, color: "bg-purple-500" },
  { name: "Sales", count: 432, color: "bg-orange-500" },
  { name: "HR", count: 210, color: "bg-red-500" },
]

export function JobSidebar() {
  return (
    <div className="space-y-6">
      {/* Job Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className="font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Categories Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Post a New Job
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Briefcase className="w-4 h-4 mr-2" />
              My Applications
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved Jobs
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <BarChart2 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
