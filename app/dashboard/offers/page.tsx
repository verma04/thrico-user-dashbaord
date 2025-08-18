"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { OfferHeader } from "@/components/offers/offer-header"
import { OfferSearchAndFilters } from "@/components/offers/offer-search-and-filters"
import { OfferSidebar } from "@/components/offers/offer-sidebar"
import { OfferTabs } from "@/components/offers/offer-tabs"
import { OffersList, allOffers, Offer, OfferFilterState } from "@/components/offers/offers-list"
import { OfferFilterModal } from "@/components/offers/offer-filter-modal"

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default function OffersPage({ searchParams }: PageProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [resolvedSearchParams, setResolvedSearchParams] = useState<{ tab?: string }>({})
  const [searchText, setSearchText] = useState("")
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState<OfferFilterState>({
    searchText: "",
    categories: [],
    conditions: [],
    priceRange: { min: 0, max: 10000 },
    offerTypes: [],
    sortBy: "newest",
    location: "",
  })

  // Resolve search params
  useEffect(() => {
    const resolveParams = async () => {
      const params = await searchParams
      setResolvedSearchParams(params)
    }
    resolveParams()
  }, [searchParams])

  const { tab = "discover" } = resolvedSearchParams

  // Update URL when search changes
  const handleSearchChange = (text: string) => {
    setSearchText(text)
    const params = new URLSearchParams(urlSearchParams.toString())
    if (text) {
      params.set("search", text)
    } else {
      params.delete("search")
    }
    router.push(`/dashboard/offers?${params.toString()}`, { scroll: false })
  }

  // Initialize search from URL params
  useEffect(() => {
    const searchFromUrl = urlSearchParams.get("search")
    if (searchFromUrl) {
      setSearchText(searchFromUrl)
    }
  }, [urlSearchParams])

  // Calculate filtered results count for the modal
  const getFilteredResultsCount = useMemo(() => {
    let offers = [...allOffers]

    // Apply search filter
    if (searchText) {
      offers = offers.filter(offer =>
        offer.title.toLowerCase().includes(searchText.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchText.toLowerCase()) ||
        offer.category.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    // Apply additional filters
    if (filters.categories.length > 0) {
      offers = offers.filter(offer => filters.categories.includes(offer.category))
    }

    if (filters.conditions.length > 0) {
      offers = offers.filter(offer => filters.conditions.includes(offer.condition))
    }

    if (filters.location) {
      offers = offers.filter(offer =>
        offer.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Price range filter
    const priceMin = filters.priceRange.min
    const priceMax = filters.priceRange.max
    if (priceMin > 0 || priceMax < 10000) {
      offers = offers.filter(offer => {
        const priceStr = offer.price.replace(/[$,]/g, '')
        const price = parseFloat(priceStr) || 0
        return price >= priceMin && price <= priceMax
      })
    }

    return offers.length
  }, [searchText, filters])

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.conditions.length > 0) count++
    if (filters.offerTypes.length > 0) count++
    if (filters.location) count++
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) count++
    return count
  }

  const handleFilterRemove = (filterType: string, value: string) => {
    setFilters((prev) => {
      if (filterType === 'categories' || filterType === 'conditions' || filterType === 'offerTypes') {
        return {
          ...prev,
          [filterType]: (prev[filterType as keyof OfferFilterState] as string[]).filter((item: string) => item !== value),
        }
      }
      if (filterType === 'location') {
        return {
          ...prev,
          location: "",
        }
      }
      return prev
    })
  }

  const clearFilters = () => {
    setFilters({
      searchText: "",
      categories: [],
      conditions: [],
      priceRange: { min: 0, max: 10000 },
      offerTypes: [],
      sortBy: "newest",
      location: "",
    })
    setSearchText("")
    const params = new URLSearchParams(urlSearchParams.toString())
    params.delete("search")
    router.push(`/dashboard/offers?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="p-4 md:p-6">
      <OfferHeader />
      <OfferSearchAndFilters
        searchText={searchText}
        onSearchChange={handleSearchChange}
        onFilterClick={() => setFilterModalOpen(true)}
        activeFiltersCount={getActiveFiltersCount()}
        filters={filters}
        onFilterRemove={handleFilterRemove}
        onClearAll={clearFilters}
      />
      <OfferTabs currentTab={tab} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <OffersList 
            currentTab={tab} 
            searchText={searchText}
            filters={filters}
          />
        </div>
        <OfferSidebar />
      </div>

      <OfferFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={getFilteredResultsCount}
      />
    </div>
  )
}
