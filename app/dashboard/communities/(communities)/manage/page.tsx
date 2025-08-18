"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Users, 
  BarChart3, 
  Shield, 
  Edit,
  Trash2,
  Plus,
  Crown,
  UserMinus,
  AlertTriangle
} from "lucide-react"

interface ManagedCommunity {
  id: string
  name: string
  description: string
  members: number
  posts: number
  role: "admin" | "co-admin"
  status: "active" | "pending" | "suspended"
  avatar: string
  createdAt: string
  lastActivity: string
}

export default function ManageCommunitiesPage() {
  const [managedCommunities] = useState<ManagedCommunity[]>([
    {
      id: "1",
      name: "Tech Source Club",
      description: "A community for tech lovers to explore, learn, and connect.",
      members: 1100,
      posts: 900,
      role: "admin",
      status: "active",
      avatar: "/placeholder.svg",
      createdAt: "2024-01-04",
      lastActivity: "2 hours ago"
    },
    {
      id: "2",
      name: "Startup Founders Hub",
      description: "Building the future together. Connect with fellow entrepreneurs.",
      members: 567,
      posts: 420,
      role: "admin",
      status: "active",
      avatar: "/placeholder.svg",
      createdAt: "2024-03-20",
      lastActivity: "1 day ago"
    },
    {
      id: "3",
      name: "Fitness Warriors",
      description: "Transform your body and mind. Share workouts, nutrition tips, and motivation.",
      members: 780,
      posts: 340,
      role: "co-admin",
      status: "active",
      avatar: "/placeholder.svg",
      createdAt: "2024-05-25",
      lastActivity: "5 hours ago"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "suspended": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    return role === "admin" ? <Crown className="w-4 h-4" /> : <Shield className="w-4 h-4" />
  }

  return (
    <div className="flex gap-6 p-4 sm:p-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Communities</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Oversee and manage your communities</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Community
          </Button>
        </div>

        <Tabs defaultValue="my-communities" className="w-full">
          <TabsList className="flex justify-start gap-1 p-1 mb-6">
            <TabsTrigger value="my-communities" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              My Communities
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Moderation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-communities">
            <div className="space-y-4">
              {managedCommunities.map((community) => (
                <Card key={community.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={community.avatar} />
                          <AvatarFallback>{community.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{community.name}</h3>
                            <Badge className={`flex items-center gap-1 ${getStatusColor(community.status)}`}>
                              {getRoleIcon(community.role)}
                              {community.role}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(community.status)}>
                              {community.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{community.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {community.members.toLocaleString()} members
                            </div>
                            <div className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" />
                              {community.posts} posts
                            </div>
                            <div>Last activity: {community.lastActivity}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Analytics
                        </Button>
                        {community.role === "admin" && (
                          <Button variant="outline" size="sm" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Total Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,447</div>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Total Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,660</div>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Active Communities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-sm text-gray-600">All communities active</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Community Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {managedCommunities.map((community) => (
                    <div key={community.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={community.avatar} />
                          <AvatarFallback>{community.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{community.name}</h4>
                          <p className="text-sm text-gray-600">{community.members} members</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{community.posts} posts</div>
                        <div className="text-sm text-gray-600">Growth: +5%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Pending Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
                      <div>
                        <h4 className="font-medium">Reported Post in Tech Source Club</h4>
                        <p className="text-sm text-gray-600">Inappropriate content reported by 3 users</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm" variant="destructive">Remove</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                      <div>
                        <h4 className="font-medium">New Member Request</h4>
                        <p className="text-sm text-gray-600">John Doe wants to join Startup Founders Hub</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Approve</Button>
                        <Button size="sm" variant="destructive">Reject</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                      <UserMinus className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Manage Members</div>
                        <div className="text-sm text-gray-600">Remove or promote members</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                      <Settings className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Community Settings</div>
                        <div className="text-sm text-gray-600">Update rules and permissions</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="w-80 shrink-0 hidden lg:block">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Communities Managed</span>
                  <span className="font-semibold">{managedCommunities.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold">
                    {managedCommunities.reduce((sum, c) => sum + c.members, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold">
                    {managedCommunities.reduce((sum, c) => sum + c.posts, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Admin Communities</span>
                  <span className="font-semibold text-blue-600">
                    {managedCommunities.filter(c => c.role === "admin").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">New member joined</div>
                  <div className="text-gray-600">Tech Source Club • 2h ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Post reported</div>
                  <div className="text-gray-600">Startup Founders Hub • 4h ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Community settings updated</div>
                  <div className="text-gray-600">Fitness Warriors • 1d ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
