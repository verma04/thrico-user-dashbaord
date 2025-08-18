"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Search, Plus, Users, MessageCircle } from "lucide-react"
import { mockChats } from "@/lib/chat-data"
import { Chat } from "@/types/chat"
import { formatDistanceToNow } from "date-fns"

interface ChatSidebarProps {
  selectedChat: string | null
  onSelectChat: (chatId: string) => void
}

export function ChatSidebar({ selectedChat, onSelectChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<'all' | 'unread' | 'online'>('all')

  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && chat.unreadCount > 0) ||
      (filter === 'online' && chat.isOnline)
    
    return matchesSearch && matchesFilter
  })

  const formatLastActivity = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true })
  }

  const getLastMessagePreview = (chat: Chat) => {
    if (!chat.lastMessage) return "No messages yet"
    
    const content = chat.lastMessage.content
    const truncated = content.length > 50 ? content.substring(0, 50) + "..." : content
    
    if (chat.type === 'group' && chat.lastMessage.senderId !== "1") {
      const sender = chat.participants.find(p => p.id === chat.lastMessage?.senderId)
      return `${sender?.name.split(' ')[0]}: ${truncated}`
    }
    
    return truncated
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilter('unread')}
          >
            Unread
          </Button>
          <Button
            size="sm"
            variant={filter === 'online' ? 'default' : 'outline'}
            onClick={() => setFilter('online')}
          >
            Online
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                selectedChat === chat.id ? 'bg-accent' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>
                    {chat.type === 'group' ? (
                      <Users className="h-6 w-6" />
                    ) : (
                      chat.name.charAt(0).toUpperCase()
                    )}
                  </AvatarFallback>
                </Avatar>
                {chat.type === 'direct' && chat.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                )}
                {chat.type === 'group' && (
                  <div className="absolute -bottom-1 -right-1">
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <MessageCircle className="h-2 w-2" />
                    </div>
                  </div>
                )}
              </div>

              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{chat.name}</h3>
                  <div className="flex items-center gap-2">
                    {chat.lastActivity && (
                      <span className="text-xs text-muted-foreground">
                        {formatLastActivity(chat.lastActivity)}
                      </span>
                    )}
                    {chat.unreadCount > 0 && (
                      <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {getLastMessagePreview(chat)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">No conversations found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Try adjusting your search' : 'Start a new conversation to get chatting'}
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
