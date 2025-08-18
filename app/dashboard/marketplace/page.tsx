
import { MarketplacePageClient } from "@/components/listing/marketplace-page-client"

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function ListingPage({ searchParams }: PageProps) {
  const { tab = "discover" } = await searchParams

  return <MarketplacePageClient currentTab={tab} />
}
