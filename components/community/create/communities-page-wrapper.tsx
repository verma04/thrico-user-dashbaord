"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { mockCommunities } from "@/components/community/mock-data"
import { SearchAndFilterBar } from "@/components/community/create/search-and-filter-bar"
import { CommunityGrid } from "@/components/community/create/community-grid"
import { EmptyState } from "@/components/community/create/empty-state"
import { CommunityFilterModal } from "@/components/community/create/community-filter-modal"
import { CommunitiesSidebar } from "@/components/community/communities-sidebar"

interface FilterState {
  searchText: string
  categories: string[]
  privacy: string[]
  memberRange: { min: number; max: number }
  features: string[]
  sortBy: "popular" | "newest" | "active"
  location: string
}

interface CommunitiesPageWrapperProps {
  pageType: "discover" | "trending" | "featured" | "my-communities" | "joined" | "saved"
}

export default function CommunitiesPageWrapper({ pageType }: CommunitiesPageWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [communities] = useState(mockCommunities)
  const [searchText, setSearchText] = useState("")
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    searchText: "",
    categories: [],
    privacy: [],
    memberRange: { min: 0, max: 10000 },
    features: [],
    sortBy: "popular",
    location: "",
  })

  // Update URL when search changes
  const handleSearchChange = (text: string) => {
    setSearchText(text)
    updateURLWithFilters({ ...filters, searchText: text })
  }

  // Update URL when filters change
  const updateURLWithFilters = (newFilters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Search text
    if (newFilters.searchText) {
      params.set("search", newFilters.searchText)
    } else {
      params.delete("search")
    }
    
    // Categories
    if (newFilters.categories.length > 0) {
      params.set("categories", newFilters.categories.join(","))
    } else {
      params.delete("categories")
    }
    
    // Privacy
    if (newFilters.privacy.length > 0) {
      params.set("privacy", newFilters.privacy.join(","))
    } else {
      params.delete("privacy")
    }
    
    // Member range
    if (newFilters.memberRange.min > 0 || newFilters.memberRange.max < 10000) {
      params.set("memberMin", newFilters.memberRange.min.toString())
      params.set("memberMax", newFilters.memberRange.max.toString())
    } else {
      params.delete("memberMin")
      params.delete("memberMax")
    }
    
    // Features
    if (newFilters.features.length > 0) {
      params.set("features", newFilters.features.join(","))
    } else {
      params.delete("features")
    }
    
    // Sort by
    if (newFilters.sortBy !== "popular") {
      params.set("sortBy", newFilters.sortBy)
    } else {
      params.delete("sortBy")
    }
    
    // Location
    if (newFilters.location) {
      params.set("location", newFilters.location)
    } else {
      params.delete("location")
    }
    
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false })
  }

  // Initialize filters from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || ""
    const categoriesFromUrl = searchParams.get("categories")?.split(",").filter(Boolean) || []
    const privacyFromUrl = searchParams.get("privacy")?.split(",").filter(Boolean) || []
    const memberMinFromUrl = parseInt(searchParams.get("memberMin") || "0")
    const memberMaxFromUrl = parseInt(searchParams.get("memberMax") || "10000")
    const featuresFromUrl = searchParams.get("features")?.split(",").filter(Boolean) || []
    const sortByFromUrl = (searchParams.get("sortBy") as "popular" | "newest" | "active") || "popular"
    const locationFromUrl = searchParams.get("location") || ""
    
    setSearchText(searchFromUrl)
    setFilters({
      searchText: searchFromUrl,
      categories: categoriesFromUrl,
      privacy: privacyFromUrl,
      memberRange: { min: memberMinFromUrl, max: memberMaxFromUrl },
      features: featuresFromUrl,
      sortBy: sortByFromUrl,
      location: locationFromUrl,
    })
  }, [searchParams])

  const filteredCommunities = useMemo(() => {
    let filtered = communities

    // Search filter
    if (filters.searchText) {
      filtered = filtered.filter(
        (community) =>
          community.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          community.description.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          community.category.toLowerCase().includes(filters.searchText.toLowerCase()),
      )
    }

    // Apply other filters...
    if (filters.categories.length > 0) {
      filtered = filtered.filter((community) => filters.categories.includes(community.category))
    }

    if (filters.privacy.length > 0) {
      filtered = filtered.filter((community) => filters.privacy.includes(community.privacy))
    }

    filtered = filtered.filter(
      (community) =>
        community.memberCount >= filters.memberRange.min && community.memberCount <= filters.memberRange.max,
    )

    if (filters.features.length > 0) {
      filtered = filtered.filter((community) =>
        filters.features.some((feature) => community.features.includes(feature)),
      )
    }

    if (filters.location) {
      filtered = filtered.filter((community) =>
        community.location?.toLowerCase().includes(filters.location.toLowerCase()),
      )
    }

    // Sort
    switch (filters.sortBy) {
      case "popular":
        filtered.sort((a, b) => b.memberCount - a.memberCount)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "active":
        filtered.sort((a, b) => b.postCount - a.postCount)
        break
    }

    return filtered
  }, [communities, filters])

  // Filter communities based on page type
  const getCommunitiesForPage = () => {
    switch (pageType) {
      case "discover":
        return filteredCommunities
      case "trending":
        return filteredCommunities.filter((c) => c.isTrending)
      case "featured":
        return filteredCommunities.filter((c) => c.isFeatured)
      case "my-communities":
        return filteredCommunities.filter((c) => c.isCreatedByMe)
      case "joined":
        return filteredCommunities.filter((c) => c.isJoined === true)
      case "saved":
        return filteredCommunities.filter((c) => (c as any).isSaved === true)
      default:
        return filteredCommunities
    }
  }

  const communitiesForPage = getCommunitiesForPage()

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.privacy.length > 0) count++
    if (filters.features.length > 0) count++
    if (filters.location) count++
    if (filters.memberRange.min > 0 || filters.memberRange.max < 10000) count++
    return count
  }

  const handleFilterRemove = (filterType: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (filterType === 'categories') {
        newFilters.categories = prev.categories.filter((item: string) => item !== value)
      } else if (filterType === 'privacy') {
        newFilters.privacy = prev.privacy.filter((item: string) => item !== value)
      } else if (filterType === 'features') {
        newFilters.features = prev.features.filter((item: string) => item !== value)
      }
      updateURLWithFilters(newFilters)
      return newFilters
    })
  }

  const clearFilters = () => {
    const clearedFilters = {
      searchText: "",
      categories: [],
      privacy: [],
      memberRange: { min: 0, max: 10000 },
      features: [],
      sortBy: "popular" as const,
      location: "",
    }
    setFilters(clearedFilters)
    setSearchText("")
    updateURLWithFilters(clearedFilters)
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    updateURLWithFilters(newFilters)
  }

  const getEmptyState = () => {
    switch (pageType) {
      case "my-communities":
        return (
          <EmptyState
            title="No communities created yet"
            description="Create your first community to get started"
            showCreateButton
          />
        )
      case "joined":
        return (
          <EmptyState
            title="No joined communities yet"
            description="Join some communities to see them here"
          />
        )
      case "saved":
        return (
          <EmptyState
            title="No saved communities yet"
            description="Save communities to easily find them later"
          />
        )
      default:
        return (
          <EmptyState
            title="No communities found"
            description="Try adjusting your filters or search terms"
          />
        )
    }
  }

  return (
    <div className="p-4 md:p-6">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search and Filter Bar */}
          <SearchAndFilterBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
            onFilterClick={() => setFilterModalOpen(true)}
            activeFiltersCount={getActiveFiltersCount()}
            filters={filters}
            onFilterRemove={handleFilterRemove}
            onClearAll={clearFilters}
          />
          
          <CommunityGrid 
            communities={communitiesForPage} 
            title=""
            emptyState={communitiesForPage.length === 0 ? getEmptyState() : undefined}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <CommunitiesSidebar 
            stats={{
              totalCommunities: communities.length,
              joinedCommunities: communities.filter(c => c.isJoined).length,
              createdCommunities: communities.filter(c => c.isCreatedByMe).length,
              totalMembers: communities.reduce((sum, c) => sum + c.memberCount, 0)
            }}
          />
        </div>
      </div>

      <CommunityFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultCount={communitiesForPage.length}
      />
    </div>
  )
}
