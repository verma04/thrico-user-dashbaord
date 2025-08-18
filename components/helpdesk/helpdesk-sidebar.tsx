'use client'

import React, { useState } from 'react'
import { Search, Filter, GitBranch, Circle, CheckCircle2, User, ChevronDown, Github, AlertTriangle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { mockIssues, workspaces, type GitHubIssue } from './mock-data'
import { cn } from '@/lib/utils'

interface HelpdeskSidebarProps {
  selectedIssue: GitHubIssue | null
  onSelectIssue: (issue: GitHubIssue) => void
}

export function HelpdeskSidebar({ selectedIssue, onSelectIssue }: HelpdeskSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed' | 'assigned' | 'critical' | 'module'>('all')
  const [selectedWorkspace, setSelectedWorkspace] = useState('all')
  const [selectedModule, setSelectedModule] = useState('all')
  const [workspaceExpanded, setWorkspaceExpanded] = useState(true)

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.module.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesFilter = true
    switch (filterStatus) {
      case 'open':
        matchesFilter = issue.state === 'open'
        break
      case 'closed':
        matchesFilter = issue.state === 'closed'
        break
      case 'assigned':
        matchesFilter = issue.assignee !== null
        break
      case 'critical':
        matchesFilter = issue.severity === 'critical' || issue.module.status === 'critical'
        break
      case 'module':
        matchesFilter = selectedModule === 'all' || issue.module.name === selectedModule
        break
    }

    const matchesWorkspace = selectedWorkspace === 'all' || 
                           issue.repository.full_name === selectedWorkspace

    const matchesModule = selectedModule === 'all' || 
                         issue.module.name === selectedModule

    return matchesSearch && matchesFilter && matchesWorkspace && matchesModule
  })

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Github className="h-5 w-5 text-gray-600" />
          <h2 className="font-semibold text-gray-900">Issues</h2>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Workspace Selector */}
        <Collapsible open={workspaceExpanded} onOpenChange={setWorkspaceExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto mb-2">
              <span className="text-sm font-medium text-gray-700">Workspaces</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", workspaceExpanded && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
              <SelectTrigger className="mb-3">
                <SelectValue placeholder="Select workspace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Workspaces</SelectItem>
                {workspaces.map(workspace => (
                  <SelectItem key={workspace.id} value={workspace.full_name}>
                    <div className="flex flex-col items-start">
                      <span>{workspace.name}</span>
                      <span className="text-xs text-gray-500">{workspace.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Module Selector */}
            {selectedWorkspace !== 'all' && (
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger className="mb-3">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  {workspaces.find(w => w.full_name === selectedWorkspace)?.modules.map(module => (
                    <SelectItem key={module.name} value={module.name}>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          module.status === 'critical' && "bg-red-500",
                          module.status === 'warning' && "bg-yellow-500",
                          module.status === 'healthy' && "bg-green-500"
                        )} />
                        <span>{module.name}</span>
                        {module.issues > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {module.issues}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'open' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('open')}
            className="flex items-center gap-1"
          >
            <Circle className="h-3 w-3" />
            Open
          </Button>
          <Button
            variant={filterStatus === 'closed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('closed')}
            className="flex items-center gap-1"
          >
            <CheckCircle2 className="h-3 w-3" />
            Closed
          </Button>
          <Button
            variant={filterStatus === 'assigned' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('assigned')}
            className="flex items-center gap-1"
          >
            <User className="h-3 w-3" />
            Assigned
          </Button>
          <Button
            variant={filterStatus === 'critical' ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('critical')}
            className="flex items-center gap-1"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Critical
          </Button>
        </div>
      </div>

      {/* Issues List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No issues found</p>
            </div>
          ) : (
            filteredIssues.map(issue => (
              <div
                key={issue.id}
                onClick={() => onSelectIssue(issue)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer mb-2 transition-colors",
                  selectedIssue?.id === issue.id
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50 border border-transparent"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex flex-col items-center gap-1">
                    {issue.state === 'open' ? (
                      <Circle className="h-4 w-4 text-green-500" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                    )}
                    {/* Module Status Indicator */}
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      issue.module.status === 'critical' && "bg-red-500",
                      issue.module.status === 'warning' && "bg-yellow-500", 
                      issue.module.status === 'error' && "bg-orange-500",
                      issue.module.status === 'healthy' && "bg-green-500"
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {issue.title}
                      </span>
                      <span className="text-xs text-gray-500">#{issue.number}</span>
                      {issue.severity === 'critical' && (
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                    
                    {/* Module Information */}
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-blue-600 font-medium">{issue.module.name}</span>
                      <span className="text-xs text-gray-400">v{issue.module.version}</span>
                      {issue.affected_users > 0 && (
                        <Badge variant="destructive" className="text-xs h-4">
                          {issue.affected_users} users
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {issue.body}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {issue.labels.slice(0, 2).map(label => (
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
                      
                      {issue.assignee && (
                        <img
                          src={issue.assignee.avatar_url}
                          alt={issue.assignee.login}
                          className="h-5 w-5 rounded-full"
                        />
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-1">
                      {issue.repository.name} • {new Date(issue.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
