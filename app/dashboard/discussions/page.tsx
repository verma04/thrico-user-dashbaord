import { DiscussionHeader } from "@/components/discussion-forum/discussion-header"
import { DiscussionTabs } from "@/components/discussion-forum/discussion-tabs"
import { DiscussionsList } from "@/components/discussion-forum/discussions-list"
import { DiscussionsSidebar } from "@/components/discussion-forum/discussions-sidebar"
import { PinnedDiscussions } from "@/components/discussion-forum/pinned-discussions"
import { SearchAndFilters } from "@/components/discussion-forum/search-and-filters"



interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function DiscussionsPage({ searchParams }: PageProps) {
  const { tab = "trending" } = await searchParams

  return (
    <div className="p-4 md:p-6">

      {/* Adjusted padding for smaller screens */}
      <DiscussionHeader />
      <SearchAndFilters />
      <DiscussionTabs currentTab={tab} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  
        {/* Changed to 1 column on small, 4 on large */}
        <div className="lg:col-span-3 space-y-4">
          {tab !== "my" && <PinnedDiscussions />}
          <DiscussionsList currentTab={tab} />
        </div>
        <DiscussionsSidebar />
      </div>
    </div>
  )
}
