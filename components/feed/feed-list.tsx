import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter
} from '../ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  CheckCircle,
  Bookmark,
  Pencil,
  Trash2,
  Flag
} from 'lucide-react'

interface Post {
  id: string
  author: {
    name: string
    title: string
    avatar: string
    verified?: boolean
  }
  content: string
  images?: string[]
  tags?: string[]
  category?: string
  privacy: "public" | "connections"
  timestamp: string
  likes: number
  comments: number
  reposts: number
  isLiked?: boolean
  isBookmarked?: boolean
  postType?: "poll" | "celebration" | "job" | "discussion" | "event" | "listing" | null
}

const samplePosts: Post[] = [
  {
    id: "1",
    author: {
      name: "John Doe",
      title: "Full Stack Developer",
      avatar: "/placeholder.svg?height=48&width=48",
      verified: true
    },
    content:
      "Just shipped a new feature that I'm really excited about! The team worked incredibly hard on this and I couldn't be more proud of what we've accomplished together. 🚀",
    images: ["/placeholder.svg?height=300&width=500"],
    tags: ["Development", "TeamWork", "Success"],
    category: "Technology",
    privacy: "public",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    reposts: 3,
    isLiked: true,
    isBookmarked: false,
    postType: "celebration"
  },
  {
    id: "2",
    author: {
      name: "Sarah Johnson",
      title: "Product Designer",
      avatar: "/placeholder.svg?height=48&width=48"
    },
    content:
      "What's everyone's favorite design tool for prototyping? I've been using Figma but curious about other options out there.",
    privacy: "public",
    timestamp: "4 hours ago",
    likes: 12,
    comments: 15,
    reposts: 2,
    postType: "discussion"
  },
  {
    id: "3",
    author: {
      name: "Tech Community",
      title: "Community Manager",
      avatar: "/placeholder.svg?height=48&width=48",
      verified: true
    },
    content: "Join us for our monthly tech meetup! We'll be discussing the latest trends in AI and machine learning. Free pizza and networking! 🍕🤖",
    category: "Event",
    privacy: "public",
    timestamp: "1 day ago",
    likes: 45,
    comments: 12,
    reposts: 8,
    postType: "event"
  },
  {
    id: "4",
    author: {
      name: "StartupHub",
      title: "Job Board",
      avatar: "/placeholder.svg?height=48&width=48"
    },
    content: "Senior Frontend Developer position available at fast-growing startup. React, TypeScript, competitive salary + equity. Remote-friendly! 💻",
    category: "Marketplace",
    privacy: "public",
    timestamp: "3 hours ago",
    likes: 28,
    comments: 5,
    reposts: 12,
    postType: "job"
  },
  {
    id: "5",
    author: {
      name: "Design Community",
      title: "Creative Collective",
      avatar: "/placeholder.svg?height=48&width=48"
    },
    content: "Share your latest design work and get feedback from fellow designers. This week's theme: Mobile App Onboarding 🎨",
    category: "Community",
    privacy: "public",
    timestamp: "6 hours ago",
    likes: 67,
    comments: 23,
    reposts: 15,
    postType: "discussion"
  }
]

interface FeedListProps {
  activeTab?: string
}

const FeedList = ({ activeTab = "discover" }: FeedListProps) => {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    )
  }

  const toggleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    )
  }

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
    setDeleteConfirmId(null)
  }

  const handleReport = (postId: string) => {
    alert(`Reported post: ${postId}`)
  }

  const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => {
    switch (activeTab) {
      case "communities":
        return post.category === "Community" || post.postType === "discussion"
      case "events":
        return post.category === "Event" || post.postType === "event"
      case "listings":
        return post.category === "Marketplace" || post.postType === "job" || post.postType === "listing"
      case "discover":
      default:
        return true // Show all posts for discover tab
    }
  })

  return (
    <div className="space-y-5">
      {filteredPosts.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent>
            <div className="text-gray-500">
              <p className="text-lg font-medium mb-2">No posts found</p>
              <p className="text-sm">
                {activeTab === "discover" && "No posts available."}
                {activeTab === "communities" && "No community posts available."}
                {activeTab === "events" && "No event posts available."}
                {activeTab === "listings" && "No listing posts available."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        filteredPosts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <CardContent>
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                  <AvatarImage
                    src={post.author.avatar}
                    alt={`${post.author.name}'s avatar`}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {post.author.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-base truncate">
                      {post.author.name}
                    </h3>
                    {post.author.verified && (
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1 truncate">{post.author.title}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => toggleBookmark(post.id)}>
                    <Bookmark className="h-4 w-4 mr-2" />
                    {post.isBookmarked ? 'Unsave' : 'Save'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert('Edit post...')}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDeleteConfirmId(post.id)}>
                    <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleReport(post.id)}>
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Post Type Badge */}
            {post.postType && (
              <div className="mb-3">
                <Badge
                  variant="secondary"
                  className={`text-xs px-2 py-1 rounded-full ${
                    post.postType === 'celebration'
                      ? 'bg-green-100 text-green-700'
                      : post.postType === 'job'
                      ? 'bg-blue-100 text-blue-700'
                      : post.postType === 'discussion'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {post.postType.charAt(0).toUpperCase() + post.postType.slice(1)}
                </Badge>
              </div>
            )}

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-900 leading-relaxed text-[15px] whitespace-pre-wrap">
                {post.content}
              </p>

              {post.images && post.images.length > 0 && (
                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={post.images[0]}
                    alt="Post attachment"
                    className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform"
                  />
                </div>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 rounded-full text-xs px-3 py-1 cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            {(post.likes || post.comments || post.reposts) > 0 && (
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3 py-2">
                <div className="flex items-center gap-1">
                  {post.likes > 0 && (
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      <span className="font-medium">{formatCount(post.likes)}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {post.comments > 0 && (
                    <span>{formatCount(post.comments)} Comment{post.comments !== 1 ? 's' : ''}</span>
                  )}
                  {post.reposts > 0 && (
                    <span>{formatCount(post.reposts)} Repost{post.reposts !== 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <div className="flex items-center w-full border-t border-gray-100 pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleLike(post.id)}
                className={`gap-2 flex-1 rounded-lg py-2.5 ${
                  post.isLiked
                    ? "text-red-500 bg-red-50/50 hover:bg-red-50"
                    : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                <span className="font-medium">Like</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 flex-1 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg py-2.5"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="font-medium">Comment</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 flex-1 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-lg py-2.5"
              >
                <Repeat2 className="h-4 w-4" />
                <span className="font-medium">Share</span>
              </Button>
            </div>
          </CardFooter>

          {/* Delete Confirmation */}
          {deleteConfirmId === post.id && (
            <div className="p-4 bg-red-50 border-t border-red-200 text-sm text-red-600">
              <p className="mb-2">Are you sure you want to delete this post?</p>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                  Yes, Delete
                </Button>
                <Button size="sm" variant="outline" onClick={() => setDeleteConfirmId(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      ))
      )}
    </div>
  )
}

export default FeedList
