import { JobHeader } from "./job-header"
import { JobSearchAndFilters } from "./job-search-and-filters"

import { JobFilterState } from "./job-filter-modal"
import { ResponsiveTabs, TabItem } from "../ui/responsive-tabs"
import { Bookmark, CheckCircle, Search, Star, TrendingUp, User } from "lucide-react"

interface JobsPageHeaderProps {
  currentTab: string
  searchText: string
  onSearchChange: (text: string) => void
  filters: JobFilterState
  onFiltersChange: (filters: JobFilterState) => void
  resultCount: number
}
  const tabs: TabItem[] = [
  {
    value: "discover",
    label: "Discover",
    icon: Search,
    description: "Explore all available listings",
  },
  {
    value: "trending",
    label: "Trending",
    icon: TrendingUp,
    description: "Most popular and active listings",
  },
  {
    value: "featured",
    label: "Featured",
    icon: Star,
    description: "Hand-picked and highlighted opportunities",
  },
  {
    value: "my-listings",
    label: "My Listings",
    icon: User,
    description: "Listings you have posted",
  },
  {
    value: "applied",
    label: "Enquiry",
    icon: CheckCircle,
    description: "Listings you have applied for",
  },
  {
    value: "saved",
    label: "Saved",
    icon: Bookmark,
    description: "Your saved listings",
  },
];
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
            
          <ResponsiveTabs
                 tabs={tabs}
                 currentTab={"discover"}
                 baseUrl="/dashboard/listings"
               />
    </>
  )
}
