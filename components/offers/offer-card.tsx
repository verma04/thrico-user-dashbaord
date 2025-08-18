"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Tag, Clock, Star, TrendingUp, MoreVertical, Bookmark, Share2, Package } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import { MakeOfferModal } from "./make-offer-modal"

interface Offer {
  id: number
  title: string
  seller: string
  sellerLogo: string
  location: string
  category: string
  price: string
  condition: "New" | "Used - Like New" | "Used - Good" | "Used - Fair"
  description: string
  postedAgo: string
  isFeatured?: boolean
  isTrending?: boolean
  isSaved?: boolean
  deliveryOptions: string[]
  photos?: string[]
}

interface OfferCardProps {
  offer: Offer
}

export function OfferCard({ offer }: OfferCardProps) {
  const [isMakeOfferModalOpen, setIsMakeOfferModalOpen] = useState(false)
  const [isOfferSaved, setIsOfferSaved] = useState(offer.isSaved || false)

  const handleSaveToggle = () => {
    setIsOfferSaved((prev) => !prev)
    // In a real application, you would send an API request here to update the saved status
    console.log(`Offer ${offer.id} ${isOfferSaved ? "unsaved" : "saved"}`)
  }

  return (
    <>
      <Card className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        {/* Offer Image (if available) */}
        {offer.photos && offer.photos.length > 0 && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={offer.photos[0] || "/placeholder.svg?height=200&width=300&query=offer item"}
              alt={offer.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Badges for Featured/Trending */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {offer.isFeatured && (
                <Badge className="bg-yellow-500 text-white px-2 py-1 text-xs font-semibold">
                  <Star className="w-3 h-3 mr-1" /> Featured
                </Badge>
              )}
              {offer.isTrending && (
                <Badge className="bg-blue-500 text-white px-2 py-1 text-xs font-semibold">
                  <TrendingUp className="w-3 h-3 mr-1" /> Trending
                </Badge>
              )}
            </div>
            {/* Save Button on Image */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 rounded-full w-8 h-8 bg-white/80 hover:bg-white ${isOfferSaved ? "text-blue-600" : "text-gray-500"}`}
              onClick={handleSaveToggle}
              aria-label={isOfferSaved ? "Unsave Offer" : "Save Offer"}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </Button>
          </div>
        )}

        <CardContent className="p-4 flex-grow flex flex-col">
          {/* Seller Info and Dropdown */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={offer.sellerLogo || "/placeholder.svg?height=32&width=32&query=seller logo"}
                  alt={offer.seller}
                />
                <AvatarFallback className="text-xs">
                  {offer.seller
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">{offer.seller}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-gray-500 hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Offer
                </DropdownMenuItem>
                {/* Add more actions like Report, Hide, etc. */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Offer Title and Price */}
          <Link href={`/dashboard/offers/${offer.id}`} className="block hover:text-blue-600 transition-colors">
            <h3 className="font-bold text-lg sm:text-xl leading-tight mb-2 line-clamp-2">{offer.title}</h3>
          </Link>
          <p className="text-2xl font-extrabold text-gray-900 mb-4">{offer.price}</p>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 flex-grow">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-gray-500" />
              <span>{offer.category}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span>{offer.location}</span>
            </div>
            <div className="flex items-center">
              <Package className="w-4 h-4 mr-2 text-gray-500" />
              <span>{offer.deliveryOptions.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>{offer.postedAgo}</span>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button className="flex-1" onClick={() => setIsMakeOfferModalOpen(true)}>
              Make Offer
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <Link href={`/dashboard/offers/${offer.id}`}>View Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <MakeOfferModal
        isOpen={isMakeOfferModalOpen}
        onClose={() => setIsMakeOfferModalOpen(false)}
        offerTitle={offer.title}
        sellerName={offer.seller}
      />
    </>
  )
}
