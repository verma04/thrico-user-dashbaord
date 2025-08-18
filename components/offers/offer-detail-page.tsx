"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Tag, DollarSign, Clock, Share2, Bookmark, ChevronLeft, Package } from "lucide-react"
import type { Offer } from "./offers-list"
import { OfferCard } from "./offer-card"
import { MakeOfferModal } from "./make-offer-modal"
import Link from "next/link"

interface OfferDetailPageProps {
  offer: Offer
  similarOffers: Offer[]
}

const OfferDetailPage = ({ offer, similarOffers }: OfferDetailPageProps) => {
  const [isMakeOfferModalOpen, setIsMakeOfferModalOpen] = useState(false)
  const [isOfferSaved, setIsOfferSaved] = useState(offer.isSaved || false)

  const handleSaveToggle = () => {
    setIsOfferSaved((prev) => !prev)
    // In a real application, you would send an API request here to update the saved status
    console.log(`Offer ${offer.id} ${isOfferSaved ? "unsaved" : "saved"}`)
  }

  return (
    <>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/offers" className="flex items-center text-blue-600 hover:underline mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Offers
          </Link>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 rounded-lg">
                    <AvatarImage
                      src={offer.sellerLogo || "/placeholder.svg"}
                      alt={offer.seller}
                      className="object-contain"
                    />
                    <AvatarFallback className="rounded-lg text-lg">
                      {offer.seller
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg text-gray-600">{offer.seller}</p>
                    <h1 className="font-bold text-2xl sm:text-3xl">{offer.title}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {offer.condition}
                      </Badge>
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {offer.price}
                      </Badge>
                      {offer.deliveryOptions.length > 0 && (
                        <Badge variant="outline" className="text-sm px-3 py-1">
                          <Package className="w-4 h-4 mr-1" />
                          {offer.deliveryOptions.join(", ")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button className="w-full sm:w-auto" onClick={() => setIsMakeOfferModalOpen(true)}>
                    Make Offer
                  </Button>
                  <Button
                    variant={isOfferSaved ? "default" : "outline"}
                    className={`w-full sm:w-auto ${isOfferSaved ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-transparent"}`}
                    onClick={handleSaveToggle}
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    {isOfferSaved ? "Saved" : "Save Offer"}
                  </Button>
                  <Button variant="ghost" size="icon" className="w-10 h-10 sm:w-auto sm:px-3 sm:py-1 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    <span className="sr-only sm:not-sr-only sm:ml-2">Share</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mt-6 border-t pt-4">
                <div className="flex items-center text-base">
                  <Tag className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{offer.category}</span>
                </div>
                <div className="flex items-center text-base">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{offer.location}</span>
                </div>
                <div className="flex items-center text-base">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Posted {offer.postedAgo}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Offer Description</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                {offer.description}
              </CardContent>
            </Card>

            {offer.photos && offer.photos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Photos</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {offer.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo || "/placeholder.svg"}
                      alt={`Offer photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            {offer.deliveryOptions && offer.deliveryOptions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Delivery Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {offer.deliveryOptions.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">About {offer.seller}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-base">
                  {offer.seller} is a trusted seller in the {offer.category} category, known for quality items and
                  excellent service.
                </p>
                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>

            {similarOffers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Similar Offers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {similarOffers.map((similarOffer) => (
                    <OfferCard key={similarOffer.id} offer={similarOffer} />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <MakeOfferModal
        isOpen={isMakeOfferModalOpen}
        onClose={() => setIsMakeOfferModalOpen(false)}
        offerTitle={offer.title}
        sellerName={offer.seller}
      />
    </>
  )
}

export default OfferDetailPage
