"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, X, MessageSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface PostFormData {
  title: string
  content: string
  category: string | null
  isAnonymous: boolean
}

interface ForumPostPreviewProps {
  data: PostFormData
  onEdit?: () => void
  onRemove?: () => void
}

export function ForumPostPreview({ data, onEdit, onRemove }: ForumPostPreviewProps) {
  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        {/* Header with actions */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="gap-1">
            <MessageSquare className="h-3 w-3" />
            Discussion
          </Badge>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onRemove && (
              <Button variant="ghost" size="sm" onClick={onRemove}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Post Header */}
        <div className="flex items-center justify-between mb-4">
          {data?.category && (
            <Badge variant="outline" className="mb-2">
              {data.category}
            </Badge>
          )}
        </div>

        <Separator className="mb-4" />

        {/* Post Content */}
        <div className="space-y-4">
          {data?.title && <h3 className="text-xl font-bold text-foreground leading-7">{data.title}</h3>}

          {data?.content && <p className="text-muted-foreground leading-6">{data.content}</p>}

          {!data?.title && !data?.content && (
            <div className="py-10 text-center">
              <p className="text-muted-foreground italic">Your discussion content will appear here...</p>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        {/* Post Footer */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>0 replies</span>
          <span>0 likes</span>
          <span>0 views</span>
        </div>
      </CardContent>
    </Card>
  )
}
