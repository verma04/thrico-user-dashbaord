"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface EventFilterState {
  searchText: string
  categories: string[]
  eventTypes: string[]
  dateRange: string[]
  location: string
  priceRange: { min: number; max: number }
  features: string[]
  sortBy: "popular" | "newest" | "upcoming" | "nearby"
}

interface EventSearchAndFiltersProps {
  searchText: string
  onSearchChange: (text: string) => void
  onFilterClick: () => void
  activeFiltersCount: number
  filters: EventFilterState
  onFilterRemove: (filterType: string, value: string) => void
  onClearAll: () => void
}

export function EventSearchAndFilters({
  searchText,
  onSearchChange,
  onFilterClick,
  activeFiltersCount,
  filters,
  onFilterRemove,
  onClearAll,
}: EventSearchAndFiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={onFilterClick} className="flex items-center gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterRemove("categories", category)} />
            </Badge>
          ))}
          {filters.eventTypes.map((type) => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              {type}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterRemove("eventTypes", type)} />
            </Badge>
          ))}
          {filters.dateRange.map((range) => (
            <Badge key={range} variant="secondary" className="flex items-center gap-1">
              {range}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterRemove("dateRange", range)} />
            </Badge>
          ))}
          {filters.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="flex items-center gap-1">
              {feature}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterRemove("features", feature)} />
            </Badge>
          ))}
          {filters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.location}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterRemove("location", filters.location)} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
