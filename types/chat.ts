export interface ChatUser {
  id: string
  name: string
  avatar?: string
  isOnline: boolean
  lastSeen?: Date
}

export interface ChatMessage {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'file'
  fileName?: string
  fileSize?: string
  imageUrl?: string
  isRead: boolean
}

export interface Chat {
  id: string
  type: 'direct' | 'group'
  name: string
  avatar?: string
  participants: ChatUser[]
  lastMessage?: ChatMessage
  unreadCount: number
  isOnline?: boolean
  lastActivity?: Date
}

export interface ChatGroup extends Chat {
  type: 'group'
  description?: string
  adminIds: string[]
  createdAt: Date
}

export interface DirectChat extends Chat {
  type: 'direct'
  otherUser: ChatUser
}
