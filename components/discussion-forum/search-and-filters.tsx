"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import { DiscussionFilterModal } from "./discussion-filter-modal"

interface FilterState {
  searchText: string
  categories: string[]
  discussionType: string[]
  sortBy: "trending" | "newest" | "oldest" | "most_replies"
  tags: string[]
  status: string[]
}

const categories = ["All", "General", "Technology", "Career", "Help", "Off-topic", "Announcements"]

export function SearchAndFilters() {
  const [searchText, setSearchText] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    searchText: "",
    categories: [],
    discussionType: [],
    sortBy: "trending",
    tags: [],
    status: []
  })

  const activeFiltersCount = 
    filters.categories.length + 
    filters.discussionType.length + 
    filters.tags.length + 
    filters.status.length + 
    (filters.sortBy !== "trending" ? 1 : 0)

  const handleFilterRemove = (filterType: string, value: string) => {
    setFilters(prev => {
      const currentValue = prev[filterType as keyof FilterState]
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [filterType]: currentValue.filter((item: string) => item !== value)
        }
      }
      return prev
    })
  }

  const handleClearAll = () => {
    setFilters({
      searchText: "",
      categories: [],
      discussionType: [],
      sortBy: "trending",
      tags: [],
      status: []
    })
  }

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setFilters(prev => ({ ...prev, categories: [] }))
    } else {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      }))
    }
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search discussions..." 
            className="pl-10 w-full" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilterModal(true)} 
          className="flex items-center gap-2 bg-transparent"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Category Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = category === "All" 
            ? filters.categories.length === 0 
            : filters.categories.includes(category)
          return (
            <Badge 
              key={category} 
              variant={isSelected ? "default" : "outline"} 
              className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          )
        })}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterRemove("categories", category)} />
            </Badge>
          ))}
          {filters.discussionType.map((type) => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              {type}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterRemove("discussionType", type)} />
            </Badge>
          ))}
          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              #{tag}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterRemove("tags", tag)} />
            </Badge>
          ))}
          {filters.status.map((status) => (
            <Badge key={status} variant="secondary" className="flex items-center gap-1">
              {status}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterRemove("status", status)} />
            </Badge>
          ))}
          {filters.sortBy !== "trending" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sort: {filters.sortBy}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, sortBy: "trending" }))} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            Clear all
          </Button>
        </div>
      )}

      <DiscussionFilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={42} // This would come from actual data
      />
    </div>
  )
}
