import { Chat, ChatUser, ChatMessage } from "@/types/chat"

export const mockUsers: ChatUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder-user.jpg",
    isOnline: true,
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    avatar: "/placeholder-user.jpg",
    isOnline: true,
  },
  {
    id: "3",
    name: "Maya Patel",
    avatar: "/placeholder-user.jpg",
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "4",
    name: "John Smith",
    avatar: "/placeholder-user.jpg",
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "5",
    name: "Emma Wilson",
    avatar: "/placeholder-user.jpg",
    isOnline: true,
  },
  {
    id: "6",
    name: "David Kim",
    avatar: "/placeholder-user.jpg",
    isOnline: false,
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
]

export const mockMessages: Record<string, ChatMessage[]> = {
  "chat-1": [
    {
      id: "msg-1",
      senderId: "2",
      content: "Hey! How's the project coming along?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-2",
      senderId: "1",
      content: "It's going well! Just finished the user authentication part. Working on the dashboard now.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-3",
      senderId: "2",
      content: "That's awesome! Let me know if you need any help with the API integration.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-4",
      senderId: "1",
      content: "Will do! Thanks for offering 😊",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: "text",
      isRead: false,
    },
  ],
  "chat-2": [
    {
      id: "msg-5",
      senderId: "3",
      content: "Don't forget about our meeting tomorrow at 2 PM!",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-6",
      senderId: "1",
      content: "Thanks for the reminder! I'll be there.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      type: "text",
      isRead: true,
    },
  ],
  "chat-3": [
    {
      id: "msg-7",
      senderId: "4",
      content: "The new design looks fantastic! Great work on the color scheme.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-8",
      senderId: "1",
      content: "Thank you! I spent a lot of time getting the accessibility right.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-9",
      senderId: "4",
      content: "It shows! The contrast ratios are perfect.",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: "text",
      isRead: false,
    },
  ],
  "group-1": [
    {
      id: "msg-10",
      senderId: "2",
      content: "Team meeting moved to 3 PM today. Conference room B.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-11",
      senderId: "3",
      content: "Got it, thanks for the update!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-12",
      senderId: "5",
      content: "I'll bring the latest mockups to review.",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      type: "text",
      isRead: true,
    },
    {
      id: "msg-13",
      senderId: "6",
      content: "Perfect! Looking forward to seeing them.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      type: "text",
      isRead: false,
    },
  ],
}

export const mockChats: Chat[] = [
  {
    id: "chat-1",
    type: "direct",
    name: "Alex Rodriguez",
    avatar: "/placeholder-user.jpg",
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages["chat-1"][mockMessages["chat-1"].length - 1],
    unreadCount: 1,
    isOnline: true,
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "chat-2",
    type: "direct",
    name: "Maya Patel",
    avatar: "/placeholder-user.jpg",
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: mockMessages["chat-2"][mockMessages["chat-2"].length - 1],
    unreadCount: 0,
    isOnline: false,
    lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "chat-3",
    type: "direct",
    name: "John Smith",
    avatar: "/placeholder-user.jpg",
    participants: [mockUsers[0], mockUsers[3]],
    lastMessage: mockMessages["chat-3"][mockMessages["chat-3"].length - 1],
    unreadCount: 1,
    isOnline: false,
    lastActivity: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "group-1",
    type: "group",
    name: "Design Team",
    avatar: "/placeholder.svg",
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[4], mockUsers[5]],
    lastMessage: mockMessages["group-1"][mockMessages["group-1"].length - 1],
    unreadCount: 2,
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
  },
]

// Current user (you)
export const currentUser: ChatUser = mockUsers[0]
