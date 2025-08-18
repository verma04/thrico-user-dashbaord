"use client"

import { Button } from "@/components/ui/button"

interface CommunityTypeSelectorProps {
  selectedPrivacy: string[]
  onTogglePrivacy: (privacy: string) => void
  onClearPrivacy: () => void
}

export function CommunityTypeSelector({
  selectedPrivacy,
  onTogglePrivacy,
  onClearPrivacy,
}: CommunityTypeSelectorProps) {
  return (
    <div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant={selectedPrivacy.length === 0 ? "default" : "outline"}
          onClick={onClearPrivacy}
          className="rounded-full"
        >
          Any type
        </Button>
        <Button
          variant={selectedPrivacy.includes("public") ? "default" : "outline"}
          onClick={() => onTogglePrivacy("public")}
          className="rounded-full"
        >
          Public
        </Button>
        <Button
          variant={selectedPrivacy.includes("private") ? "default" : "outline"}
          onClick={() => onTogglePrivacy("private")}
          className="rounded-full"
        >
          Private
        </Button>
      </div>
    </div>
  )
}
