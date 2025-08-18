import { JobsList } from "./jobs-list"
import { JobFilterState } from "./job-filter-modal"

interface JobsMainContentProps {
  currentTab: string
  filters: JobFilterState
}

export function JobsMainContent({ currentTab, filters }: JobsMainContentProps) {
  return (
    <div className="lg:col-span-3 space-y-4">
      <JobsList currentTab={currentTab} filters={filters} />
    </div>
  )
}
