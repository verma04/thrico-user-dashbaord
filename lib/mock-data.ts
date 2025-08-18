import type { Community, Post, Event } from "@/types/community"

export const communityData: Community = {
  id: 1,
  name: "Photography Enthusiasts",
  headline: "Capture the world through your lens",
  description:
    "A community for photographers of all levels to share their work, get feedback, and learn from each other. Whether you're just starting out or you're a seasoned professional, everyone is welcome here!",
  members: 12543,
  privacy: "Public",
  categories: ["Arts & Photography", "Creative"],
  tags: ["photography", "camera", "editing", "portraits"],
  location: "Global",
  joinCondition: "Anyone can join",
  coverImage: "/placeholder.svg?height=300&width=800",
  isJoined: false,
  userRole: "member",
  posts: 1234,
  rating: 4.8,
  totalRatings: 156,
  rules: [
    "Be respectful and constructive in your feedback",
    "Only post your own original work",
    "No spam or promotional content",
    "Keep discussions photography-related",
  ],
  admins: [
    { id: 1, name: "John Doe", avatar: "/placeholder.svg?height=40&width=40", role: "Admin" },
    { id: 2, name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40", role: "Co-Admin" },
  ],
  memberAvatars: [
    "/placeholder.svg?height=32&width=32",
    "/placeholder.svg?height=32&width=32",
    "/placeholder.svg?height=32&width=32",
    "/placeholder.svg?height=32&width=32",
    "/placeholder.svg?height=32&width=32",
  ],
}

export const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Member",
    },
    content: "Just captured this amazing sunset at the beach! What do you think about the composition?",
    image: "/placeholder.svg?height=400&width=600",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    rating: 4.5,
    isLiked: false,
    isRated: false,
  },
  {
    id: 2,
    author: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Co-Admin",
    },
    content:
      "Weekly challenge: Street Photography! Share your best street shots from this week. Looking forward to seeing your creativity!",
    timestamp: "1 day ago",
    likes: 45,
    comments: 23,
    rating: 4.8,
    isLiked: true,
    isRated: true,
  },
]

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Photography Workshop: Portrait Lighting",
    description: "Learn advanced portrait lighting techniques with professional photographers.",
    date: "2024-02-15T14:00",
    duration: "3",
    location: "Community Center, Main St",
    type: "in-person",
    maxAttendees: 25,
    attendees: 18,
    status: "upcoming",
    requireApproval: true,
    userAttending: false,
  },
  {
    id: 2,
    title: "Virtual Photo Critique Session",
    description: "Share your photos and get constructive feedback from the community.",
    date: "2024-02-20T19:00",
    duration: "2",
    location: "https://zoom.us/j/123456789",
    type: "online",
    maxAttendees: 50,
    attendees: 32,
    status: "upcoming",
    requireApproval: false,
    userAttending: true,
  },
]
