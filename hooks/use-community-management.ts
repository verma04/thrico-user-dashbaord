import { useState } from "react"

// Mock data for community settings
export const useCommunitySettings = () => {
  const [communitySettings, setCommunitySettings] = useState({
    name: "Photography Enthusiasts",
    headline: "Capture the world through your lens",
    description:
      "A community for photographers of all levels to share their work, get feedback, and learn from each other.",
    privacy: "public",
    joinCondition: "anyone",
    allowMemberPosts: true,
    requirePostApproval: false,
    allowMemberInvites: false,
    categories: ["Arts & Photography", "Creative"],
    tags: ["photography", "camera", "editing", "portraits"],
    location: "Global",
    rules:
      "1. Be respectful and constructive in your feedback\n2. Only post your own original work\n3. No spam or promotional content\n4. Keep discussions photography-related",
    coverImage: "https://cdn.thrico.network/defaultEventCover.png",
  })

  const handleSettingChange = (key: string, value: string | boolean | string[]) => {
    setCommunitySettings((prev) => ({ ...prev, [key]: value }))
  }

  return {
    communitySettings,
    handleSettingChange,
  }
}

// Mock data for join requests
export const useJoinRequests = () => {
  const [joinRequests, setJoinRequests] = useState([
    {
      id: 1,
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      requestDate: "2 days ago",
      message: "I'm a professional photographer and would love to share my work and learn from the community.",
    },
    {
      id: 2,
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      requestDate: "1 day ago",
      message: "Amateur photographer looking to improve my skills and get feedback on my photos.",
    },
    {
      id: 3,
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      requestDate: "3 hours ago",
      message: "I specialize in landscape photography and would like to connect with other nature photographers.",
    },
  ])

  const handleApproveRequest = (requestId: number) => {
    setJoinRequests((requests) => requests.filter((req) => req.id !== requestId))
  }

  const handleRejectRequest = (requestId: number) => {
    setJoinRequests((requests) => requests.filter((req) => req.id !== requestId))
  }

  return {
    joinRequests,
    handleApproveRequest,
    handleRejectRequest,
  }
}

// Mock data for members
export const useMembers = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Admin",
      joinDate: "Jan 2024",
      posts: 45,
      isActive: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Co-Admin",
      joinDate: "Feb 2024",
      posts: 32,
      isActive: true,
    },
    {
      id: 3,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinDate: "Mar 2024",
      posts: 18,
      isActive: true,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinDate: "Mar 2024",
      posts: 24,
      isActive: false,
    },
  ])

  const handlePromoteMember = (memberId: number) => {
    setMembers(
      members.map((member) => {
        if (member.id === memberId) {
          if (member.role === "Member") return { ...member, role: "Co-Admin" }
          if (member.role === "Co-Admin") return { ...member, role: "Member" }
          return member
        }
        return member
      }),
    )
  }

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter((member) => member.id !== memberId))
  }

  return {
    members,
    handlePromoteMember,
    handleRemoveMember,
  }
}

// Mock data for events
export const useEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Photography Workshop: Portrait Lighting",
      description: "Learn advanced portrait lighting techniques with professional photographers.",
      date: "2024-02-15T14:00",
      duration: "3",
      location: "Community Center, Main St",
      type: "in-person",
      maxAttendees: "25",
      attendees: 18,
      status: "upcoming",
      requireApproval: true,
      pendingRequests: [
        {
          id: 1,
          name: "Emma Thompson",
          avatar: "/placeholder.svg?height=32&width=32",
          requestDate: "2 days ago",
        },
        {
          id: 2,
          name: "David Rodriguez",
          avatar: "/placeholder.svg?height=32&width=32",
          requestDate: "1 day ago",
        },
      ],
    },
    {
      id: 2,
      title: "Virtual Photo Critique Session",
      description: "Share your photos and get constructive feedback from the community.",
      date: "2024-02-20T19:00",
      duration: "2",
      location: "https://zoom.us/j/123456789",
      type: "online",
      maxAttendees: "50",
      attendees: 32,
      status: "upcoming",
      requireApproval: false,
      pendingRequests: [],
    },
    {
      id: 3,
      title: "Street Photography Walk",
      description: "Explore the city and practice street photography techniques together.",
      date: "2024-01-28T10:00",
      duration: "4",
      location: "Downtown Plaza",
      type: "in-person",
      maxAttendees: "15",
      attendees: 12,
      status: "completed",
      requireApproval: false,
      pendingRequests: [],
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    location: "",
    type: "online",
    maxAttendees: "",
    requireApproval: false,
  })

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        id: events.length + 1,
        ...newEvent,
        attendees: 0,
        status: "upcoming",
        pendingRequests: [],
      }
      setEvents([...events, event])
      setNewEvent({
        title: "",
        description: "",
        date: "",
        duration: "",
        location: "",
        type: "online",
        maxAttendees: "",
        requireApproval: false,
      })
    }
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const handleApproveAttendance = (eventId: number, requestId: number) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            attendees: event.attendees + 1,
            pendingRequests: event.pendingRequests?.filter((req) => req.id !== requestId) || [],
          }
        }
        return event
      }),
    )
  }

  const handleRejectAttendance = (eventId: number, requestId: number) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            pendingRequests: event.pendingRequests?.filter((req) => req.id !== requestId) || [],
          }
        }
        return event
      }),
    )
  }

  return {
    events,
    newEvent,
    setNewEvent,
    handleCreateEvent,
    handleDeleteEvent,
    handleApproveAttendance,
    handleRejectAttendance,
  }
}

// Categories data
export const availableCategories = [
  "Arts & Photography",
  "Business & Entrepreneurship",
  "Food & Cooking",
  "Health & Fitness",
  "Technology",
  "Travel",
  "Books & Literature",
  "Music",
  "Sports",
  "Education",
  "Gaming",
  "Fashion & Beauty",
  "Home & Garden",
  "Science",
  "Politics",
  "Environment",
  "Parenting",
  "Pets & Animals",
  "Movies & TV",
  "Crafts & DIY",
]
