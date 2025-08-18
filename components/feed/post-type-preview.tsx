"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, X, PartyPopper, Briefcase, BarChart3, MessageCircle } from "lucide-react"
import { usePostStore } from "@/lib/post-store"
import { PollPreview } from "./poll-preview"
import { PollCreationModal } from "./poll-creation-form"
import { CelebrationPreview } from "./celebration-preview"
import { CelebrationCreationModal } from "./celebration-creation-modal"
import { ForumPostPreview } from "./discussion-forum-preview"
import { DiscussionCreationModal } from "./discussion-creation-modal"

export function PostTypePreview() {
  const selectedPostType = usePostStore((state) => state.selectedPostType)
  const pollData = usePostStore((state) => state.pollData)
  const forum = usePostStore((state) => state.forum)
  const celebration = usePostStore((state) => state.celebration)
  const { setSelectedPostType, setPollData, setForum, setCelebration } = usePostStore()

  const [showPollModal, setShowPollModal] = useState(false)
  const [showCelebrationModal, setShowCelebrationModal] = useState(false)
  const [showDiscussionModal, setShowDiscussionModal] = useState(false)

  if (!selectedPostType) return null

  const getIcon = () => {
    switch (selectedPostType) {
      case "celebrate":
        return <PartyPopper className="h-4 w-4" />
      case "job":
        return <Briefcase className="h-4 w-4" />
      case "poll":
        return <BarChart3 className="h-4 w-4" />
      case "discussion":
        return <MessageCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleRemove = () => {
    setSelectedPostType(null)
    setPollData(null)
    setForum(null)
    setCelebration(null)
  }

  const handleEditPoll = () => {
    setShowPollModal(true)
  }

  return (
    <>
      {selectedPostType === "poll" && pollData ? (
        <PollPreview
          pollData={pollData}
          onEdit={handleEditPoll}
          onRemove={() => {
            setPollData(null)
            setSelectedPostType(null)
          }}
        />
      ) : selectedPostType === "discussion" && forum ? (
        <ForumPostPreview
          data={forum}
          onEdit={() => setShowDiscussionModal(true)}
          onRemove={() => {
            setForum(null)
            setSelectedPostType(null)
          }}
        />
      ) : selectedPostType === "celebrate" && celebration ? (
        <CelebrationPreview
          onEdit={() => setShowCelebrationModal(true)}
          onRemove={() => {
            setCelebration(null)
            setSelectedPostType(null)
          }}
        />
      ) : (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="gap-1">
                {getIcon()}
                {selectedPostType.charAt(0).toUpperCase() + selectedPostType.slice(1)}
              </Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => {}}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleRemove}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedPostType === "discussion" && forum && (
              <div className="space-y-2">
                <p className="font-medium">{forum.title}</p>
                <p className="text-sm text-muted-foreground">{forum.content}</p>
                {forum.category && <Badge variant="outline">{forum.category}</Badge>}
                {forum.isAnonymous && <Badge variant="outline">Anonymous</Badge>}
              </div>
            )}

            {selectedPostType === "celebrate" && celebration && (
              <div className="space-y-2">
                <p className="font-medium">Celebrating: {celebration.type}</p>
                {celebration.image && (
                  <img
                    src={celebration.image || "/placeholder.svg"}
                    alt="Celebration"
                    className="w-full h-32 object-cover rounded"
                  />
                )}
              </div>
            )}

            {selectedPostType === "job" && (
              <div className="text-sm text-muted-foreground">Job posting details will be added here</div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Poll Creation Modal */}
      <PollCreationModal open={showPollModal} onOpenChange={setShowPollModal} initialData={pollData || undefined} />

      {/* Celebration Creation Modal */}
      <CelebrationCreationModal open={showCelebrationModal} onOpenChange={setShowCelebrationModal} />

      {/* Discussion Creation Modal */}
      <DiscussionCreationModal
        open={showDiscussionModal}
        onOpenChange={setShowDiscussionModal}
        initialData={forum || undefined}
      />
    </>
  )
}
