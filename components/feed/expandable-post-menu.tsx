"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, X, PartyPopper, Briefcase, BarChart3, MessageCircle } from "lucide-react"
import { usePostStore } from "@/lib/post-store"
import { ImageUpload } from "./image-upload"
import { PollCreationModal } from "./poll-creation-form"
import { CelebrationCreationModal } from "./celebration-creation-modal"
import { DiscussionCreationModal } from "./discussion-creation-modal"

interface PostOption {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  color: string
}

const postOptions: PostOption[] = [
  {
    id: "celebrate",
    icon: PartyPopper,
    label: "Celebrate",
    color: "#f59e0b",
  },
  {
    id: "job",
    icon: Briefcase,
    label: "Job",
    color: "#3b82f6",
  },
  {
    id: "poll",
    icon: BarChart3,
    label: "Poll",
    color: "#10b981",
  },
  {
    id: "discussion",
    icon: MessageCircle,
    label: "Discussion",
    color: "#8b5cf6",
  },
]

export function ExpandablePostMenu() {
  const isExpanded = usePostStore((state) => state.isMenuExpanded)
  const selectedPostType = usePostStore((state) => state.selectedPostType)
  const pollData = usePostStore((state) => state.pollData)
  const celebrationData = usePostStore((state) => state.celebrationData)
  const forum = usePostStore((state) => state.forum)
  const { toggleMenu, closeMenu, selectPostType } = usePostStore()

  const [showPollModal, setShowPollModal] = useState(false)
  const [showCelebrationModal, setShowCelebrationModal] = useState(false)
  const [showDiscussionModal, setShowDiscussionModal] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && !(event.target as Element).closest(".post-menu")) {
        closeMenu()
      }
    }

    if (isExpanded) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isExpanded, closeMenu])

  const handleOptionSelect = (optionId: string) => {
    if (optionId === "poll") {
      closeMenu()
      setShowPollModal(true)
    } else if (optionId === "celebrate") {
      closeMenu()
      setShowCelebrationModal(true)
    } else if (optionId === "discussion") {
      closeMenu()
      setShowDiscussionModal(true)
    } else {
      selectPostType(optionId as any)
    }
  }

  return (
    <>
      <div className="post-menu relative">
        {/* Collapsed view */}
        <div className="flex items-center gap-3">
          <ImageUpload />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className={`h-10 w-10 rounded-full p-0 transition-colors ${
              isExpanded ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            {isExpanded ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </Button>
        </div>

        {/* Expanded menu */}
        {isExpanded && (
          <Card className="absolute bottom-full right-0 mb-2 p-4 shadow-lg animate-in slide-in-from-bottom-2 duration-200">
            <div className="grid grid-cols-2 gap-3 min-w-[280px]">
              {postOptions.map((option) => {
                const IconComponent = option.icon
                const isSelected = selectedPostType === option.id

                return (
                  <Button
                    key={option.id}
                    variant={isSelected ? "default" : "ghost"}
                    onClick={() => handleOptionSelect(option.id)}
                    className="flex flex-col items-center gap-2 h-auto py-4 px-3"
                    style={{
                      backgroundColor: isSelected ? option.color : undefined,
                      borderColor: isSelected ? option.color : undefined,
                    }}
                  >
                    <div
                      className={`p-3 rounded-full ${isSelected ? "bg-white/20" : "bg-muted"}`}
                      style={{
                        backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : `${option.color}15`,
                      }}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${isSelected ? "text-white" : ""}`}
                        style={{ color: isSelected ? "white" : option.color }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-foreground"}`}>
                      {option.label}
                    </span>
                  </Button>
                )
              })}
            </div>
          </Card>
        )}
      </div>

      {/* Poll Creation Modal */}
      <PollCreationModal open={showPollModal} onOpenChange={setShowPollModal} initialData={pollData || undefined} />

      {/* Celebration Creation Modal */}
      <CelebrationCreationModal
        open={showCelebrationModal}
        onOpenChange={setShowCelebrationModal}
        initialData={celebrationData || undefined}
      />

      {/* Discussion Creation Modal */}
      <DiscussionCreationModal
        open={showDiscussionModal}
        onOpenChange={setShowDiscussionModal}
        initialData={forum || undefined}
      />
    </>
  )
}
