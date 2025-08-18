'use client'

import React from 'react'
import { 
  Calendar, 
  GitBranch, 
  MessageSquare, 
  Tag, 
  Users, 
  Clock,
  ExternalLink,
  CheckCircle2,
  Circle,
  GitMerge,
  AlertTriangle,
  Activity,
  Server,
  TrendingUp,
  Database,
  Code,
  Monitor
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type IssueReport } from './mock-data'
import { cn } from '@/lib/utils'

interface IssueMetadataProps {
  issue: IssueReport | null
}

export function IssueMetadata({ issue }: IssueMetadataProps) {
  if (!issue) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Tag className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No issue selected</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="h-full bg-gray-50 border-l border-gray-200">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {/* Module Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Code className="h-4 w-4" />
                Module Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{issue.module.name}</span>
                <div className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  issue.module.status === 'critical' && "bg-red-100 text-red-700",
                  issue.module.status === 'warning' && "bg-yellow-100 text-yellow-700",
                  issue.module.status === 'error' && "bg-orange-100 text-orange-700",
                  issue.module.status === 'healthy' && "bg-green-100 text-green-700"
                )}>
                  {issue.module.status.toUpperCase()}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <p>Path: {issue.module.path}</p>
                <p>Version: {issue.module.version}</p>
                <p>Environment: {issue.environment}</p>
              </div>
            </CardContent>
          </Card>

          {/* Severity & Priority */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Severity & Priority
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Severity</span>
                <Badge 
                  variant={issue.severity === 'critical' ? 'destructive' : 
                          issue.severity === 'high' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {issue.severity.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Priority</span>
                <Badge 
                  variant={issue.priority === 'urgent' ? 'destructive' : 
                          issue.priority === 'high' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {issue.priority.toUpperCase()}
                </Badge>
              </div>
              {issue.affected_users > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Affected Users</span>
                  <span className="text-sm font-medium text-red-600">
                    {issue.affected_users.toLocaleString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium">Response Time</span>
                  </div>
                  <span className="text-sm font-bold">{issue.metrics.response_time}ms</span>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Activity className="h-3 w-3 text-red-500" />
                    <span className="text-xs font-medium">Error Rate</span>
                  </div>
                  <span className="text-sm font-bold">{issue.metrics.error_rate}%</span>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Server className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium">Uptime</span>
                  </div>
                  <span className="text-sm font-bold">{issue.metrics.uptime}%</span>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">Users</span>
                  </div>
                  <span className="text-sm font-bold">{issue.metrics.affected_users_count}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status & Assignee */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Status & Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                {issue.state === 'open' ? (
                  <Circle className="h-4 w-4 text-green-500" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                )}
                <span className="text-sm font-medium capitalize">{issue.state}</span>
              </div>
              
              {issue.assignee ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={issue.assignee.avatar_url} />
                    <AvatarFallback>
                      {issue.assignee.login.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{issue.assignee.login}</p>
                    <p className="text-xs text-gray-500">Assignee</p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  No one assigned
                </div>
              )}
            </CardContent>
          </Card>

          {/* Error Logs */}
          {issue.error_logs.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Recent Error Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {issue.error_logs.slice(0, 5).map(log => (
                    <div key={log.id} className="p-2 bg-gray-50 rounded text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          log.level === 'error' && "bg-red-500",
                          log.level === 'warning' && "bg-yellow-500",
                          log.level === 'info' && "bg-blue-500"
                        )} />
                        <span className="font-medium">{log.level.toUpperCase()}</span>
                        <span className="text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-1">{log.message}</p>
                      {log.ip_address && (
                        <p className="text-gray-500">IP: {log.ip_address}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Labels */}
          {issue.labels.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Labels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {issue.labels.map(label => (
                    <Badge
                      key={label.name}
                      variant="secondary"
                      className="text-xs"
                      style={{ 
                        backgroundColor: `#${label.color}20`, 
                        color: `#${label.color}`,
                        borderColor: `#${label.color}40`
                      }}
                    >
                      {label.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-xs text-gray-500">{formatDate(issue.created_at)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Last updated</p>
                  <p className="text-xs text-gray-500">{formatDate(issue.updated_at)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Comments</p>
                  <p className="text-xs text-gray-500">{issue.comments.length} total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repository Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Project Repository
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">{issue.repository.name}</p>
                <p className="text-xs text-gray-500">{issue.repository.full_name}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Repository
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pull Requests */}
          {issue.pull_requests.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <GitMerge className="h-4 w-4" />
                  Linked Pull Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {issue.pull_requests.map(pr => (
                    <div key={pr.id} className="p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        {pr.state === 'merged' ? (
                          <GitMerge className="h-3 w-3 text-purple-500" />
                        ) : pr.state === 'open' ? (
                          <Circle className="h-3 w-3 text-green-500" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3 text-red-500" />
                        )}
                        <span className="text-sm font-medium">#{pr.number}</span>
                        <Badge 
                          variant={pr.state === 'merged' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {pr.state}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{pr.title}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full h-7 text-xs"
                        onClick={() => window.open(pr.html_url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View PR
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Participants */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Issue Creator */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={issue.user.avatar_url} />
                    <AvatarFallback>
                      {issue.user.login.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{issue.user.login}</p>
                    <p className="text-xs text-gray-500">Reporter</p>
                  </div>
                </div>

                {/* Unique commenters */}
                {Array.from(new Set(issue.comments.map(c => c.user.login)))
                  .filter(login => login !== issue.user.login)
                  .map(login => {
                    const commenter = issue.comments.find(c => c.user.login === login)?.user
                    if (!commenter) return null
                    
                    return (
                      <div key={login} className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={commenter.avatar_url} />
                          <AvatarFallback>
                            {login.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{login}</p>
                          <p className="text-xs text-gray-500">
                            {commenter.type === 'Bot' ? 'Bot' : 'Participant'}
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
