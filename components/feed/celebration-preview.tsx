"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, X, PartyPopper } from "lucide-react"
import { usePostStore } from "@/lib/post-store"

interface CelebrationPreviewProps {
  onEdit?: () => void
  onRemove?: () => void
}

export function CelebrationPreview({ onEdit, onRemove }: CelebrationPreviewProps) {
  const celebration = usePostStore((state) => state.celebration)

  if (!celebration) return null

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        {/* Header with actions */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="gap-1">
            <PartyPopper className="h-3 w-3" />
            Celebration
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

        {/* Celebration content */}
        <div className="space-y-4">
          <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
            <img src={celebration.image || ""} alt="Celebration" className="w-full h-full object-cover" />
          </div>

          <div>
            <p className="font-medium text-foreground">Celebrating: {celebration.type?.replace("_", " ")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
