"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Calendar, MapPin, Users, Star, Clock, Ticket } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface EventFilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: EventFilterState
  onFiltersChange: (filters: EventFilterState) => void
  resultCount: number
}

const EVENT_CATEGORIES = [
  "Technology",
  "Business",
  "Arts & Culture",
  "Sports",
  "Music",
  "Food & Drink",
  "Health & Wellness",
  "Education",
  "Community",
  "Charity",
]

const EVENT_TYPES = [
  "In-person",
  "Virtual",
  "Hybrid",
  "Workshop",
  "Conference",
  "Networking",
  "Social",
  "Training",
]

const DATE_RANGES = [
  "Today",
  "Tomorrow",
  "This Week",
  "This Weekend",
  "Next Week",
  "This Month",
  "Next Month",
]

const FEATURES = [
  "Free",
  "Paid",
  "Registration Required",
  "Open to All",
  "Members Only",
  "Live Streaming",
  "Recording Available",
  "Certificates",
  "Networking Opportunities",
  "Food & Refreshments",
]

export function EventFilterModal({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  resultCount,
}: EventFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<EventFilterState>(filters)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    eventTypes: true,
    dateRange: true,
    price: true,
    features: true,
  })

  const updateLocalFilters = (updates: Partial<EventFilterState>) => {
    setLocalFilters((prev) => ({ ...prev, ...updates }))
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleCategory = (category: string) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category]
    updateLocalFilters({ categories: newCategories })
  }

  const toggleEventType = (type: string) => {
    const newTypes = localFilters.eventTypes.includes(type)
      ? localFilters.eventTypes.filter((t) => t !== type)
      : [...localFilters.eventTypes, type]
    updateLocalFilters({ eventTypes: newTypes })
  }

  const toggleDateRange = (range: string) => {
    const newRanges = localFilters.dateRange.includes(range)
      ? localFilters.dateRange.filter((r) => r !== range)
      : [...localFilters.dateRange, range]
    updateLocalFilters({ dateRange: newRanges })
  }

  const toggleFeature = (feature: string) => {
    const newFeatures = localFilters.features.includes(feature)
      ? localFilters.features.filter((f) => f !== feature)
      : [...localFilters.features, feature]
    updateLocalFilters({ features: newFeatures })
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    onOpenChange(false)
  }

  const handleClearAll = () => {
    const clearedFilters: EventFilterState = {
      searchText: localFilters.searchText,
      categories: [],
      eventTypes: [],
      dateRange: [],
      location: "",
      priceRange: { min: 0, max: 1000 },
      features: [],
      sortBy: "popular",
    }
    setLocalFilters(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    return (
      localFilters.categories.length +
      localFilters.eventTypes.length +
      localFilters.dateRange.length +
      localFilters.features.length +
      (localFilters.location ? 1 : 0)
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Filter Events</span>
            <span className="text-sm font-normal text-muted-foreground">
              {resultCount} events found
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categories */}
          <Collapsible
            open={expandedSections.categories}
            onOpenChange={() => toggleSection("categories")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="font-medium">Categories</span>
                {localFilters.categories.length > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {localFilters.categories.length}
                  </span>
                )}
              </div>
              {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="grid grid-cols-2 gap-3">
                {EVENT_CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={localFilters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Event Types */}
          <Collapsible
            open={expandedSections.eventTypes}
            onOpenChange={() => toggleSection("eventTypes")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Event Type</span>
                {localFilters.eventTypes.length > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {localFilters.eventTypes.length}
                  </span>
                )}
              </div>
              {expandedSections.eventTypes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="grid grid-cols-2 gap-3">
                {EVENT_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={localFilters.eventTypes.includes(type)}
                      onCheckedChange={() => toggleEventType(type)}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Date Range */}
          <Collapsible
            open={expandedSections.dateRange}
            onOpenChange={() => toggleSection("dateRange")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">When</span>
                {localFilters.dateRange.length > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {localFilters.dateRange.length}
                  </span>
                )}
              </div>
              {expandedSections.dateRange ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="grid grid-cols-2 gap-3">
                {DATE_RANGES.map((range) => (
                  <div key={range} className="flex items-center space-x-2">
                    <Checkbox
                      id={`date-${range}`}
                      checked={localFilters.dateRange.includes(range)}
                      onCheckedChange={() => toggleDateRange(range)}
                    />
                    <Label htmlFor={`date-${range}`} className="text-sm">
                      {range}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Price Range */}
          <Collapsible
            open={expandedSections.price}
            onOpenChange={() => toggleSection("price")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span className="font-medium">Price Range</span>
              </div>
              {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="space-y-4">
                <div className="px-3">
                  <Slider
                    value={[localFilters.priceRange.min, localFilters.priceRange.max]}
                    onValueChange={([min, max]) => updateLocalFilters({ priceRange: { min, max } })}
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${localFilters.priceRange.min}</span>
                  <span>${localFilters.priceRange.max}+</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Location</span>
            </div>
            <Input
              placeholder="Enter city or location"
              value={localFilters.location}
              onChange={(e) => updateLocalFilters({ location: e.target.value })}
            />
          </div>

          {/* Features */}
          <Collapsible
            open={expandedSections.features}
            onOpenChange={() => toggleSection("features")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-medium">Features</span>
                {localFilters.features.length > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {localFilters.features.length}
                  </span>
                )}
              </div>
              {expandedSections.features ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="grid grid-cols-2 gap-3">
                {FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={localFilters.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <Label htmlFor={`feature-${feature}`} className="text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Sort By */}
          <div className="space-y-3">
            <span className="font-medium">Sort By</span>
            <Select value={localFilters.sortBy} onValueChange={(value: any) => updateLocalFilters({ sortBy: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="nearby">Nearby</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleClearAll}>
              Clear All
            </Button>
            <span className="text-sm text-muted-foreground">
              {getActiveFiltersCount()} filters applied
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Show {resultCount} Events
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
