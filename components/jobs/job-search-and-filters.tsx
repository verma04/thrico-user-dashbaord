"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { JobFilterModal, JobFilterState } from "./job-filter-modal"

interface JobSearchAndFiltersProps {
  searchText: string
  onSearchChange: (text: string) => void
  filters: JobFilterState
  onFiltersChange: (filters: JobFilterState) => void
  resultCount?: number
}

export function JobSearchAndFilters({
  searchText,
  onSearchChange,
  filters,
  onFiltersChange,
  resultCount = 0,
}: JobSearchAndFiltersProps) {
  const [showFilterModal, setShowFilterModal] = useState(false)

  const getActiveFiltersCount = () => {
    return (
      filters.jobTypes.length +
      filters.experienceLevels.length +
      filters.categories.length +
      filters.locations.length +
      filters.features.length +
      (filters.remote ? 1 : 0)
    )
  }

  const removeFilter = (filterType: keyof JobFilterState, value: string) => {
    const currentArray = filters[filterType] as string[]
    if (Array.isArray(currentArray)) {
      const newArray = currentArray.filter((item) => item !== value)
      onFiltersChange({ ...filters, [filterType]: newArray })
    }
  }

  const clearAllFilters = () => {
    onFiltersChange({
      searchText: "",
      jobTypes: [],
      experienceLevels: [],
      categories: [],
      salaryRange: { min: 30000, max: 300000 },
      locations: [],
      features: [],
      sortBy: "newest",
      remote: false,
    })
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="space-y-4 mb-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search job title, company, or keywords..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
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

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.jobTypes.map((type) => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              {type}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter("jobTypes", type)} />
            </Badge>
          ))}
          {filters.experienceLevels.map((level) => (
            <Badge key={level} variant="secondary" className="flex items-center gap-1">
              {level}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter("experienceLevels", level)} />
            </Badge>
          ))}
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter("categories", category)} />
            </Badge>
          ))}
          {filters.locations.map((location) => (
            <Badge key={location} variant="secondary" className="flex items-center gap-1">
              {location}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter("locations", location)} />
            </Badge>
          ))}
          {filters.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="flex items-center gap-1">
              {feature}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter("features", feature)} />
            </Badge>
          ))}
          {filters.remote && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Remote
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFiltersChange({ ...filters, remote: false })} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Modal */}
      <JobFilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        filters={filters}
        onFiltersChange={onFiltersChange}
        resultCount={resultCount}
      />
    </div>
  )
}
