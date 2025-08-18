import { User, UserProfile, FeedActivity, FeedStats, SuggestedUser } from "@/types/user"

export const currentUser: UserProfile = {
  id: 1,
  name: "John Anderson",
  username: "@john.anderson",
  email: "john.anderson@techcorp.com",
  designation: "Senior Software Engineer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  bio: "Passionate about building scalable applications and sharing knowledge with the community. Love working with React, TypeScript, and cloud technologies.",
  avatar: "/placeholder-user.jpg",
  coverImage: "/placeholder.jpg",
  status: "online",
  joinedDate: "March 2022",
  followers: 1248,
  following: 892,
  posts: 156,
  achievements: ["Top Contributor", "Community Helper", "Code Mentor"],
  verified: true,
  isFollowing: false,
  totalLikes: 2847,
  totalComments: 1293,
  totalShares: 567,
  totalViews: 45620,
  savedPosts: 89,
  drafts: 3,
  badges: [
    {
      id: 1,
      name: "Top Contributor",
      description: "Contributed over 100 helpful posts",
      icon: "🏆",
      color: "gold",
      earnedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Community Helper",
      description: "Helped 50+ community members",
      icon: "🤝",
      color: "blue",
      earnedDate: "2024-02-10"
    }
  ],
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/johnanderson",
      username: "johnanderson"
    },
    {
      platform: "GitHub",
      url: "https://github.com/johnanderson",
      username: "johnanderson"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/johnanderson",
      username: "@johnanderson"
    }
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL"],
  interests: ["Web Development", "AI/ML", "Cloud Computing", "Open Source", "Tech Leadership"],
  workExperience: [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      startDate: "2022-03-01",
      description: "Leading frontend development for enterprise applications using React and TypeScript.",
      current: true
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Developer",
      startDate: "2020-06-01",
      endDate: "2022-02-28",
      description: "Built full-stack web applications using MERN stack.",
      current: false
    }
  ],
  education: [
    {
      id: 1,
      institution: "Stanford University",
      degree: "Master of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2018-09-01",
      endDate: "2020-05-30",
      description: "Specialized in software engineering and distributed systems."
    },
    {
      id: 2,
      institution: "UC Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2014-09-01",
      endDate: "2018-05-30"
    }
  ]
}

export const feedStats: FeedStats = {
  totalPosts: 156,
  savedPosts: 89,
  likedPosts: 324,
  viewsThisWeek: 1200,
  sharesThisWeek: 45,
  commentsThisWeek: 67,
  followersGained: 23,
  engagementRate: 8.5
}

export const recentFeedActivity: FeedActivity[] = [
  {
    id: 1,
    type: "like",
    message: "Sarah Johnson liked your post about React best practices",
    timestamp: "2 minutes ago",
    relatedUserId: 2,
    relatedPostId: 123,
    read: false
  },
  {
    id: 2,
    type: "comment",
    message: "Mike Chen commented on your TypeScript tutorial",
    timestamp: "1 hour ago",
    relatedUserId: 3,
    relatedPostId: 122,
    read: false
  },
  {
    id: 3,
    type: "follow",
    message: "3 new followers this week",
    timestamp: "3 hours ago",
    read: true
  },
  {
    id: 4,
    type: "share",
    message: "Your post about clean code was shared 5 times",
    timestamp: "1 day ago",
    relatedPostId: 121,
    read: true
  },
  {
    id: 5,
    type: "post",
    message: "Your latest post reached 500+ views",
    timestamp: "2 days ago",
    relatedPostId: 120,
    read: true
  }
]

export const suggestedUsers: SuggestedUser[] = [
  {
    id: 2,
    name: "Sarah Johnson",
    username: "@sarah.johnson",
    designation: "Design Lead",
    company: "CreativeStudio",
    avatar: "/placeholder.svg?height=32&width=32",
    verified: true,
    mutualConnections: 12,
    followersCount: 2341,
    isFollowing: false,
    reason: "Works in similar field"
  },
  {
    id: 3,
    name: "Mike Chen",
    username: "@mike.chen",
    designation: "Product Manager",
    company: "InnovateTech",
    avatar: "/placeholder.svg?height=32&width=32",
    verified: false,
    mutualConnections: 8,
    followersCount: 1567,
    isFollowing: false,
    reason: "Mutual connections"
  },
  {
    id: 4,
    name: "Emily Davis",
    username: "@emily.davis",
    designation: "Marketing Director",
    company: "BrandForce",
    avatar: "/placeholder.svg?height=32&width=32",
    verified: true,
    mutualConnections: 5,
    followersCount: 3421,
    isFollowing: false,
    reason: "Liked your posts"
  },
  {
    id: 5,
    name: "Alex Thompson",
    username: "@alex.thompson",
    designation: "Senior Developer",
    company: "DevHub",
    avatar: "/placeholder.svg?height=32&width=32",
    verified: false,
    mutualConnections: 15,
    followersCount: 987,
    isFollowing: false,
    reason: "Similar interests"
  }
]

export const trendingTopics = [
  { 
    name: "React 19", 
    count: 1245, 
    color: "bg-blue-500", 
    growth: "+25%",
    description: "Latest React features and updates"
  },
  { 
    name: "TypeScript", 
    count: 987, 
    color: "bg-indigo-500", 
    growth: "+18%",
    description: "Type-safe JavaScript development"
  },
  { 
    name: "AI Development", 
    count: 856, 
    color: "bg-purple-500", 
    growth: "+32%",
    description: "AI and machine learning discussions"
  },
  { 
    name: "Cloud Native", 
    count: 734, 
    color: "bg-green-500", 
    growth: "+15%",
    description: "Cloud-first development practices"
  },
  { 
    name: "DevOps", 
    count: 623, 
    color: "bg-orange-500", 
    growth: "+12%",
    description: "Continuous integration and deployment"
  },
  { 
    name: "Web3", 
    count: 542, 
    color: "bg-cyan-500", 
    growth: "+8%",
    description: "Decentralized web technologies"
  }
]

export const feedQuickActions = [
  { 
    label: "Create Post", 
    icon: "Plus", 
    action: "create-post", 
    variant: "default" as const,
    description: "Share your thoughts with the community"
  },
  { 
    label: "My Drafts", 
    icon: "Edit", 
    action: "drafts", 
    count: 3,
    description: "Continue working on saved drafts"
  },
  { 
    label: "Saved Posts", 
    icon: "Bookmark", 
    action: "saved",
    count: 89,
    description: "View your bookmarked content"
  },
  { 
    label: "Liked Posts", 
    icon: "Heart", 
    action: "liked",
    count: 324,
    description: "Posts you've liked"
  },
  { 
    label: "My Analytics", 
    icon: "BarChart2", 
    action: "analytics",
    description: "View your content performance"
  },
  { 
    label: "Feed Settings", 
    icon: "Settings", 
    action: "settings",
    description: "Customize your feed preferences"
  },
  { 
    label: "Notifications", 
    icon: "Bell", 
    action: "notifications",
    count: 12,
    description: "View recent notifications"
  }
]
