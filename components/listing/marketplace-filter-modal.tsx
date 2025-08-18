"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CategoryFilter } from "./filter-modal/category-filter"
import { ListingTypeFilter } from "./filter-modal/listing-type-filter"
import { ConditionFilter } from "./filter-modal/condition-filter"
import { PriceRangeFilter } from "./filter-modal/price-range-filter"
import { RecommendedFilters } from "./filter-modal/recommended-filters"
import { SortAndLocation } from "./filter-modal/sort-and-location"

interface MarketplaceFilterState {
  searchText: string
  categories: string[]
  listingTypes: string[]
  conditions: string[]
  priceRange: { min: number; max: number }
  features: string[]
  sortBy: "newest" | "price-low" | "price-high" | "popular" | "distance"
  location: string
}

interface MarketplaceFilterModalProps {
  isOpen: boolean
  onClose: () => void
  filters: MarketplaceFilterState
  onFiltersChange: (filters: MarketplaceFilterState) => void
}

export function MarketplaceFilterModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: MarketplaceFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<MarketplaceFilterState>(filters)

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const handleResetFilters = () => {
    const resetFilters: MarketplaceFilterState = {
      searchText: "",
      categories: [],
      listingTypes: [],
      conditions: [],
      priceRange: { min: 0, max: 10000 },
      features: [],
      sortBy: "newest",
      location: "",
    }
    setLocalFilters(resetFilters)
  }

  const toggleCategory = (category: string) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const toggleListingType = (type: string) => {
    setLocalFilters(prev => ({
      ...prev,
      listingTypes: prev.listingTypes.includes(type)
        ? prev.listingTypes.filter(t => t !== type)
        : [...prev.listingTypes, type]
    }))
  }

  const toggleCondition = (condition: string) => {
    setLocalFilters(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }))
  }

  const toggleFeature = (feature: string) => {
    setLocalFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const updatePriceRange = (priceRange: { min: number; max: number }) => {
    setLocalFilters(prev => ({ ...prev, priceRange }))
  }

  const updateSort = (sortBy: string) => {
    setLocalFilters(prev => ({ ...prev, sortBy: sortBy as any }))
  }

  const updateLocation = (location: string) => {
    setLocalFilters(prev => ({ ...prev, location }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Filter Marketplace</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            <RecommendedFilters
              selectedFeatures={localFilters.features}
              onToggleFeature={toggleFeature}
            />
            
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryFilter
                selectedCategories={localFilters.categories}
                onToggleCategory={toggleCategory}
              />

              <ListingTypeFilter
                selectedTypes={localFilters.listingTypes}
                onToggleType={toggleListingType}
              />

              <ConditionFilter
                selectedConditions={localFilters.conditions}
                onToggleCondition={toggleCondition}
              />

              <PriceRangeFilter
                priceRange={localFilters.priceRange}
                onPriceChange={updatePriceRange}
              />
            </div>

            <Separator />

            <SortAndLocation
              sortBy={localFilters.sortBy}
              location={localFilters.location}
              onSortChange={updateSort}
              onLocationChange={updateLocation}
            />
          </div>
        </ScrollArea>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset All
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
