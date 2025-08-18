'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Circle, 
  CheckCircle2, 
  User, 
  Clock,
  GitBranch,
  Eye,
  EyeOff,
  UserPlus,
  X,
  AlertTriangle,
  Activity,
  Users as UsersIcon,
  Server,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { type GitHubIssue, type Comment } from './mock-data'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
  issue: GitHubIssue | null
  onToggleMetadata: () => void
  showMetadata: boolean
}

export function ChatInterface({ issue, onToggleMetadata, showMetadata }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [issue?.comments])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !issue) return
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', newMessage)
    setNewMessage('')
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return `${days} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (!issue) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center text-gray-500">
          <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No issue selected</h3>
          <p>Select an issue from the sidebar to start the conversation</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {issue.state === 'open' ? (
                <Circle className="h-5 w-5 text-green-500" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-purple-500" />
              )}
              <Badge variant={issue.state === 'open' ? 'default' : 'secondary'}>
                {issue.state.charAt(0).toUpperCase() + issue.state.slice(1)}
              </Badge>
              {/* Severity Badge */}
              <Badge 
                variant={issue.severity === 'critical' ? 'destructive' : 
                        issue.severity === 'high' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {issue.severity.toUpperCase()}
              </Badge>
              {/* Module Status */}
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
                issue.module.status === 'critical' && "bg-red-100 text-red-700",
                issue.module.status === 'warning' && "bg-yellow-100 text-yellow-700",
                issue.module.status === 'error' && "bg-orange-100 text-orange-700",
                issue.module.status === 'healthy' && "bg-green-100 text-green-700"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  issue.module.status === 'critical' && "bg-red-500",
                  issue.module.status === 'warning' && "bg-yellow-500",
                  issue.module.status === 'error' && "bg-orange-500", 
                  issue.module.status === 'healthy' && "bg-green-500"
                )} />
                {issue.module.name}
              </div>
            </div>
            
            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-gray-900 truncate">
                {issue.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>#{issue.number}</span>
                <span>•</span>
                <span>{issue.repository.name}</span>
                <span>•</span>
                <span>opened by {issue.user.login}</span>
                <span>•</span>
                <span>{formatTime(issue.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {issue.assignee && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={issue.assignee.avatar_url} />
                  <AvatarFallback>
                    {issue.assignee.login.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{issue.assignee.login}</span>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onToggleMetadata}
            >
              {showMetadata ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign to me
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <GitBranch className="h-4 w-4 mr-2" />
                  Create branch
                </DropdownMenuItem>
                <Separator />
                {issue.state === 'open' ? (
                  <DropdownMenuItem>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Close issue
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <Circle className="h-4 w-4 mr-2" />
                    Reopen issue
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Issue Metrics */}
        {issue.affected_users > 0 && (
          <div className="flex items-center gap-4 mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">{issue.affected_users} users affected</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Error rate: {issue.metrics.error_rate}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-green-500" />
              <span className="text-sm">Uptime: {issue.metrics.uptime}%</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Response: {issue.metrics.response_time}ms</span>
            </div>
          </div>
        )}

        {/* Labels */}
        {issue.labels.length > 0 && (
          <div className="flex gap-1 mt-3">
            {issue.labels.map(label => (
              <Badge
                key={label.name}
                variant="secondary"
                className="text-xs"
                style={{ backgroundColor: `#${label.color}20`, color: `#${label.color}` }}
              >
                {label.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {/* Initial Issue */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={issue.user.avatar_url} />
              <AvatarFallback>
                {issue.user.login.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-3 mb-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-sm">{issue.user.login}</span>
                  <span className="text-xs text-gray-500">{formatTime(issue.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{issue.body}</p>
              </div>
            </div>
          </div>

          {/* Comments */}
          {issue.comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              {comment.type === 'system' ? (
                <div className="flex-1">
                  <div className="flex items-center gap-2 py-2">
                    <div className="h-px bg-gray-200 flex-1" />
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{comment.body}</span>
                      <span className="text-xs text-gray-500">{formatTime(comment.created_at)}</span>
                    </div>
                    <div className="h-px bg-gray-200 flex-1" />
                  </div>
                </div>
              ) : (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar_url} />
                    <AvatarFallback>
                      {comment.user.login.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className={cn(
                      "rounded-lg p-3 mb-1",
                      comment.user.type === 'Bot' 
                        ? "bg-blue-50 border border-blue-200" 
                        : "bg-gray-50"
                    )}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm">{comment.user.login}</span>
                        {comment.user.type === 'Bot' && (
                          <Badge variant="secondary" className="text-xs">BOT</Badge>
                        )}
                        <span className="text-xs text-gray-500">{formatTime(comment.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.body}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        {/* Quick Actions */}
        <div className="flex gap-2 mb-3">
          {issue.state === 'open' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('close')}
              className="flex items-center gap-1"
            >
              <CheckCircle2 className="h-3 w-3" />
              Close Issue
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('reopen')}
              className="flex items-center gap-1"
            >
              <Circle className="h-3 w-3" />
              Reopen Issue
            </Button>
          )}
          
          {!issue.assignee && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction('assign')}
              className="flex items-center gap-1"
            >
              <UserPlus className="h-3 w-3" />
              Assign to me
            </Button>
          )}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Write a comment..."
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value)
                setIsTyping(e.target.value.length > 0)
              }}
              onKeyPress={handleKeyPress}
              className="min-h-[60px] resize-none pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-2 right-2"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {isTyping && (
          <div className="text-xs text-gray-500 mt-1">
            Press Enter to send, Shift + Enter for new line
          </div>
        )}
      </div>
    </div>
  )
}
