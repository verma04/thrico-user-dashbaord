"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
  Download,
  Filter
} from "lucide-react"

export default function CommunityAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedCommunity, setSelectedCommunity] = useState("all")

  const communities = [
    { id: "all", name: "All Communities" },
    { id: "1", name: "Tech Source Club" },
    { id: "2", name: "Startup Founders Hub" },
    { id: "3", name: "Fitness Warriors" },
  ]

  const metrics = [
    {
      title: "Total Members",
      value: "2,447",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Posts",
      value: "1,660",
      change: "+8%",
      trend: "up",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      title: "Total Views",
      value: "18.5K",
      change: "+15%",
      trend: "up",
      icon: Eye,
      color: "text-purple-600"
    },
    {
      title: "Engagement Rate",
      value: "68%",
      change: "-3%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ]

  const topPosts = [
    {
      id: 1,
      title: "How to Build Scalable React Applications",
      community: "Tech Source Club",
      author: "Sarah Chen",
      views: 1250,
      likes: 89,
      comments: 23,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Startup Funding: Series A to IPO Journey",
      community: "Startup Founders Hub",
      author: "Mike Johnson",
      views: 987,
      likes: 67,
      comments: 34,
      date: "1 day ago"
    },
    {
      id: 3,
      title: "30-Day Fitness Challenge Results",
      community: "Fitness Warriors",
      author: "Alex Rodriguez",
      views: 756,
      likes: 92,
      comments: 18,
      date: "3 days ago"
    }
  ]

  const communityGrowth = [
    {
      name: "Tech Source Club",
      members: 1100,
      growth: "+15%",
      posts: 145,
      engagement: "72%"
    },
    {
      name: "Startup Founders Hub",
      members: 567,
      growth: "+8%",
      posts: 89,
      engagement: "65%"
    },
    {
      name: "Fitness Warriors",
      members: 780,
      growth: "+12%",
      posts: 67,
      engagement: "58%"
    }
  ]

  return (
    <div className="flex gap-6 p-4 sm:p-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Community Analytics</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Track performance and engagement across your communities</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select community" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community) => (
                  <SelectItem key={community.id} value={community.id}>
                    {community.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
                <SelectItem value="90d">90 days</SelectItem>
                <SelectItem value="1y">1 year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
            return (
              <Card key={metric.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{metric.value}</span>
                        <div className={`flex items-center gap-1 text-sm ${
                          metric.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          <TrendIcon className="w-4 h-4" />
                          {metric.change}
                        </div>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex justify-start gap-1 p-1 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="content">Content Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityGrowth.map((community) => (
                      <div key={community.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{community.name}</h4>
                          <p className="text-sm text-gray-600">{community.members.toLocaleString()} members</p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-600 font-medium">{community.growth}</div>
                          <div className="text-sm text-gray-600">{community.posts} posts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{post.community} • {post.author}</span>
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </span>
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">68%</div>
                    <div className="text-sm text-gray-600 mt-1">Average Engagement Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">4.2</div>
                    <div className="text-sm text-gray-600 mt-1">Posts per Active User</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">2.8</div>
                    <div className="text-sm text-gray-600 mt-1">Comments per Post</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Member Growth Rate</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>This Week</span>
                        <span className="text-green-600">+12%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>This Month</span>
                        <span className="text-green-600">+35%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>This Quarter</span>
                        <span className="text-green-600">+89%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Content Growth</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Posts This Week</span>
                        <span>47</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Posts This Month</span>
                        <span>203</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Posts</span>
                        <span>1,660</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPosts.map((post) => (
                    <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{post.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Badge variant="outline">{post.community}</Badge>
                          <span>by {post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views} views
                          </span>
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="w-80 shrink-0 hidden lg:block">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">Peak Activity</div>
                  <div className="text-xs text-blue-600">Tuesdays at 2-4 PM</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Best Performing</div>
                  <div className="text-xs text-green-600">Tech tutorials get 2x engagement</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm font-medium text-orange-800">Opportunity</div>
                  <div className="text-xs text-orange-600">Video content underutilized</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Member Report (CSV)
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Engagement Report (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Growth Report (Excel)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
