export interface Community {
  id: number
  name: string
  headline: string
  description: string
  members: number
  privacy: "Public" | "Private"
  categories: string[]
  tags: string[]
  location: string
  joinCondition: string
  coverImage: string
  isJoined: boolean
  userRole: "member" | "co-admin" | "admin"
  posts: number
  rating: number
  totalRatings: number
  rules: string[]
  admins: Admin[]
  memberAvatars: string[]
}

export interface Admin {
  id: number
  name: string
  avatar: string
  role: string
}

export interface Post {
  id: number
  author: {
    name: string
    avatar: string
    role: string
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  rating: number
  isLiked: boolean
  isRated: boolean
}

export interface Event {
  id: number
  title: string
  description: string
  date: string
  duration: string
  location: string
  type: "in-person" | "online"
  maxAttendees?: number
  attendees: number
  status: "upcoming" | "ongoing" | "completed"
  requireApproval: boolean
  userAttending: boolean
}

export interface SuggestedCommunity {
  name: string
  members: string
  rating: number
}
