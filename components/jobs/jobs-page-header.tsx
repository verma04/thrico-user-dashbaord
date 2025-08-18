import { JobHeader } from "./job-header"
import { JobSearchAndFilters } from "./job-search-and-filters"
import { JobTabs } from "./job-tabs"
import { JobFilterState } from "./job-filter-modal"

interface JobsPageHeaderProps {
  currentTab: string
  searchText: string
  onSearchChange: (text: string) => void
  filters: JobFilterState
  onFiltersChange: (filters: JobFilterState) => void
  resultCount: number
}

export function JobsPageHeader({ 
  currentTab, 
  searchText, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  resultCount 
}: JobsPageHeaderProps) {
  return (
    <>
      <JobHeader />
      <JobSearchAndFilters 
        searchText={searchText}
        onSearchChange={onSearchChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
        resultCount={resultCount}
      />
      <JobTabs currentTab={currentTab} />
    </>
  )
}
