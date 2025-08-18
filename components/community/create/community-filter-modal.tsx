"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Activity, Shield, Users, Star, Crown } from "lucide-react"

import { RecommendedFilters } from "./filter-modal/recommended-filters"
import { CommunityTypeSelector } from "./filter-modal/community-type-selector"
import { MemberCountFilter } from "./filter-modal/member-count-filter"
import { CategoryFilter } from "./filter-modal/category-filter"
import { FeaturesFilter } from "./filter-modal/features-filter"
import { SortAndLocation } from "./filter-modal/sort-and-location"

interface FilterState {
  searchText: string
  categories: string[]
  privacy: string[]
  memberRange: { min: number; max: number }
  features: string[]
  sortBy: "popular" | "newest" | "active"
  location: string
}

interface CommunityFilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  resultCount: number
}

const JOINING_OPTIONS = [
  { key: "instant_join", label: "Instant Join", icon: Activity },
  { key: "approval_required", label: "Approval Required", icon: Shield },
  { key: "free_to_join", label: "Free to Join", icon: Users },
  { key: "verified_only", label: "Verified Members Only", icon: Shield },
]

const STANDOUT_COMMUNITIES = [
  {
    key: "featured",
    title: "Featured Communities",
    subtitle: "The most popular communities",
    icon: Star,
  },
  {
    key: "premium",
    title: "Premium",
    subtitle: "Communities with premium features",
    icon: Crown,
  },
]

export function CommunityFilterModal({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  resultCount,
}: CommunityFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)
  const [showMoreFeatures, setShowMoreFeatures] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    recommended: true,
    type: true,
    memberCount: true,
    features: true,
  })

  const updateLocalFilters = (updates: Partial<FilterState>) => {
    setLocalFilters((prev) => ({ ...prev, ...updates }))
  }

  const toggleCategory = (category: string) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category]
    updateLocalFilters({ categories: newCategories })
  }

  const togglePrivacy = (privacy: string) => {
    const newPrivacy = localFilters.privacy.includes(privacy)
      ? localFilters.privacy.filter((p) => p !== privacy)
      : [...localFilters.privacy, privacy]
    updateLocalFilters({ privacy: newPrivacy })
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

  const handleClear = () => {
    const clearedFilters: FilterState = {
      searchText: "",
      categories: [],
      privacy: [],
      memberRange: { min: 0, max: 10000 },
      features: [],
      sortBy: "popular",
      location: "",
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
          <DialogTitle className="text-xl font-semibold">Filters</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Recommended Filters */}
          <Collapsible open={expandedSections.recommended} onOpenChange={() => toggleSection("recommended")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Recommended for you</h3>
              {expandedSections.recommended ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <RecommendedFilters selectedFeatures={localFilters.features} onToggleFeature={toggleFeature} />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Community Type */}
          <Collapsible open={expandedSections.type} onOpenChange={() => toggleSection("type")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Type of community</h3>
              {expandedSections.type ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <CommunityTypeSelector
                selectedPrivacy={localFilters.privacy}
                onTogglePrivacy={togglePrivacy}
                onClearPrivacy={() => updateLocalFilters({ privacy: [] })}
              />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Member Count */}
          <Collapsible open={expandedSections.memberCount} onOpenChange={() => toggleSection("memberCount")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Member count</h3>
              {expandedSections.memberCount ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <MemberCountFilter
                memberRange={localFilters.memberRange}
                onRangeChange={(range) => updateLocalFilters({ memberRange: range })}
              />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Categories */}
          <CategoryFilter selectedCategories={localFilters.categories} onToggleCategory={toggleCategory} />

          <Separator />

          {/* Features */}
          <Collapsible open={expandedSections.features} onOpenChange={() => toggleSection("features")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Features</h3>
              {expandedSections.features ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <FeaturesFilter
                selectedFeatures={localFilters.features}
                onToggleFeature={toggleFeature}
                showMore={showMoreFeatures}
                onToggleShowMore={() => setShowMoreFeatures(!showMoreFeatures)}
              />
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Joining Options */}
          <div>
            <h3 className="text-lg font-medium mb-4">Joining options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOINING_OPTIONS.map(({ key, label, icon: Icon }) => {
                const isSelected = localFilters.features.includes(key)
                return (
                  <Button
                    key={key}
                    variant={isSelected ? "default" : "outline"}
                    className="flex items-center gap-2 justify-start h-auto py-3"
                    onClick={() => toggleFeature(key)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Standout Communities */}
          <div>
            <h3 className="text-lg font-medium mb-4">Standout communities</h3>
            <div className="space-y-3">
              {STANDOUT_COMMUNITIES.map(({ key, title, subtitle, icon: Icon }) => (
                <Button
                  key={key}
                  variant="ghost"
                  className="flex items-center gap-3 justify-start h-auto py-3 w-full"
                  onClick={() => toggleFeature(key)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{title}</div>
                    <div className="text-sm text-gray-600">{subtitle}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Sort and Location */}
          <SortAndLocation
            sortBy={localFilters.sortBy}
            location={localFilters.location}
            onSortChange={(sort) => updateLocalFilters({ sortBy: sort })}
            onLocationChange={(location) => updateLocalFilters({ location })}
          />
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t gap-2 sm:gap-0">
          <Button variant="ghost" onClick={handleClear} className="w-full sm:w-auto">
            Clear all
          </Button>
          <Button onClick={handleApply} className="min-w-[150px] w-full sm:w-auto">
            Show {resultCount} communities
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
