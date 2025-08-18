"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Clock,
  ThumbsUp,
  TrendingUp,
  Crown,
  MoreVertical,
  Edit,
  Trash2,
  Flag,
  Share,
} from "lucide-react"
import { VotingButtons } from "./voting-buttons"
import { DiscussionDetailModal } from "./discussion-detail-modal"
import { EditDiscussionModal } from "./edit-discussion-modal"
import { ReportModal } from "./report-modal"
import { DeleteConfirmModal } from "./delete-confirm-modal"

interface Discussion {
  id: number
  title: string
  author: string
  authorRole: string
  avatar: string
  category: string
  replies: number
  likes: number
  dislikes: number
  lastReply: string
  lastReplyBy: string
  excerpt: string
  content?: string
  createdAt?: string
  isHot: boolean
  userVote?: "up" | "down" | null
  isMyPost?: boolean
  activityScore?: number
}

interface DiscussionCardProps {
  discussion: Discussion
  showOwnerBadge?: boolean
  currentUserId?: string
  isAdmin?: boolean
}

export function DiscussionCard({
  discussion,
  showOwnerBadge = false,
  currentUserId = "current-user-id",
  isAdmin = false,
}: DiscussionCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const isOwner = discussion.isMyPost || discussion.author === "Alex Thompson" // Mock current user
  const canEdit = isOwner
  const canDelete = isOwner || isAdmin
  const canReport = !isOwner

  const handleShare = () => {
    const url = `${window.location.origin}/dashboard/discussions/${discussion.id}`
    navigator.clipboard.writeText(url)
    // You could show a toast notification here
    console.log("Discussion link copied to clipboard")
  }

  const handleEdit = () => {
    setIsEditOpen(true)
  }

  const handleDelete = () => {
    setIsDeleteOpen(true)
  }

  const handleReport = () => {
    setIsReportOpen(true)
  }

  // Mock detailed discussion data for the modal
  const detailedDiscussion = {
    ...discussion,
    content: discussion.excerpt + " This is the full content of the discussion with more details and context.",
    createdAt: "2 days ago",
    replies: [
      {
        id: 1,
        author: "Sarah Chen",
        authorRole: "Senior Developer",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Great points! I especially agree with the part about setting boundaries.",
        likes: 12,
        dislikes: 1,
        createdAt: "1 day ago",
        userVote: null as const,
      },
      {
        id: 2,
        author: "Mike Johnson",
        authorRole: "Product Manager",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Thanks for sharing this. I've been struggling with remote work productivity lately.",
        likes: 8,
        dislikes: 0,
        createdAt: "1 day ago",
        userVote: "up" as const,
      },
    ],
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          {" "}
          {/* Responsive padding */}
          <div className="flex items-start space-x-3 sm:space-x-4">
            {" "}
            {/* Responsive spacing */}
            <VotingButtons
              initialLikes={discussion.likes}
              initialDislikes={discussion.dislikes}
              initialUserVote={discussion.userVote}
            />
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
              {" "}
              {/* Responsive avatar size */}
              <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
              <AvatarFallback>
                {discussion.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              {" "}
              {/* Ensure content doesn't overflow */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2 sm:gap-0">
                {" "}
                {/* Flex-col on small, row on sm+ */}
                <div className="flex flex-wrap items-center space-x-2">
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
                  {showOwnerBadge && discussion.isMyPost && (
                    <Badge variant="secondary" className="text-xs">
                      <Crown className="w-3 h-3 mr-1" />
                      Your Post
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {discussion.category}
                  </Badge>
                </div>
                {/* Action Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                      {" "}
                      {/* Shrink-0 to prevent shrinking */}
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleShare}>
                      <Share className="mr-2 h-4 w-4" />
                      Share Discussion
                    </DropdownMenuItem>

                    {canEdit && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleEdit}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Discussion
                        </DropdownMenuItem>
                      </>
                    )}

                    {canDelete && (
                      <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Discussion
                      </DropdownMenuItem>
                    )}

                    {canReport && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleReport} className="text-orange-600">
                          <Flag className="mr-2 h-4 w-4" />
                          Report Discussion
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-gray-600 mb-3">{discussion.excerpt}</p> {/* Responsive text size */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                {" "}
                {/* Flex-col on small, row on sm+ */}
                <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                  {" "}
                  {/* Responsive text size and spacing */}
                  <span>
                    By {discussion.author} • {discussion.authorRole}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {discussion.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {discussion.replies} replies
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {" "}
                  {/* Responsive text size */}
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Last reply {discussion.lastReply} by {discussion.lastReplyBy}
                  </span>
                </div>
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
      />

      <EditDiscussionModal discussion={discussion} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      <ReportModal
        discussionId={discussion.id}
        discussionTitle={discussion.title}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
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
