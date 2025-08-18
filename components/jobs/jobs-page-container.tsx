"use client"

import { useState } from "react"
import { JobsPageHeader } from "./jobs-page-header"
import { JobsLayout } from "./jobs-layout"
import { JobFilterState } from "./job-filter-modal"

interface JobsPageContainerProps {
  currentTab: string
}

export function JobsPageContainer({ currentTab }: JobsPageContainerProps) {
  const [searchText, setSearchText] = useState("")
  const [filters, setFilters] = useState<JobFilterState>({
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

  const handleSearchChange = (text: string) => {
    setSearchText(text)
    setFilters(prev => ({ ...prev, searchText: text }))
  }

  const handleFiltersChange = (newFilters: JobFilterState) => {
    setFilters(newFilters)
    setSearchText(newFilters.searchText)
  }

  // Mock result count - in a real app, this would come from your data/API
  const resultCount = 42

  return (
    <div className="p-4 md:p-6">
      <JobsPageHeader
        currentTab={currentTab}
        searchText={searchText}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultCount={resultCount}
      />
      <JobsLayout currentTab={currentTab} filters={filters} />
    </div>
  )
}
