"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface VotingButtonsProps {
  initialLikes: number
  initialDislikes: number
  initialUserVote?: "up" | "down" | null
  onVote?: (voteType: "up" | "down" | null, newScore: number) => void
  size?: "sm" | "md" | "lg"
  orientation?: "vertical" | "horizontal"
}

export function VotingButtons({
  initialLikes,
  initialDislikes,
  initialUserVote = null,
  onVote,
  size = "md",
  orientation = "vertical",
}: VotingButtonsProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(initialUserVote)
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)

  const score = likes - dislikes

  const handleVote = (voteType: "up" | "down") => {
    let newLikes = likes
    let newDislikes = dislikes
    let newUserVote: "up" | "down" | null = voteType

    if (userVote === voteType) {
      // Remove vote if clicking the same vote
      newUserVote = null
      if (voteType === "up") {
        newLikes = likes - 1
      } else {
        newDislikes = dislikes - 1
      }
    } else {
      // Change vote or add new vote
      if (userVote === "up" && voteType === "down") {
        newLikes = likes - 1
        newDislikes = dislikes + 1
      } else if (userVote === "down" && voteType === "up") {
        newDislikes = dislikes - 1
        newLikes = likes + 1
      } else if (userVote === null) {
        if (voteType === "up") {
          newLikes = likes + 1
        } else {
          newDislikes = dislikes + 1
        }
      }
    }

    setUserVote(newUserVote)
    setLikes(newLikes)
    setDislikes(newDislikes)

    const newScore = newLikes - newDislikes
    onVote?.(newUserVote, newScore)
  }

  const buttonSizes = {
    sm: "h-6 w-6 p-0",
    md: "h-8 w-8 p-1",
    lg: "h-10 w-10 p-2",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const containerClass =
    orientation === "vertical" ? "flex flex-col items-center space-y-1" : "flex items-center space-x-2"

  return (
    <div className={containerClass}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          buttonSizes[size],
          userVote === "up"
            ? "text-green-600 bg-green-50 hover:bg-green-100"
            : "text-gray-400 hover:text-green-600 hover:bg-green-50",
        )}
        onClick={() => handleVote("up")}
        aria-label="Upvote"
      >
        <ChevronUp className={iconSizes[size]} />
      </Button>

      <div
        className={cn(
          "font-medium text-center min-w-[2rem]",
          textSizes[size],
          score > 0 ? "text-green-600" : score < 0 ? "text-red-600" : "text-gray-600",
        )}
      >
        {score}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          buttonSizes[size],
          userVote === "down"
            ? "text-red-600 bg-red-50 hover:bg-red-100"
            : "text-gray-400 hover:text-red-600 hover:bg-red-50",
        )}
        onClick={() => handleVote("down")}
        aria-label="Downvote"
      >
        <ChevronDown className={iconSizes[size]} />
      </Button>
    </div>
  )
}
