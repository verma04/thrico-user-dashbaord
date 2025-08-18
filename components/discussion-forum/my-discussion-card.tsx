"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  TrendingUp,
  Clock,
  Edit,
  Trash2,
  MoreVertical,
  BarChart3,
  Share,
} from "lucide-react"
import { DiscussionDetailModal } from "./discussion-detail-modal"
import { EditDiscussionModal } from "./edit-discussion-modal"
import { DeleteConfirmModal } from "./delete-confirm-modal"

interface MyDiscussion {
  id: number
  title: string
  category: string
  content: string
  likes: number
  dislikes: number
  replies: number
  views: number
  createdAt: string
  lastActivity: string
  status: "active" | "closed"
  isHot: boolean
}

interface MyDiscussionCardProps {
  discussion: MyDiscussion
}

export function MyDiscussionCard({ discussion }: MyDiscussionCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleShare = () => {
    const url = `${window.location.origin}/dashboard/discussions/${discussion.id}`
    navigator.clipboard.writeText(url)
    console.log("Discussion link copied to clipboard")
  }

  // Mock detailed discussion data for the modal
  const detailedDiscussion = {
    id: discussion.id,
    title: discussion.title,
    author: "Alex Thompson",
    authorRole: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    category: discussion.category,
    content: discussion.content,
    likes: discussion.likes,
    dislikes: discussion.dislikes,
    createdAt: discussion.createdAt,
    userVote: null as const,
    replies: [
      {
        id: 1,
        author: "Sarah Chen",
        authorRole: "Senior Developer",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Great question! I'd recommend starting with Node.js since you already know JavaScript.",
        likes: 8,
        dislikes: 0,
        createdAt: "1 day ago",
        userVote: null as const,
      },
      {
        id: 2,
        author: "Mike Johnson",
        authorRole: "Full Stack Developer",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "I agree with Sarah. Also consider learning Express.js and a database like PostgreSQL.",
        likes: 6,
        dislikes: 0,
        createdAt: "1 day ago",
        userVote: null as const,
      },
    ],
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          {" "}
          {/* Responsive padding */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            {" "}
            {/* Flex-col on small, row on sm+ */}
            <div className="flex-1 min-w-0">
              {" "}
              {/* Ensure content doesn't overflow */}
              <div className="flex flex-wrap items-center space-x-2 mb-2">
                {" "}
                {/* Flex-wrap for badges */}
                <h3
                  className="font-semibold text-base sm:text-lg hover:text-blue-600 cursor-pointer"
                  onClick={() => setIsDetailOpen(true)}
                >
                  {discussion.title}
                </h3>
                {discussion.isHot && (
                  <Badge variant="destructive" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {discussion.category}
                </Badge>
                <Badge variant={discussion.status === "active" ? "default" : "secondary"} className="text-xs">
                  {discussion.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{discussion.content}</p>{" "}
              {/* Responsive text size */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {" "}
                {/* Responsive grid columns */}
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  {" "}
                  {/* Responsive text size */}
                  <ThumbsUp className="w-4 h-4" />
                  <span>{discussion.likes} likes</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  {" "}
                  {/* Responsive text size */}
                  <MessageSquare className="w-4 h-4" />
                  <span>{discussion.replies} replies</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  {" "}
                  {/* Responsive text size */}
                  <Eye className="w-4 h-4" />
                  <span>{discussion.views} views</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  {" "}
                  {/* Responsive text size */}
                  <Clock className="w-4 h-4" />
                  <span>{discussion.lastActivity}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                {" "}
                {/* Flex-col on small, row on sm+ */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsDetailOpen(true)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Discussion
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                      {" "}
                      {/* Shrink-0 to prevent shrinking */}
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleShare}>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <DiscussionDetailModal
        discussion={detailedDiscussion}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isOwner={true}
      />

      <EditDiscussionModal
        discussion={{
          id: discussion.id,
          title: discussion.title,
          excerpt: discussion.content,
          category: discussion.category,
        }}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      <DeleteConfirmModal
        discussionId={discussion.id}
        discussionTitle={discussion.title}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
    </>
  )
}
