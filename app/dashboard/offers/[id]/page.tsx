import OfferDetailPage from "@/components/offers/offer-detail-page"
import { allOffers } from "@/components/offers/offers-list"
import { notFound } from "next/navigation"

interface OfferPageProps {
  params: {
    id: string
  }
}

export default function OfferPage({ params }: OfferPageProps) {
  const offerId = Number.parseInt(params.id)
  const offer = allOffers.find((o) => o.id === offerId)

  if (!offer) {
    notFound()
  }

  // Filter similar offers (excluding the current offer)
  const similarOffers = allOffers.filter((o) => o.id !== offerId && o.category === offer.category).slice(0, 3) // Get up to 3 similar offers

  return <OfferDetailPage offer={offer} similarOffers={similarOffers} />
}
