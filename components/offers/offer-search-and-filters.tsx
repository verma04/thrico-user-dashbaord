"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { OfferFilterState } from "./offers-list"

interface OfferSearchAndFiltersProps {
  searchText: string
  onSearchChange: (text: string) => void
  onFilterClick: () => void
  activeFiltersCount: number
  filters: OfferFilterState
  onFilterRemove: (filterType: string, value: string) => void
  onClearAll: () => void
}

export function OfferSearchAndFilters({
  searchText,
  onSearchChange,
  onFilterClick,
  activeFiltersCount,
  filters,
  onFilterRemove,
  onClearAll,
}: OfferSearchAndFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search offers..."
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
          {filters.conditions.map((condition) => (
            <Badge key={condition} variant="secondary" className="flex items-center gap-1">
              {condition}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterRemove("conditions", condition)} />
            </Badge>
          ))}
          {filters.offerTypes.map((type) => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              {type}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterRemove("offerTypes", type)} />
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
