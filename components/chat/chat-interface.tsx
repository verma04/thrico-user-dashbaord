"use client"

import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, Image, MoreHorizontal } from "lucide-react"
import { mockMessages, mockUsers, currentUser } from "@/lib/chat-data"
import { ChatMessage } from "@/types/chat"
import { formatDistanceToNow, format, isSameDay } from "date-fns"

interface ChatInterfaceProps {
  chatId: string
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages[chatId] || [])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: "text",
      isRead: false,
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")

    // Simulate typing indicator and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Simulate a response (in a real app, this would come from the server)
      if (chatId.startsWith('chat-')) {
        const responseMessage: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          senderId: "2", // Default to Alex for demo
          content: "Thanks for your message! 👍",
          timestamp: new Date(),
          type: "text",
          isRead: false,
        }
        setMessages(prev => [...prev, responseMessage])
      }
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {}
    
    messages.forEach(message => {
      const dateKey = format(message.timestamp, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(message)
    })
    
    return groups
  }

  const formatMessageTime = (timestamp: Date) => {
    return format(timestamp, 'HH:mm')
  }

  const formatDateLabel = (date: Date) => {
    if (isSameDay(date, new Date())) return "Today"
    if (isSameDay(date, new Date(Date.now() - 24 * 60 * 60 * 1000))) return "Yesterday"
    return format(date, 'MMMM d, yyyy')
  }

  const getSenderInfo = (senderId: string) => {
    if (senderId === currentUser.id) return currentUser
    return mockUsers.find(user => user.id === senderId) || mockUsers[0]
  }

  const groupedMessages = groupMessagesByDate(messages)

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
            <div key={dateKey}>
              {/* Date Separator */}
              <div className="flex items-center justify-center my-4">
                <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                  {formatDateLabel(new Date(dateKey))}
                </div>
              </div>

              {/* Messages for this day */}
              {dayMessages.map((message, index) => {
                const sender = getSenderInfo(message.senderId)
                const isCurrentUser = message.senderId === currentUser.id
                const prevMessage = index > 0 ? dayMessages[index - 1] : null
                const nextMessage = index < dayMessages.length - 1 ? dayMessages[index + 1] : null
                
                const showAvatar = !isCurrentUser && (!nextMessage || nextMessage.senderId !== message.senderId)
                const showName = !isCurrentUser && (!prevMessage || prevMessage.senderId !== message.senderId)

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isCurrentUser && (
                      <div className="w-8">
                        {showAvatar && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={sender.avatar} alt={sender.name} />
                            <AvatarFallback className="text-xs">
                              {sender.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )}

                    <div className={`max-w-[70%] ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                      {showName && !isCurrentUser && (
                        <p className="text-xs text-muted-foreground mb-1 ml-3">
                          {sender.name}
                        </p>
                      )}
                      
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          isCurrentUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm break-words">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          isCurrentUser 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {formatMessageTime(message.timestamp)}
                        </p>
                      </div>
                    </div>

                    {isCurrentUser && (
                      <div className="w-8">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                          <AvatarFallback className="text-xs">
                            {currentUser.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback className="text-xs">A</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="mb-2">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-20 min-h-[40px] py-3"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Image className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="mb-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
