"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare,
  Settings,
  Heart,
  Share2,
  Plus,
  BarChart3
} from "lucide-react"

interface CommunityStats {
  totalCommunities: number
  joinedCommunities: number
  createdCommunities: number
  totalMembers: number
}

interface TopCommunity {
  id: string
  name: string
  members: string
  rating: number
  category: string
  avatar?: string
}

interface CommunitiesSidebarProps {
  stats?: CommunityStats
}

export function CommunitiesSidebar({ stats }: CommunitiesSidebarProps) {
  const defaultStats: CommunityStats = {
    totalCommunities: 156,
    joinedCommunities: 12,
    createdCommunities: 3,
    totalMembers: 45280
  }

  const currentStats = stats || defaultStats

  const topCommunities: TopCommunity[] = [
    { 
      id: "1", 
      name: "Tech Innovators", 
      members: "12.5K", 
      rating: 4.8, 
      category: "Technology",
      avatar: "/placeholder.svg"
    },
    { 
      id: "2", 
      name: "Digital Artists", 
      members: "8.3K", 
      rating: 4.9, 
      category: "Art & Design",
      avatar: "/placeholder.svg"
    },
    { 
      id: "3", 
      name: "Startup Founders", 
      members: "15.2K", 
      rating: 4.7, 
      category: "Business",
      avatar: "/placeholder.svg"
    },
  ]

  const recentActivity = [
    { action: "Joined", community: "Web Developers", time: "2h ago" },
    { action: "Created", community: "React Enthusiasts", time: "1d ago" },
    { action: "Left", community: "Old Community", time: "3d ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Communities</span>
              <span className="font-semibold">{currentStats.totalCommunities}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Joined</span>
              <span className="font-semibold text-blue-600">{currentStats.joinedCommunities}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Created</span>
              <span className="font-semibold text-green-600">{currentStats.createdCommunities}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Members</span>
              <span className="font-semibold">{currentStats.totalMembers.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Community
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm" asChild>
              <a href="/dashboard/communities/manage">
                <Settings className="w-4 h-4 mr-2" />
                Manage Communities
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm" asChild>
              <a href="/dashboard/communities/analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm" asChild>
              <a href="/dashboard/communities/discover">
                <TrendingUp className="w-4 h-4 mr-2" />
                Discover More
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm" asChild>
              <a href="/dashboard/communities/settings">
                <Settings className="w-4 h-4 mr-2" />
                Community Settings
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Invite Friends
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Communities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Communities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCommunities.map((community, index) => (
              <div key={community.id} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-500">
                  {index + 1}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={community.avatar} />
                  <AvatarFallback>{community.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{community.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {community.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 ml-1">{community.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{community.members} members</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                  <MessageSquare className="w-3 h-3 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span>{" "}
                    <span className="text-gray-600">{activity.community}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Community Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Engage regularly with community posts to build meaningful connections.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                🎯 <strong>Goal:</strong> Join 5 new communities this month to expand your network.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
