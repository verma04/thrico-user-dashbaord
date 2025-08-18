"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VotingButtons } from "./voting-buttons"
import { MoreVertical, MessageSquare, Share, Edit, Trash2, Flag } from "lucide-react"

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

interface ReplyCardProps {
  reply: Reply
  currentUserId?: string
  isAdmin?: boolean
}

export function ReplyCard({ reply, currentUserId = "current-user", isAdmin = false }: ReplyCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(reply.content)

  const isOwner = reply.isOwner || reply.author === "Alex Thompson" // Mock current user
  const canEdit = isOwner
  const canDelete = isOwner || isAdmin
  const canReport = !isOwner

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    // Save edit logic here
    console.log("Saving edit:", editContent)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditContent(reply.content)
    setIsEditing(false)
  }

  const handleDelete = () => {
    console.log("Deleting reply:", reply.id)
  }

  const handleReport = () => {
    console.log("Reporting reply:", reply.id)
  }

  const handleReply = () => {
    console.log("Replying to:", reply.id)
  }

  const handleShare = () => {
    const url = `${window.location.origin}/dashboard/discussions/reply/${reply.id}`
    navigator.clipboard.writeText(url)
    console.log("Reply link copied to clipboard")
  }

  return (
    <Card className="ml-0 sm:ml-4">
      {" "}
      {/* Adjusted margin for small screens */}
      <CardContent className="p-4">
        <div className="flex items-start space-x-3 sm:space-x-4">
          {" "}
          {/* Responsive spacing */}
          <VotingButtons
            initialLikes={reply.likes}
            initialDislikes={reply.dislikes}
            initialUserVote={reply.userVote}
            size="sm"
          />
          <Avatar className="w-8 h-8">
            <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
            <AvatarFallback className="text-xs">
              {reply.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            {" "}
            {/* Ensure content doesn't overflow */}
            <div className="flex items-start justify-between mb-2">
              {" "}
              {/* Changed to items-start for better alignment on small screens */}
              <div className="flex flex-wrap items-center space-x-2">
                {" "}
                {/* Flex-wrap for badges */}
                <span className="font-medium text-sm">{reply.author}</span>
                <span className="text-xs text-gray-500">• {reply.authorRole}</span>
                <span className="text-xs text-gray-500">{reply.createdAt}</span>
                {isOwner && (
                  <Badge variant="secondary" className="text-xs">
                    You
                  </Badge>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0">
                    {" "}
                    {/* Shrink-0 to prevent shrinking */}
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={handleReply}>
                    {/* Replace with actual icon */}
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    {/* Replace with actual icon */}
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>

                  {canEdit && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleEdit}>
                        {/* Replace with actual icon */}
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </>
                  )}

                  {canDelete && (
                    <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                      {/* Replace with actual icon */}
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  )}

                  {canReport && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleReport} className="text-orange-600">
                        {/* Replace with actual icon */}
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm resize-y min-h-[80px]" // Added resize-y and min-h
                  rows={3}
                />
                <div className="flex items-center space-x-2">
                  <Button size="sm" onClick={handleSaveEdit}>
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{reply.content}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
