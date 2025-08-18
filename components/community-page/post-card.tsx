"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2, MoreHorizontal } from "lucide-react"
import type { Post } from "@/types/community"

interface PostCardProps {
  post: Post
  onLike: (postId: number) => void
}

export function PostCard({ post, onLike }: PostCardProps) {
  return (
    <Card>
      <CardContent className="pt-4 md:pt-6">
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-sm md:text-base">{post.author.name}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-xs md:text-sm text-gray-600">{post.timestamp}</p>
                  <Badge variant="outline" className="text-xs">
                    {post.author.role}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm md:text-base text-gray-900 mb-3">{post.content}</p>

            {post.image && (
              <div className="mb-3">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post content"
                  className="rounded-lg max-w-full h-auto"
                />
              </div>
            )}

            <div className="flex items-center gap-3 md:gap-4 pt-3 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(post.id)}
                className={`text-xs md:text-sm h-7 md:h-8 ${post.isLiked ? "text-red-600" : ""}`}
              >
                <Heart
                  className={`w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 ${post.isLiked ? "fill-current" : ""}`}
                />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-xs md:text-sm h-7 md:h-8">
                <MessageSquare className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="text-xs md:text-sm h-7 md:h-8">
                <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
