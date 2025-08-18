import { JobsMainContent } from "./jobs-main-content"
import { JobSidebar } from "./job-sidebar"
import { JobFilterState } from "./job-filter-modal"

interface JobsLayoutProps {
  currentTab: string
  filters: JobFilterState
}

export function JobsLayout({ currentTab, filters }: JobsLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <JobsMainContent currentTab={currentTab} filters={filters} />
      <JobSidebar />
    </div>
  )
}
