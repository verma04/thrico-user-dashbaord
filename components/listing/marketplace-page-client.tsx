"use client"

import { useState } from "react"
import { ListingHeader } from "@/components/listing/listing-header"
import { MarketplaceSearchAndFilters } from "@/components/listing/marketplace-search-and-filters"
import { MarketplaceFilterModal } from "@/components/listing/marketplace-filter-modal"
import { ListingTabs } from "@/components/listing/listing-tabs"
import { MarketplaceList } from "@/components/listing/listing-list"
import { ListingSidebar } from "@/components/listing/list-sidebar"

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

interface MarketplacePageClientProps {
  currentTab: string
}

export function MarketplacePageClient({ currentTab }: MarketplacePageClientProps) {
  const [filters, setFilters] = useState<MarketplaceFilterState>({
    searchText: "",
    categories: [],
    listingTypes: [],
    conditions: [],
    priceRange: { min: 0, max: 10000 },
    features: [],
    sortBy: "newest",
    location: "",
  })
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const activeFiltersCount = 
    filters.categories.length +
    filters.listingTypes.length +
    filters.conditions.length +
    filters.features.length +
    (filters.location ? 1 : 0) +
    (filters.priceRange.min > 0 || filters.priceRange.max < 10000 ? 1 : 0)

  const handleFilterRemove = (filterType: string, value: string) => {
    setFilters(prev => {
      switch (filterType) {
        case "categories":
          return { ...prev, categories: prev.categories.filter(c => c !== value) }
        case "listingTypes":
          return { ...prev, listingTypes: prev.listingTypes.filter(t => t !== value) }
        case "conditions":
          return { ...prev, conditions: prev.conditions.filter(c => c !== value) }
        case "features":
          return { ...prev, features: prev.features.filter(f => f !== value) }
        case "location":
          return { ...prev, location: "" }
        default:
          return prev
      }
    })
  }

  const handleClearAll = () => {
    setFilters({
      searchText: "",
      categories: [],
      listingTypes: [],
      conditions: [],
      priceRange: { min: 0, max: 10000 },
      features: [],
      sortBy: "newest",
      location: "",
    })
  }

  return (
    <div className="p-4 md:p-6">
      <ListingHeader />
      
      <MarketplaceSearchAndFilters
        searchText={filters.searchText}
        onSearchChange={(text) => setFilters(prev => ({ ...prev, searchText: text }))}
        onFilterClick={() => setIsFilterModalOpen(true)}
        activeFiltersCount={activeFiltersCount}
        filters={filters}
        onFilterRemove={handleFilterRemove}
        onClearAll={handleClearAll}
      />
      
      <ListingTabs currentTab={currentTab} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <MarketplaceList currentTab={currentTab} />
        </div>
        <ListingSidebar />
      </div>

      <MarketplaceFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  )
}
