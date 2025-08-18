

import { JobsPageContainer } from "@/components/jobs/jobs-page-container"

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function JobsPage({ searchParams }: PageProps) {
  const { tab = "discover" } = await searchParams

  return <JobsPageContainer currentTab={tab} />
}
