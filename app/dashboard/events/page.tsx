"use client"

import { useState } from "react"
import { EventHeader } from "@/components/events/event-header"
import { EventSidebar } from "@/components/events/event-sidebar"
import { EventTabs } from "@/components/events/event-tabs"
import { EventsList } from "@/components/events/events-list"
import { EventSearchAndFilters } from "@/components/events/events-search-and-filters"
import { EventFilterModal } from "@/components/events/event-filter-modal"

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

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function EventsPage({ searchParams }: PageProps) {
  const { tab = "discover" } = await searchParams

  return <EventsPageClient currentTab={tab} />
}

function EventsPageClient({ currentTab }: { currentTab: string }) {
  const [searchText, setSearchText] = useState("")
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState<EventFilterState>({
    searchText: "",
    categories: [],
    eventTypes: [],
    dateRange: [],
    location: "",
    priceRange: { min: 0, max: 1000 },
    features: [],
    sortBy: "popular",
  })

  const getActiveFiltersCount = () => {
    return (
      filters.categories.length +
      filters.eventTypes.length +
      filters.dateRange.length +
      filters.features.length +
      (filters.location ? 1 : 0)
    )
  }

  const handleFilterRemove = (filterType: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      
      switch (filterType) {
        case "categories":
          newFilters.categories = prev.categories.filter((c) => c !== value)
          break
        case "eventTypes":
          newFilters.eventTypes = prev.eventTypes.filter((t) => t !== value)
          break
        case "dateRange":
          newFilters.dateRange = prev.dateRange.filter((r) => r !== value)
          break
        case "features":
          newFilters.features = prev.features.filter((f) => f !== value)
          break
        case "location":
          newFilters.location = ""
          break
      }
      
      return newFilters
    })
  }

  const handleClearAllFilters = () => {
    setFilters({
      searchText: filters.searchText,
      categories: [],
      eventTypes: [],
      dateRange: [],
      location: "",
      priceRange: { min: 0, max: 1000 },
      features: [],
      sortBy: "popular",
    })
  }

  return (
    <div className="p-4 md:p-6">
      <EventHeader />
      <EventSearchAndFilters
        searchText={searchText}
        onSearchChange={setSearchText}
        onFilterClick={() => setFilterModalOpen(true)}
        activeFiltersCount={getActiveFiltersCount()}
        filters={filters}
        onFilterRemove={handleFilterRemove}
        onClearAll={handleClearAllFilters}
      />
      <EventTabs currentTab={currentTab} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <EventsList currentTab={currentTab} />
        </div>
        <EventSidebar />
      </div>

      <EventFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={25} // You can replace this with actual count
      />
    </div>
  )
}
