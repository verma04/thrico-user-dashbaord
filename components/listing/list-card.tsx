"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Star, TrendingUp, MoreVertical, Bookmark, Share2, MessageCircle, Eye } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ContactSellerModal } from "./contact-seller-modal"
import { Listing } from "../grapqhl/action/listing"
import moment from "moment"
import UserAvatar from "../user-avatar"
import { getCurrencySymbol } from "@/utils/currencySymbol"

// Helper for badge color
function getConditionColor(condition: string) {
  switch (condition?.toLowerCase()) {
    case "new":
      return "bg-green-100 text-green-800"
    case "used":
      return "bg-yellow-100 text-yellow-800"
    case "refurbished":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

interface MarketplaceCardProps {
  item: Listing
}

export function MarketplaceCard({ item }: MarketplaceCardProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isItemSaved, setIsItemSaved] = useState(item.isSaved || false)

  const handleSaveToggle = () => {
    setIsItemSaved((prev) => !prev)
    console.log(`Item ${item.id} ${isItemSaved ? "unsaved" : "saved"}`)
  }

  const currencySymbol = getCurrencySymbol(item.details.currency);

  return (
    <>
      <Link href={`/marketplace/items/${item.id}`} passHref>
      
        <Card className="w-80 max-w-sm rounded-xl overflow-hidden shadow-lg">
          <CardHeader className="p-0 relative h-40">
            <Image
              src={`https://cdn.thrico.network/${item.details.media[0]}` || "/placeholder.svg?height=200&width=300&text=No+Image"}
              alt={item.details.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
              quality={100}
            />
            <div className="absolute top-3 right-3 flex items-center space-x-2">
              <Button 
                variant="secondary" 
                size="icon" 
                className={`rounded-full backdrop-blur-sm ${
                  isItemSaved 
                    ? "bg-blue-500/90 hover:bg-blue-600/90" 
                    : "bg-white/80 hover:bg-white/90"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleSaveToggle()
                }}
              >
                <Bookmark className={`w-4 h-4 ${isItemSaved ? "text-white fill-white" : "text-gray-700"}`} />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                <Star className="w-4 h-4 text-gray-700" />
              </Button>
              {item.details.isTrending && (
                <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                    <MoreVertical className="w-4 h-4 text-gray-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Item
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    Report Listing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Price Badge */}
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-white/90 text-gray-900 text-lg font-bold px-3 py-1">
                {currencySymbol}{item.details.price}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pb-0 space-y-2">
            <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">{item.details.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.details.description}</p>
            {/* Condition and Category */}
            <div className="flex flex-wrap gap-2">
              <Badge className={`text-xs px-2 py-1 ${getConditionColor(item.details.condition)}`}>
                {item.details.condition}
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-1">
                {item.details.category}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <UserAvatar src={item.user?.avatar}  size={20} />

                <p className="text-xs text-gray-700">
                  Sold by <span className="text-blue-600 font-medium">{item.user?.firstName} {item.user?.lastName}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="text-xs text-gray-700">{item.details.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-xs text-gray-700">Posted { moment(item?.details?.createdAt).fromNow() }</p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-row items-start sm:items-center gap-2 mt-4">
              <Button variant="outline">
                View details
              </Button>
              <Button 
                onClick={(e) => {
                  e.preventDefault()
                  setIsContactModalOpen(true)
                }}
              >
                Contact Seller
              </Button>
            </div>
          </CardContent>
          <CardFooter className="p-0 border-t">
            <div className="flex-1 flex items-center justify-center py-1 space-x-1">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-800">{item.views || 0}</span>
            </div>
            <div className="flex-1 flex items-center justify-center py-1 space-x-1">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-800">{item.messagesCount || 0}</span>
            </div>
            <div className="flex-1 flex items-center justify-center py-1 space-x-1">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-800">{item.rating || "5.0"}</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
      <ContactSellerModal
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        itemTitle={"ds"}
        sellerName={"dssd"}
      />
    </>
  )
}
