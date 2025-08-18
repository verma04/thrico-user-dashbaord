"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, MessageSquare, HelpCircle, Lightbulb, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterState {
  searchText: string
  categories: string[]
  discussionType: string[]
  sortBy: "trending" | "newest" | "oldest" | "most_replies"
  tags: string[]
  status: string[]
}

interface DiscussionFilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  resultCount: number
}

const DISCUSSION_TYPES = [
  { key: "question", label: "Questions", icon: HelpCircle },
  { key: "discussion", label: "General Discussion", icon: MessageSquare },
  { key: "idea", label: "Ideas & Suggestions", icon: Lightbulb },
  { key: "announcement", label: "Announcements", icon: AlertCircle },
]

const DISCUSSION_STATUS = [
  { key: "open", label: "Open", icon: Clock },
  { key: "solved", label: "Solved", icon: CheckCircle },
  { key: "closed", label: "Closed", icon: AlertCircle },
]

const POPULAR_TAGS = [
  "beginner", "help", "tutorial", "bug", "feature-request", 
  "javascript", "react", "typescript", "css", "html", 
  "backend", "frontend", "mobile", "career", "interview"
]

const CATEGORIES = [
  "General", "Technology", "Career", "Help", "Off-topic", "Announcements"
]

export function DiscussionFilterModal({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  resultCount,
}: DiscussionFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    type: true,
    categories: true,
    status: true,
    tags: true,
  })

  const updateLocalFilters = (updates: Partial<FilterState>) => {
    setLocalFilters((prev) => ({ ...prev, ...updates }))
  }

  const toggleArrayFilter = (filterType: keyof FilterState, value: string) => {
    const currentArray = localFilters[filterType] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateLocalFilters({ [filterType]: newArray })
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    onOpenChange(false)
  }

  const handleClear = () => {
    const clearedFilters: FilterState = {
      searchText: "",
      categories: [],
      discussionType: [],
      sortBy: "trending",
      tags: [],
      status: []
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full max-w-full sm:max-w-2xl sm:max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Discussion Filters</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Sort Options */}
          <div>
            <h3 className="text-lg font-medium mb-4">Sort by</h3>
            <Select value={localFilters.sortBy} onValueChange={(value) => updateLocalFilters({ sortBy: value as FilterState["sortBy"] })}>
              <SelectTrigger>
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="most_replies">Most Replies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Discussion Type */}
          <Collapsible open={expandedSections.type} onOpenChange={() => toggleSection("type")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Discussion Type</h3>
              {expandedSections.type ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCUSSION_TYPES.map(({ key, label, icon: Icon }) => {
                  const isSelected = localFilters.discussionType.includes(key)
                  return (
                    <Button
                      key={key}
                      variant={isSelected ? "default" : "outline"}
                      className="flex items-center gap-2 justify-start h-auto py-3"
                      onClick={() => toggleArrayFilter("discussionType", key)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </Button>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Categories */}
          <Collapsible open={expandedSections.categories} onOpenChange={() => toggleSection("categories")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Categories</h3>
              {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => {
                  const isSelected = localFilters.categories.includes(category)
                  return (
                    <Badge
                      key={category}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayFilter("categories", category)}
                    >
                      {category}
                    </Badge>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Status */}
          <Collapsible open={expandedSections.status} onOpenChange={() => toggleSection("status")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Status</h3>
              {expandedSections.status ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DISCUSSION_STATUS.map(({ key, label, icon: Icon }) => {
                  const isSelected = localFilters.status.includes(key)
                  return (
                    <Button
                      key={key}
                      variant={isSelected ? "default" : "outline"}
                      className="flex items-center gap-2 justify-start h-auto py-3"
                      onClick={() => toggleArrayFilter("status", key)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </Button>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Tags */}
          <Collapsible open={expandedSections.tags} onOpenChange={() => toggleSection("tags")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Popular Tags</h3>
              {expandedSections.tags ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => {
                  const isSelected = localFilters.tags.includes(tag)
                  return (
                    <Badge
                      key={tag}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayFilter("tags", tag)}
                    >
                      #{tag}
                    </Badge>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t gap-2 sm:gap-0">
          <Button variant="ghost" onClick={handleClear} className="w-full sm:w-auto">
            Clear all
          </Button>
          <Button onClick={handleApply} className="min-w-[150px] w-full sm:w-auto">
            Show {resultCount} discussions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
