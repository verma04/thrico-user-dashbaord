export interface User {
  id: number
  name: string
  username: string
  email?: string
  designation: string
  company: string
  location: string
  bio: string
  avatar: string
  coverImage: string
  status: 'online' | 'away' | 'busy' | 'offline'
  joinedDate: string
  followers: number
  following: number
  posts: number
  achievements: string[]
  verified: boolean
  isFollowing?: boolean
}

export interface UserProfile extends User {
  totalLikes: number
  totalComments: number
  totalShares: number
  totalViews: number
  savedPosts: number
  drafts: number
  badges: Badge[]
  socialLinks: SocialLink[]
  skills: string[]
  interests: string[]
  workExperience: WorkExperience[]
  education: Education[]
}

export interface Badge {
  id: number
  name: string
  description: string
  icon: string
  color: string
  earnedDate: string
}

export interface SocialLink {
  platform: string
  url: string
  username: string
}

export interface WorkExperience {
  id: number
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  current: boolean
}

export interface Education {
  id: number
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate?: string
  description?: string
}

export interface FeedActivity {
  id: number
  type: 'like' | 'comment' | 'share' | 'follow' | 'post'
  message: string
  timestamp: string
  relatedUserId?: number
  relatedPostId?: number
  read: boolean
}

export interface FeedStats {
  totalPosts: number
  savedPosts: number
  likedPosts: number
  viewsThisWeek: number
  sharesThisWeek: number
  commentsThisWeek: number
  followersGained: number
  engagementRate: number
}

export interface SuggestedUser {
  id: number
  name: string
  username: string
  designation: string
  company: string
  avatar: string
  verified: boolean
  mutualConnections: number
  followersCount: number
  isFollowing: boolean
  reason: string // Why this user is suggested
}
