


"use client"

import { MarketplaceCard } from "./list-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, Star, Bookmark, Eye, MessageCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

export interface MarketplaceItem {
  id: number
  title: string
  price: string
  currency: string
  seller: string
  sellerAvatar: string
  location: string
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor"
  category: string
  description: string
  postedAgo: string
  images: string[]
  isFeatured?: boolean
  isTrending?: boolean
  isSaved?: boolean
  isMyListing?: boolean
  views?: number
  activityScore?: number
  createdAt?: string
  specifications?: string[]
  features?: string[]
  tags?: string[]
}

interface MarketplaceListProps {
  currentTab: string
  viewMode?: "card" | "list" // Add viewMode prop
}

export const allItems: MarketplaceItem[] = [
  {
    id: 1,
    title: "Realme Narzo N63 (8GB RAM) - 2 yrs old",
    price: "10,999",
    currency: "₹",
    seller: "Mohan",
    sellerAvatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Join%20Community%20-%20Fav%20%26%20Tre%20%20card%20%284%29-hsb66xnuZXEY7CQFWZaWcCMXpn2uT3.png",
    location: "Hyderabad, Telangana, India",
    condition: "Good",
    category: "Electronics",
    description: "Excellent condition Realme Narzo N63 with 8GB RAM. Well maintained, no scratches on screen. Original charger and box included. Battery health is good. Selling due to upgrade.",
    postedAgo: "23 hours ago",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Join%20Community%20-%20Fav%20%26%20Tre%20%20card%20%284%29-hsb66xnuZXEY7CQFWZaWcCMXpn2uT3.png"],
    isTrending: true,
    isSaved: true,
    activityScore: 120,
    createdAt: "2025-08-06T12:00:00Z",
    specifications: [
      "8GB RAM, 128GB Storage",
      "6.72-inch Display",
      "50MP Main Camera",
      "5000mAh Battery",
      "Android 13"
    ],
    features: [
      "Fingerprint Scanner",
      "Face Unlock",
      "Fast Charging",
      "Dual SIM Support"
    ],
    tags: ["smartphone", "realme", "android"]
  },
  {
    id: 2,
    title: "MacBook Air M2 (2022) - 16GB/512GB",
    price: "95,000",
    currency: "₹",
    seller: "Priya Sharma",
    sellerAvatar: "/placeholder.svg?height=40&width=40&text=PS",
    location: "Mumbai, Maharashtra, India",
    condition: "Like New",
    category: "Electronics",
    description: "Barely used MacBook Air M2 with 16GB RAM and 512GB SSD. Purchased 6 months ago, used only for light work. Comes with original packaging, charger, and documentation. No dents or scratches.",
    postedAgo: "2 days ago",
    images: ["/placeholder.svg?height=300&width=400&text=MacBook"],
    isFeatured: true,
    isTrending: true,
    activityScore: 180,
    createdAt: "2025-08-04T10:00:00Z",
    specifications: [
      "Apple M2 Chip",
      "16GB Unified Memory",
      "512GB SSD Storage",
      "13.6-inch Liquid Retina Display",
      "macOS Ventura"
    ],
    features: [
      "Touch ID",
      "MagSafe 3 Charging",
      "Two Thunderbolt Ports",
      "1080p FaceTime HD Camera"
    ],
    tags: ["laptop", "apple", "macbook", "m2"]
  },
  {
    id: 3,
    title: "Royal Enfield Classic 350 - 2021 Model",
    price: "1,45,000",
    currency: "₹",
    seller: "Rajesh Kumar",
    sellerAvatar: "/placeholder.svg?height=40&width=40&text=RK",
    location: "Bangalore, Karnataka, India",
    condition: "Good",
    category: "Vehicles",
    description: "Well-maintained Royal Enfield Classic 350 in excellent running condition. Regular servicing done. New tires fitted recently. All documents clear. Single owner vehicle.",
    postedAgo: "5 days ago",
    images: ["/placeholder.svg?height=300&width=400&text=Royal+Enfield"],
    isSaved: true,
    activityScore: 90,
    createdAt: "2025-08-01T14:30:00Z",
    specifications: [
      "349cc Single Cylinder Engine",
      "20.2 HP Power",
      "27 Nm Torque",
      "5-Speed Gearbox",
      "15,000 km driven"
    ],
    features: [
      "Electric Start",
      "Dual Channel ABS",
      "LED Headlight",
      "Digital-Analog Instrument Cluster"
    ],
    tags: ["motorcycle", "royal-enfield", "classic-350"]
  },
  {
    id: 4,
    title: "Wooden Dining Table Set (6 Seater)",
    price: "25,000",
    currency: "₹",
    seller: "Meera Patel",
    sellerAvatar: "/placeholder.svg?height=40&width=40&text=MP",
    location: "Ahmedabad, Gujarat, India",
    condition: "Good",
    category: "Furniture",
    description: "Beautiful solid wood dining table with 6 matching chairs. Perfect for family dining. Minor wear and tear but structurally sound. Moving sale - need to sell urgently.",
    postedAgo: "1 week ago",
    images: ["/placeholder.svg?height=300&width=400&text=Dining+Table"],
    isMyListing: true,
    activityScore: 45,
    createdAt: "2025-07-30T09:00:00Z",
    specifications: [
      "Solid Sheesham Wood",
      "6 Seater Capacity",
      "Table: 6ft x 3ft",
      "Chair Height: 18 inches",
      "2 years old"
    ],
    features: [
      "Scratch Resistant Finish",
      "Easy to Clean",
      "Comfortable Cushioned Seats",
      "Sturdy Construction"
    ],
    tags: ["furniture", "dining-table", "wood", "6-seater"]
  },
  {
    id: 5,
    title: "Canon EOS 1500D DSLR Camera Kit",
    price: "32,000",
    currency: "₹",
    seller: "Arjun Singh",
    sellerAvatar: "/placeholder.svg?height=40&width=40&text=AS",
    location: "Delhi, India",
    condition: "Like New",
    category: "Electronics",
    description: "Canon EOS 1500D with 18-55mm lens kit. Barely used, purchased for hobby photography but didn't get time to use. Comes with camera bag, memory card, and all accessories.",
    postedAgo: "3 days ago",
    images: ["/placeholder.svg?height=300&width=400&text=Canon+DSLR"],
    activityScore: 110,
    createdAt: "2025-08-03T16:00:00Z",
    specifications: [
      "24.1 MP APS-C CMOS Sensor",
      "DIGIC 4+ Image Processor",
      "3.0-inch LCD Screen",
      "Full HD Video Recording",
      "Built-in Wi-Fi"
    ],
    features: [
      "Scene Intelligent Auto Mode",
      "Creative Auto Mode",
      "Feature Assistant",
      "Creative Filters"
    ],
    tags: ["camera", "dslr", "canon", "photography"]
  },
  {
    id: 6,
    title: "Gaming Chair - Ergonomic Design",
    price: "8,500",
    currency: "₹",
    seller: "Vikash Gupta",
    sellerAvatar: "/placeholder.svg?height=40&width=40&text=VG",
    location: "Pune, Maharashtra, India",
    condition: "Good",
    category: "Furniture",
    description: "Comfortable gaming chair with lumbar support and adjustable height. Perfect for long gaming sessions or office work. Some minor wear on armrests but fully functional.",
    postedAgo: "4 days ago",
    images: ["/placeholder.svg?height=300&width=400&text=Gaming+Chair"],
    activityScore: 65,
    createdAt: "2025-08-02T11:00:00Z",
    specifications: [
      "PU Leather Material",
      "360° Swivel Base",
      "Height Adjustable",
      "Weight Capacity: 120kg",
      "Lumbar Support"
    ],
    features: [
      "Reclining Backrest",
      "Padded Armrests",
      "Smooth Rolling Casters",
      "Ergonomic Design"
    ],
    tags: ["gaming-chair", "office-chair", "ergonomic"]
  },
  // 100 more dummy items for testing
  ...Array.from({ length: 100 }).map((_, i) => ({
    id: 7 + i,
    title: `Sample Listing #${7 + i}`,
    price: `${(1000 + (i * 100)).toLocaleString()}`,
    currency: "₹",
    seller: `Seller ${7 + i}`,
    sellerAvatar: `/placeholder.svg?height=40&width=40&text=S${7 + i}`,
    location: `City ${((i % 10) + 1)}, India`,
    condition: ["New", "Like New", "Good", "Fair", "Poor"][i % 5] as MarketplaceItem["condition"],
    category: ["Electronics", "Furniture", "Vehicles", "Books", "Fashion"][i % 5],
    description: `This is a sample description for listing #${7 + i}. Great value and quality!`,
    postedAgo: `${(i % 10) + 1} days ago`,
    images: [`/placeholder.svg?height=300&width=400&text=Item+${7 + i}`],
    isFeatured: i % 10 === 0,
    isTrending: i % 7 === 0,
    isSaved: i % 8 === 0,
    isMyListing: i % 9 === 0,
    views: 100 + i * 3,
    activityScore: 50 + (i * 2),
    createdAt: `2025-07-${(i % 28) + 1}T12:00:00Z`,
    specifications: [
      `Spec A${i + 1}`,
      `Spec B${i + 1}`,
      `Spec C${i + 1}`
    ],
    features: [
      `Feature X${i + 1}`,
      `Feature Y${i + 1}`
    ],
    tags: [`tag${i + 1}`, `sample`, `listing`]
  }))
]

// List Item Component for list view
function MarketplaceListItem({ item }: { item: MarketplaceItem }) {
  const [isItemSaved, setIsItemSaved] = useState(item.isSaved || false)

  const handleSaveToggle = () => {
    setIsItemSaved((prev) => !prev)
    console.log(`Item ${item.id} ${isItemSaved ? "unsaved" : "saved"}`)
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "New":
        return "bg-green-100 text-green-800"
      case "Like New":
        return "bg-blue-100 text-blue-800"
      case "Good":
        return "bg-yellow-100 text-yellow-800"
      case "Fair":
        return "bg-orange-100 text-orange-800"
      case "Poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Link href={`/marketplace/items/${item.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          {/* Image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={item.images[0] || "/placeholder.svg?height=96&width=96&text=No+Image"}
              alt={item.title}
              fill
              className="rounded-lg object-cover"
            />
            {/* Price Badge */}
            <div className="absolute -top-2 -right-2">
              <Badge className="bg-blue-500 text-white text-xs font-bold px-2 py-1">
                {item.currency}{item.price}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">{item.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                className={`flex-shrink-0 ${isItemSaved ? "text-blue-500" : "text-gray-400"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleSaveToggle()
                }}
              >
                <Bookmark className={`w-4 h-4 ${isItemSaved ? "fill-current" : ""}`} />
              </Button>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
            
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              <Badge className={`text-xs ${getConditionColor(item.condition)}`}>
                {item.condition}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
            </div>

            {/* Seller Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={item.sellerAvatar || "/placeholder.svg"} alt={item.seller} />
                  <AvatarFallback>
                    {item.seller
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600">{item.seller}</span>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{item.views || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>0</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>5.0</span>
                </div>
              </div>
            </div>

            {/* Location and Time */}
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.postedAgo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function MarketplaceList({ currentTab, viewMode = "card" }: MarketplaceListProps) {
  const [displayedItems, setDisplayedItems] = useState<MarketplaceItem[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const itemsPerPage = 6

  const getFilteredItems = () => {
    switch (currentTab) {
      case "discover":
        return allItems // All items by default
      case "trending":
        return [...allItems].sort((a, b) => (b.activityScore || 0) - (a.activityScore || 0))
      case "featured":
        return allItems.filter((item) => item.isFeatured)
      case "my-listings":
        return allItems.filter((item) => item.isMyListing)
      case "saved":
        return allItems.filter((item) => item.isSaved)
      default:
        return allItems
    }
  }

  const filteredItems = getFilteredItems()

  // Initialize displayed items when tab changes
  useEffect(() => {
    const initialItems = filteredItems.slice(0, itemsPerPage)
    setDisplayedItems(initialItems)
    setPage(1)
    setHasMore(filteredItems.length > itemsPerPage)
  }, [currentTab])

  // Load more items function
  const loadMoreItems = useCallback(() => {
    if (loading || !hasMore) return

    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const nextPage = page + 1
      const startIndex = page * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newItems = filteredItems.slice(startIndex, endIndex)
      
      if (newItems.length > 0) {
        setDisplayedItems(prev => [...prev, ...newItems])
        setPage(nextPage)
        setHasMore(endIndex < filteredItems.length)
      } else {
        setHasMore(false)
      }
      
      setLoading(false)
    }, 800) // Simulate loading delay
  }, [page, loading, hasMore, filteredItems])

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const clientHeight = document.documentElement.clientHeight || window.innerHeight
      
      // Trigger load when user is 200px from bottom
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMoreItems()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreItems])

  const getEmptyStateMessage = () => {
    switch (currentTab) {
      case "trending":
        return {
          title: "No trending items right now",
          description: "Check back later for popular marketplace listings!"
        }
      case "featured":
        return {
          title: "No featured items available",
          description: "Stay tuned for exciting featured products!"
        }
      case "my-listings":
        return {
          title: "You haven't listed any items yet",
          description: "Start by posting your first item for sale!"
        }
      case "saved":
        return {
          title: "No saved items found",
          description: "Save items you're interested in to view them here!"
        }
      default:
        return {
          title: "No items found",
          description: "Try adjusting your filters or search terms."
        }
    }
  }

  if (displayedItems.length === 0 && !loading) {
    const emptyState = getEmptyStateMessage()
    return (
      <div className="text-center py-8 md:py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            {emptyState.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            {emptyState.description}
          </p>
          {currentTab === "my-listings" && (
            <Button className="w-full sm:w-auto">List an Item</Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedItems.map((item) => (
            <MarketplaceCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedItems.map((item) => (
            <MarketplaceListItem key={item.id} item={item} />
          ))}
        </div>
      )}
      
      {/* Loading indicator */}
      {loading && (
        <div className="text-center mt-8 py-4">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm">Loading more items...</span>
          </div>
        </div>
      )}
      
      {/* Load more button (fallback for users who prefer clicking) */}
      {!loading && hasMore && (
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto bg-transparent"
            onClick={loadMoreItems}
          >
            Load More Items
          </Button>
        </div>
      )}
      
      {/* End of results indicator */}
      {!loading && !hasMore && displayedItems.length > 0 && (
        <div className="text-center mt-8 py-4">
          <p className="text-sm text-gray-500">You've reached the end of the listings</p>
        </div>
      )}
    </>
  )
}
