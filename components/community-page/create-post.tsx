"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Video } from "lucide-react"

interface CreatePostProps {
  newPost: string
  setNewPost: (value: string) => void
  onCreatePost: () => void
  isJoined: boolean
}

export function CreatePost({ newPost, setNewPost, onCreatePost, isJoined }: CreatePostProps) {
  if (!isJoined) return null

  return (
    <Card>
      <CardContent className="pt-4 md:pt-6">
        <div className="flex gap-3">
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share something with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[60px] md:min-h-[80px] mb-3 text-sm md:text-base"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-1 md:gap-2">
                <Button variant="ghost" size="sm" className="text-xs md:text-sm h-7 md:h-8">
                  <ImageIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-xs md:text-sm h-7 md:h-8">
                  <Video className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Video
                </Button>
              </div>
              <Button
                onClick={onCreatePost}
                disabled={!newPost.trim()}
                size="sm"
                className="text-xs md:text-sm"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
