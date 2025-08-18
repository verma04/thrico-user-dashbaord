"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, Eye, Plus } from "lucide-react"
import { CreateDiscussionModal } from "./create-discussion-modal"
import { MyDiscussionCard } from "./my-discussion-card"

const myDiscussions = [
  {
    id: 4,
    title: "Help: Transitioning from frontend to full-stack",
    category: "Help",
    content:
      "I've been doing frontend for 2 years and want to expand to full-stack. What backend technologies should I learn first? I'm comfortable with React and JavaScript, but I'm not sure where to start with backend development.",
    likes: 28,
    dislikes: 1,
    replies: 12,
    views: 156,
    createdAt: "2024-01-17",
    lastActivity: "8 hours ago",
    status: "active",
    isHot: false,
  },
  {
    id: 6,
    title: "My journey learning React in 2024",
    category: "Technology",
    content:
      "Started learning React 6 months ago and wanted to share my experience and resources that helped me. Here's what I learned and the mistakes I made along the way.",
    likes: 15,
    dislikes: 0,
    replies: 8,
    views: 89,
    createdAt: "2024-01-18",
    lastActivity: "3 hours ago",
    status: "active",
    isHot: false,
  },
  {
    id: 7,
    title: "Best VS Code extensions for productivity",
    category: "Technology",
    content:
      "After years of development, here are the VS Code extensions that have significantly improved my productivity. Some of these are game-changers!",
    likes: 42,
    dislikes: 2,
    replies: 23,
    views: 234,
    createdAt: "2024-01-10",
    lastActivity: "1 day ago",
    status: "active",
    isHot: true,
  },
  {
    id: 8,
    title: "Freelancing tips for new developers",
    category: "Career",
    content:
      "I've been freelancing for 2 years now. Here are some tips that helped me get started and build a sustainable freelance career.",
    likes: 67,
    dislikes: 3,
    replies: 34,
    views: 445,
    createdAt: "2024-01-05",
    lastActivity: "2 days ago",
    status: "closed",
    isHot: false,
  },
]

const myStats = {
  totalDiscussions: 4,
  totalLikes: 152,
  totalReplies: 77,
  totalViews: 924,
  thisMonth: {
    discussions: 2,
    likes: 43,
    replies: 20,
  },
}

function MyDiscussionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const getFilteredDiscussions = () => {
    switch (activeTab) {
      case "active":
        return myDiscussions.filter((d) => d.status === "active")
      case "closed":
        return myDiscussions.filter((d) => d.status === "closed")
      case "popular":
        return [...myDiscussions].sort((a, b) => b.likes - a.likes)
      default:
        return myDiscussions
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Discussions</h1>
          <p className="text-sm md:text-base text-gray-600">Manage your discussions and track engagement</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Discussion
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Discussions</p>
                <p className="text-2xl font-bold">{myStats.totalDiscussions}</p>
                <p className="text-xs text-green-600">+{myStats.thisMonth.discussions} this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold">{myStats.totalLikes}</p>
                <p className="text-xs text-green-600">+{myStats.thisMonth.likes} this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Replies</p>
                <p className="text-2xl font-bold">{myStats.totalReplies}</p>
                <p className="text-xs text-green-600">+{myStats.thisMonth.replies} this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{myStats.totalViews}</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Discussions Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Discussions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap justify-center sm:justify-start gap-1 p-1">
              <TabsTrigger value="all" className="flex-1 sm:flex-auto text-sm sm:text-base">
                All ({myDiscussions.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="flex-1 sm:flex-auto text-sm sm:text-base">
                Active ({myDiscussions.filter((d) => d.status === "active").length})
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex-1 sm:flex-auto text-sm sm:text-base">
                Closed ({myDiscussions.filter((d) => d.status === "closed").length})
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex-1 sm:flex-auto text-sm sm:text-base">
                Popular
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {getFilteredDiscussions().map((discussion) => (
                  <MyDiscussionCard key={discussion.id} discussion={discussion} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <CreateDiscussionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}

export default MyDiscussionsPage
