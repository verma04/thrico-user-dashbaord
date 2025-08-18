import { DiscussionStats } from "./discussion-stats"
import { PopularCategories } from "./popular-categories"
import { TopContributors } from "./top-contributors"
import { QuickActions } from "./quick-actions"

export function DiscussionsSidebar() {
  return (
    <div className="space-y-6">
      <DiscussionStats />
      <PopularCategories />
      <TopContributors />
      <QuickActions />
    </div>
  )
}
