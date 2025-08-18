"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"

interface RatingComponentProps {
  communityId: string
  currentUserRating?: number
  onRatingSubmit?: (rating: number, review?: string) => void
  showReviews?: boolean
  compact?: boolean
}

export function RatingComponent({
  communityId,
  currentUserRating = 0,
  onRatingSubmit,
  showReviews = true,
  compact = false,
}: RatingComponentProps) {
  const [userRating, setUserRating] = useState(currentUserRating)
  const [hoverRating, setHoverRating] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState("")

  const mockStats = {
    overall: 4.6,
    totalRatings: 156,
    distribution: { 5: 78, 4: 45, 3: 18, 2: 8, 1: 7 },
  }

  const mockRecentReviews = [
    {
      id: 1,
      user: { name: "Sarah J.", avatar: "/placeholder.svg?height=32&width=32" },
      rating: 5,
      review: "Amazing community with great support!",
      date: "2 days ago",
      helpful: 12,
    },
    {
      id: 2,
      user: { name: "Mike C.", avatar: "/placeholder.svg?height=32&width=32" },
      rating: 4,
      review: "Very active and helpful members.",
      date: "1 week ago",
      helpful: 8,
    },
  ]

  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
    if (onRatingSubmit && !showReviewForm) {
      onRatingSubmit(rating)
    }
  }

  const handleReviewSubmit = () => {
    if (onRatingSubmit && userRating > 0) {
      onRatingSubmit(userRating, reviewText)
      setShowReviewForm(false)
      setReviewText("")
    }
  }

  const renderStars = (rating: number, interactive = false, size: "sm" | "md" = "md") => {
    const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5"

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && handleRatingClick(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          >
            <Star
              className={`${sizeClass} ${
                star <= (interactive ? hoverRating || userRating : rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  if (compact) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">{mockStats.overall}</div>
              {renderStars(Math.round(mockStats.overall))}
              <span className="text-sm text-gray-600">({mockStats.totalRatings})</span>
            </div>
            <Button variant="outline" size="sm">
              Rate Community
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Community Rating</span>
            <Badge variant="outline">{mockStats.totalRatings} reviews</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-3xl md:text-4xl font-bold">{mockStats.overall}</span>
                {renderStars(Math.round(mockStats.overall))}
              </div>
              <p className="text-sm text-gray-600 mb-4">Based on {mockStats.totalRatings} reviews</p>

              {/* User Rating */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Rate this community:</p>
                  {renderStars(userRating, true)}
                </div>

                {userRating > 0 && !showReviewForm && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReviewForm(true)}
                    className="w-full md:w-auto"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                )}
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm mb-3">Rating Distribution</h4>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-3">{star}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Progress
                    value={
                      (mockStats.distribution[star as keyof typeof mockStats.distribution] / mockStats.totalRatings) *
                      100
                    }
                    className="flex-1 h-2"
                  />
                  <span className="w-8 text-xs text-gray-600">
                    {mockStats.distribution[star as keyof typeof mockStats.distribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-3">Write a Review</h4>
              <Textarea
                placeholder="Share your experience with this community..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mb-3"
              />
              <div className="flex gap-2">
                <Button onClick={handleReviewSubmit} size="sm" disabled={!userRating || !reviewText.trim()}>
                  Submit Review
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      {showReviews && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Reviews</CardTitle>
            <CardDescription>What members are saying about this community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentReviews.map((review) => (
                <div key={review.id} className="flex gap-3 p-3 border rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{review.user.name}</span>
                      <span className="text-xs text-gray-600">{review.date}</span>
                    </div>
                    {renderStars(review.rating, false, "sm")}
                    <p className="text-sm text-gray-700 mt-1 mb-2">{review.review}</p>
                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="w-3 h-3" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All Reviews
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
