"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Star, ThumbsUp, ThumbsDown, TrendingUp } from "lucide-react"
import { MobileBottomNav, MobileHeader } from "@/components/community-page/mobile-nav"

const mockRatings = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Member since Jan 2024",
      verified: true,
    },
    rating: 5,
    title: "Amazing photography community!",
    review:
      "This community has helped me improve my photography skills tremendously. The feedback is always constructive and the weekly challenges keep me motivated. Highly recommend to anyone interested in photography!",
    date: "2 days ago",
    helpful: 24,
    notHelpful: 2,
    images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    categories: ["Content Quality", "Community Support"],
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Member since Mar 2024",
      verified: false,
    },
    rating: 4,
    title: "Great community with active members",
    review:
      "Love the active discussions and the variety of photography styles shared. The admins are responsive and the community guidelines are clear. Only wish there were more in-person meetups.",
    date: "1 week ago",
    helpful: 18,
    notHelpful: 1,
    images: [],
    categories: ["Community Engagement", "Moderation"],
  },
  {
    id: 3,
    user: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Member since Feb 2024",
      verified: true,
    },
    rating: 5,
    title: "Perfect for beginners and pros alike",
    review:
      "As a beginner photographer, I was worried about joining, but everyone here is so welcoming and helpful. The tutorials and tips shared by experienced members are invaluable.",
    date: "2 weeks ago",
    helpful: 31,
    notHelpful: 0,
    images: ["/placeholder.svg?height=100&width=100"],
    categories: ["Beginner Friendly", "Educational Content"],
  },
  {
    id: 4,
    user: {
      name: "David Park",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Member since Dec 2023",
      verified: true,
    },
    rating: 3,
    title: "Good community but could be more organized",
    review:
      "The community has great potential and talented members, but sometimes the discussions can get off-topic. Better organization of content categories would help.",
    date: "3 weeks ago",
    helpful: 12,
    notHelpful: 8,
    images: [],
    categories: ["Organization", "Content Quality"],
  },
  {
    id: 5,
    user: {
      name: "Lisa Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Member since Nov 2023",
      verified: false,
    },
    rating: 4,
    title: "Inspiring and educational",
    review:
      "I've learned so much from this community! The photo critiques are honest but encouraging, and I love seeing the diverse range of photography styles.",
    date: "1 month ago",
    helpful: 22,
    notHelpful: 3,
    images: [],
    categories: ["Educational Content", "Diversity"],
  },
]

const ratingStats = {
  overall: 4.6,
  totalRatings: 156,
  distribution: {
    5: 78,
    4: 45,
    3: 18,
    2: 8,
    1: 7,
  },
  categories: {
    "Content Quality": 4.7,
    "Community Support": 4.8,
    Moderation: 4.5,
    "Educational Value": 4.6,
    "User Experience": 4.4,
  },
  trends: {
    thisMonth: 4.7,
    lastMonth: 4.5,
    growth: "+0.2",
  },
}

export default function CommunityRatingsPage({ params }: { params: { id: string } }) {
  const [ratings, setRatings] = useState(mockRatings)
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    review: "",
    categories: [] as string[],
  })

  const filteredRatings = ratings
    .filter((rating) => {
      if (filterBy === "all") return true
      return rating.rating === Number.parseInt(filterBy)
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "helpful":
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const handleHelpful = (ratingId: number, isHelpful: boolean) => {
    setRatings(
      ratings.map((rating) =>
        rating.id === ratingId
          ? {
              ...rating,
              helpful: isHelpful ? rating.helpful + 1 : rating.helpful,
              notHelpful: !isHelpful ? rating.notHelpful + 1 : rating.notHelpful,
            }
          : rating,
      ),
    )
  }

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const submitReview = () => {
    if (newReview.rating > 0 && newReview.title && newReview.review) {
      const review = {
        id: ratings.length + 1,
        user: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          joinDate: "Member since Jan 2024",
          verified: true,
        },
        rating: newReview.rating,
        title: newReview.title,
        review: newReview.review,
        date: "Just now",
        helpful: 0,
        notHelpful: 0,
        images: [],
        categories: newReview.categories,
      }
      setRatings([review, ...ratings])
      setNewReview({ rating: 0, title: "", review: "", categories: [] })
      setShowWriteReview(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader title="Community Ratings" showBack={true} />

      {/* Desktop Header */}
 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 pb-20 md:pb-8">
        {/* Rating Overview */}
        <Card className="mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Overall Rating */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-3xl md:text-4xl font-bold">{ratingStats.overall}</span>
                  {renderStars(Math.round(ratingStats.overall), "lg")}
                </div>
                <p className="text-sm text-gray-600">{ratingStats.totalRatings} total ratings</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">{ratingStats.trends.growth} this month</span>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3">{star}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <Progress
                      value={
                        (ratingStats.distribution[star as keyof typeof ratingStats.distribution] /
                          ratingStats.totalRatings) *
                        100
                      }
                      className="flex-1 h-2"
                    />
                    <span className="w-8 text-xs text-gray-600">
                      {ratingStats.distribution[star as keyof typeof ratingStats.distribution]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Category Ratings */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Category Ratings</h4>
                {Object.entries(ratingStats.categories).map(([category, rating]) => (
                  <div key={category} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{category}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Review Button */}
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t">
              <Button onClick={() => setShowWriteReview(!showWriteReview)} className="w-full md:w-auto">
                {showWriteReview ? "Cancel Review" : "Write a Review"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Write Review Form */}
        {showWriteReview && (
          <Card className="mb-6 fade-in">
            <CardHeader>
              <CardTitle className="text-lg">Write Your Review</CardTitle>
              <CardDescription>Share your experience with this community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Rating *</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 md:w-8 md:h-8 ${
                          star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Review Title *</label>
                <input
                  type="text"
                  placeholder="Summarize your experience"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full p-3 border rounded-lg h-12 md:h-10"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Review *</label>
                <Textarea
                  placeholder="Tell others about your experience with this community..."
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <Button
                onClick={submitReview}
                disabled={!newReview.rating || !newReview.title || !newReview.review}
                className="w-full md:w-auto"
              >
                Submit Review
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
          <div className="flex gap-2 flex-1">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1 h-12 md:h-10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Rating</SelectItem>
                <SelectItem value="lowest">Lowest Rating</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="flex-1 h-12 md:h-10">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 md:space-y-6">
          {filteredRatings.map((rating) => (
            <Card key={rating.id}>
              <CardContent className="p-4 md:p-6">
                <div className="flex gap-3 md:gap-4">
                  <Avatar className="w-10 h-10 md:w-12 md:h-12">
                    <AvatarImage src={rating.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{rating.user.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm md:text-base">{rating.user.name}</h4>
                          {rating.user.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{rating.user.joinDate}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        {renderStars(rating.rating)}
                        <span className="text-sm text-gray-600">{rating.date}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-sm md:text-base mb-2">{rating.title}</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-3">{rating.review}</p>

                    {/* Review Images */}
                    {rating.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {rating.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt="Review"
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    {/* Categories */}
                    {rating.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {rating.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Helpful Actions */}
                    <div className="flex items-center gap-4 pt-3 border-t">
                      <button
                        onClick={() => handleHelpful(rating.id, true)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({rating.helpful})</span>
                      </button>
                      <button
                        onClick={() => handleHelpful(rating.id, false)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>Not Helpful ({rating.notHelpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRatings.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
