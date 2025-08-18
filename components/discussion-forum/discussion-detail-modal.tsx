"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VotingButtons } from "./voting-buttons"
import { ReplyCard } from "./reply-card"
import { MessageSquare, Clock, Send, MoreVertical, Edit, Trash2, Flag, Share, Pin, Lock } from "lucide-react"

interface Reply {
  id: number
  author: string
  authorRole: string
  avatar: string
  content: string
  likes: number
  dislikes: number
  createdAt: string
  userVote?: "up" | "down" | null
  isOwner?: boolean
}

interface Discussion {
  id: number
  title: string
  author: string
  authorRole: string
  avatar: string
  category: string
  content: string
  likes: number
  dislikes: number
  replies: Reply[]
  createdAt: string
  userVote?: "up" | "down" | null
}

interface DiscussionDetailModalProps {
  discussion: Discussion | null
  isOpen: boolean
  onClose: () => void
  isOwner?: boolean
  isAdmin?: boolean
}

export function DiscussionDetailModal({
  discussion,
  isOpen,
  onClose,
  isOwner = false,
  isAdmin = false,
}: DiscussionDetailModalProps) {
  const [newReply, setNewReply] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest")

  if (!discussion) return null

  const handleReplySubmit = async () => {
    if (!newReply.trim()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setNewReply("")
      console.log("Reply submitted:", newReply)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShare = () => {
    const url = `${window.location.origin}/dashboard/discussions/${discussion.id}`
    navigator.clipboard.writeText(url)
    console.log("Discussion link copied to clipboard")
  }

  const getSortedReplies = () => {
    const replies = [...discussion.replies]
    switch (sortBy) {
      case "oldest":
        return replies.reverse()
      case "popular":
        return replies.sort((a, b) => b.likes - a.likes)
      default:
        return replies
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {" "}
        {/* Responsive max-width and padding */}
        <DialogHeader>
          <div className="flex items-start justify-between">
            {" "}
            {/* Changed to items-start for better alignment on small screens */}
            <DialogTitle className="text-lg sm:text-xl font-semibold pr-4 sm:pr-8">
              {" "}
              {/* Responsive text size and padding */}
              {discussion.title}
            </DialogTitle>
            {/* Discussion Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleShare}>
                  <Share className="mr-2 h-4 w-4" />
                  Share Discussion
                </DropdownMenuItem>

                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pin className="mr-2 h-4 w-4" />
                      Pin Discussion
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Lock className="mr-2 h-4 w-4" />
                      Lock Discussion
                    </DropdownMenuItem>
                  </>
                )}

                {isOwner && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Discussion
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Discussion
                    </DropdownMenuItem>
                  </>
                )}

                {!isOwner && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-orange-600">
                      <Flag className="mr-2 h-4 w-4" />
                      Report Discussion
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          {/* Main Discussion */}
          <Card>
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
                  size="lg"
                />
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
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
                  <div className="flex flex-wrap items-center space-x-2 mb-2">
                    {" "}
                    {/* Flex-wrap for badges */}
                    <span className="font-semibold text-sm sm:text-base">{discussion.author}</span>{" "}
                    {/* Responsive text size */}
                    <span className="text-xs sm:text-sm text-gray-500">• {discussion.authorRole}</span>{" "}
                    {/* Responsive text size */}
                    <Badge variant="outline" className="text-xs">
                      {discussion.category}
                    </Badge>
                    {isOwner && (
                      <Badge variant="secondary" className="text-xs">
                        Author
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 mb-4 whitespace-pre-wrap">{discussion.content}</p>{" "}
                  {/* Responsive text size */}
                  <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                    {" "}
                    {/* Responsive text size and spacing */}
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {discussion.createdAt}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {discussion.replies.length} replies
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              {" "}
              {/* Flex-col on small, row on sm+ */}
              <h3 className="text-lg font-semibold">Replies ({discussion.replies.length})</h3>
              {/* Sort Options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                    {" "}
                    {/* Full width on small, auto on sm+ */}
                    Sort by: {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "Popular"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>Most Popular</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {getSortedReplies().map((reply) => (
              <ReplyCard key={reply.id} reply={reply} />
            ))}
          </div>

          {/* Reply Form */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <h4 className="font-medium">Add a reply</h4>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  {" "}
                  {/* Responsive spacing */}
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    {" "}
                    {/* Responsive avatar size */}
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                    <AvatarFallback>YU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="min-h-[100px]"
                      maxLength={500}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{newReply.length}/500</p>
                      <Button onClick={handleReplySubmit} disabled={!newReply.trim() || isSubmitting} size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting ? "Posting..." : "Post Reply"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
