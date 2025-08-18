"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Video, MoreVertical, Users, Settings } from "lucide-react"
import { mockChats, mockUsers } from "@/lib/chat-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatHeaderProps {
  chatId: string
  onBack: () => void
}

export function ChatHeader({ chatId, onBack }: ChatHeaderProps) {
  const chat = mockChats.find(c => c.id === chatId)
  
  if (!chat) return null

  const getOnlineCount = () => {
    if (chat.type === 'direct') {
      const otherUser = chat.participants.find(p => p.id !== "1")
      return otherUser?.isOnline ? 1 : 0
    }
    return chat.participants.filter(p => p.isOnline).length
  }

  const getStatusText = () => {
    if (chat.type === 'direct') {
      const otherUser = chat.participants.find(p => p.id !== "1")
      if (otherUser?.isOnline) return "Online"
      if (otherUser?.lastSeen) {
        const now = new Date()
        const diff = now.getTime() - otherUser.lastSeen.getTime()
        const minutes = Math.floor(diff / (1000 * 60))
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        
        if (minutes < 5) return "Last seen just now"
        if (minutes < 60) return `Last seen ${minutes}m ago`
        if (hours < 24) return `Last seen ${hours}h ago`
        return `Last seen ${days}d ago`
      }
      return "Offline"
    }
    return `${chat.participants.length} members, ${getOnlineCount()} online`
  }

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>
              {chat.type === 'group' ? (
                <Users className="h-5 w-5" />
              ) : (
                chat.name.charAt(0).toUpperCase()
              )}
            </AvatarFallback>
          </Avatar>
          {chat.type === 'direct' && chat.isOnline && (
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>

        <div>
          <h3 className="font-semibold">{chat.name}</h3>
          <p className="text-sm text-muted-foreground">{getStatusText()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {chat.type === 'direct' && (
          <>
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
          </>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {chat.type === 'group' && (
              <DropdownMenuItem>
                <Users className="h-4 w-4 mr-2" />
                View Members
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Chat Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
