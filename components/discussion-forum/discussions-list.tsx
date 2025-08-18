"use client"

import { Button } from "@/components/ui/button"
import { DiscussionCard } from "./discussion-card"

interface DiscussionsListProps {
  currentTab: string
}

const allDiscussions = [
  {
    id: 1,
    title: "Best practices for remote work productivity",
    author: "Marcus Johnson",
    authorRole: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Career",
    replies: 23,
    likes: 45,
    dislikes: 3,
    lastReply: "2 hours ago",
    lastReplyBy: "Sarah Chen",
    excerpt:
      "I've been working remotely for 3 years now and wanted to share some tips that have helped me stay productive...",
    isHot: true,
    userVote: "up" as const,
    createdAt: "2024-01-15",
    isMyPost: false,
    activityScore: 85,
  },
  {
    id: 2,
    title: "AI tools that are changing how we work",
    author: "Elena Rodriguez",
    authorRole: "Data Scientist",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Technology",
    replies: 18,
    likes: 67,
    dislikes: 5,
    lastReply: "4 hours ago",
    lastReplyBy: "David Kim",
    excerpt:
      "Let's discuss the AI tools that are actually making a difference in our daily workflows. Here are my top 5...",
    isHot: true,
    userVote: null,
    createdAt: "2024-01-14",
    isMyPost: false,
    activityScore: 92,
  },
  {
    id: 3,
    title: "Networking tips for introverts",
    author: "Jennifer Walsh",
    authorRole: "Senior Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Career",
    replies: 15,
    likes: 32,
    dislikes: 2,
    lastReply: "6 hours ago",
    lastReplyBy: "Alex Thompson",
    excerpt: "As an introvert, networking events used to terrify me. Here's how I learned to network effectively...",
    isHot: false,
    userVote: null,
    createdAt: "2024-01-16",
    isMyPost: false,
    activityScore: 45,
  },
  {
    id: 4,
    title: "Help: Transitioning from frontend to full-stack",
    author: "Alex Thompson",
    authorRole: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Help",
    replies: 12,
    likes: 28,
    dislikes: 1,
    lastReply: "8 hours ago",
    lastReplyBy: "Marcus Johnson",
    excerpt:
      "I've been doing frontend for 2 years and want to expand to full-stack. What backend technologies should I learn first?",
    isHot: false,
    userVote: "down" as const,
    createdAt: "2024-01-17",
    isMyPost: true,
    activityScore: 35,
  },
  {
    id: 5,
    title: "Freelancing vs Full-time: Pros and Cons",
    author: "David Kim",
    authorRole: "Freelance Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Career",
    replies: 34,
    likes: 56,
    dislikes: 8,
    lastReply: "1 day ago",
    lastReplyBy: "Elena Rodriguez",
    excerpt: "I've done both freelancing and full-time work. Here's my honest comparison of both paths...",
    isHot: false,
    userVote: null,
    createdAt: "2024-01-13",
    isMyPost: false,
    activityScore: 78,
  },
  {
    id: 6,
    title: "My journey learning React in 2024",
    author: "Alex Thompson",
    authorRole: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Technology",
    replies: 8,
    likes: 15,
    dislikes: 0,
    lastReply: "3 hours ago",
    lastReplyBy: "Sarah Chen",
    excerpt: "Started learning React 6 months ago and wanted to share my experience and resources that helped me...",
    isHot: false,
    userVote: null,
    createdAt: "2024-01-18",
    isMyPost: true,
    activityScore: 25,
  },
]

export function DiscussionsList({ currentTab }: DiscussionsListProps) {
  const getFilteredDiscussions = () => {
    switch (currentTab) {
      case "trending":
        return [...allDiscussions].sort((a, b) => b.activityScore - a.activityScore)
      case "hot":
        return allDiscussions.filter((d) => d.isHot)
      case "new":
        return [...allDiscussions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "my":
        // Redirect to dedicated My Discussions page
        return []
      default:
        return allDiscussions
    }
  }

  const filteredDiscussions = getFilteredDiscussions()

  if (currentTab === "my") {
    return (
      <div className="text-center py-8 md:py-12 px-4">
        {" "}
        {/* Responsive padding */}
        <div className="max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Visit Your Dedicated Forum Page</h3>{" "}
          {/* Responsive text size */}
          <p className="text-sm md:text-base text-gray-600 mb-4">
            {" "}
            {/* Responsive text size */}
            Access your complete discussion management dashboard with detailed analytics and controls.
          </p>
          <Button onClick={() => (window.location.href = "/dashboard/discussions/my")} className="w-full sm:w-auto">
            {" "}
            {/* Full width on small, auto on sm+ */}
            Go to My Discussions
          </Button>
        </div>
      </div>
    )
  }

  const getEmptyStateMessage = () => {
    switch (currentTab) {
      case "hot":
        return {
          title: "No hot discussions right now",
          description: "Check back later for trending conversations!",
        }
      case "new":
        return {
          title: "No new discussions",
          description: "Be the first to start a conversation!",
        }
      default:
        return {
          title: "No discussions found",
          description: "Try adjusting your filters or create a new discussion.",
        }
    }
  }

  if (filteredDiscussions.length === 0) {
    const emptyState = getEmptyStateMessage()
    return (
      <div className="text-center py-8 md:py-12 px-4">
        {" "}
        {/* Responsive padding */}
        <div className="max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{emptyState.title}</h3>{" "}
          {/* Responsive text size */}
          <p className="text-sm md:text-base text-gray-600 mb-4">{emptyState.description}</p>{" "}
          {/* Responsive text size */}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredDiscussions.map((discussion) => (
        <DiscussionCard key={discussion.id} discussion={discussion} showOwnerBadge={currentTab === "my"} />
      ))}

      <div className="text-center mt-6">
        <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
          {" "}
          {/* Full width on small, auto on sm+ */}
          Load More Discussions
        </Button>
      </div>
    </div>
  )
}
