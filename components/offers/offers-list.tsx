"use client"

import { OfferCard } from "./offer-card"
import { Button } from "@/components/ui/button"

export interface Offer {
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
  isMyOffer?: boolean
  isMadeOffer?: boolean
  deliveryOptions: string[]
  activityScore?: number
  createdAt?: string
  photos?: string[]
}

export interface OfferFilterState {
  searchText: string
  categories: string[]
  conditions: string[]
  priceRange: { min: number; max: number }
  offerTypes: string[]
  sortBy: "newest" | "price_low" | "price_high" | "popular"
  location: string
}

interface OffersListProps {
  currentTab: string
  searchText?: string
  filters?: OfferFilterState
}

export const allOffers: Offer[] = [
  {
    id: 1,
    title: "Vintage Camera (Canon AE-1)",
    seller: "Retro Gear Shop",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=RG",
    location: "Los Angeles, CA",
    category: "Electronics",
    price: "$250",
    condition: "Used - Like New",
    description:
      "A classic Canon AE-1 film camera in excellent condition. Fully functional with a 50mm f/1.8 lens. Perfect for photography enthusiasts.",
    postedAgo: "2 hours ago",
    isTrending: true,
    isSaved: true,
    deliveryOptions: ["Local Pickup", "Shipping"],
    activityScore: 180,
    createdAt: "2025-08-05T14:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 2,
    title: "Handmade Ceramic Mug Set",
    seller: "Artisan Crafts",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=AC",
    location: "Portland, OR",
    category: "Home Goods",
    price: "$45",
    condition: "New",
    description:
      "Set of 4 unique handmade ceramic mugs, perfect for coffee or tea. Dishwasher and microwave safe. Each mug is slightly different, adding to its charm.",
    postedAgo: "1 day ago",
    isFeatured: true,
    deliveryOptions: ["Shipping"],
    activityScore: 90,
    createdAt: "2025-08-04T10:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 3,
    title: "Mountain Bike (Trek Marlin 5)",
    seller: "Bike Enthusiast",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=BE",
    location: "Denver, CO",
    category: "Vehicles",
    price: "$500",
    condition: "Used - Good",
    description:
      "Trek Marlin 5 mountain bike, 29-inch wheels, size M. Well-maintained, minor scratches. Great for trails and daily commuting.",
    postedAgo: "3 days ago",
    isSaved: true,
    deliveryOptions: ["Local Pickup"],
    activityScore: 110,
    createdAt: "2025-08-02T16:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 4,
    title: "Custom Website Design Service",
    seller: "Web Solutions Pro",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=WS",
    location: "Remote",
    category: "Services",
    price: "$800",
    condition: "New",
    description:
      "Professional custom website design tailored to your business needs. Includes responsive design, SEO optimization, and 3 revisions. Portfolio available upon request.",
    postedAgo: "5 days ago",
    isMyOffer: true,
    deliveryOptions: ["Remote Service"],
    activityScore: 70,
    createdAt: "2025-07-31T09:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 5,
    title: "Designer Leather Jacket",
    seller: "Fashion Finds",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=FF",
    location: "Miami, FL",
    category: "Apparel",
    price: "$180",
    condition: "Used - Like New",
    description:
      "High-quality genuine leather jacket, size M. Worn only a few times, no visible flaws. Original price $400.",
    postedAgo: "1 week ago",
    isMadeOffer: true,
    deliveryOptions: ["Shipping"],
    activityScore: 60,
    createdAt: "2025-07-29T11:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 6,
    title: "Complete Harry Potter Book Set",
    seller: "Bookworm's Paradise",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=BP",
    location: "Chicago, IL",
    category: "Books",
    price: "$75",
    condition: "Used - Good",
    description: "All 7 Harry Potter books in paperback. Good condition, some wear on covers. A must-have for any fan!",
    postedAgo: "2 days ago",
    deliveryOptions: ["Local Pickup", "Shipping"],
    activityScore: 50,
    createdAt: "2025-08-03T13:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 7,
    title: "Gaming Chair - Ergonomic Design",
    seller: "Gamer's Den",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=GD",
    location: "Austin, TX",
    category: "Home Goods",
    price: "$150",
    condition: "New",
    description: "Brand new ergonomic gaming chair with lumbar support, adjustable height, and premium materials.",
    postedAgo: "5 hours ago",
    isFeatured: true,
    isTrending: true,
    deliveryOptions: ["Local Pickup", "Shipping"],
    activityScore: 220,
    createdAt: "2025-08-06T09:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 8,
    title: "iPhone 14 Pro Max",
    seller: "Tech Trader",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=TT",
    location: "San Francisco, CA",
    category: "Electronics",
    price: "$800",
    condition: "Used - Like New",
    description: "iPhone 14 Pro Max 128GB in Space Black. Excellent condition, comes with original box and charger.",
    postedAgo: "1 day ago",
    isTrending: true,
    deliveryOptions: ["Local Pickup", "Shipping"],
    activityScore: 300,
    createdAt: "2025-08-04T12:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 9,
    title: "Workout Equipment Set",
    seller: "Fitness First",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=FF",
    location: "Miami, FL",
    category: "Sports & Recreation",
    price: "$300",
    condition: "Used - Good",
    description: "Complete home gym set including dumbbells, resistance bands, and yoga mat. Perfect for home workouts.",
    postedAgo: "3 days ago",
    isMyOffer: true,
    deliveryOptions: ["Local Pickup"],
    activityScore: 85,
    createdAt: "2025-08-02T08:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: 10,
    title: "Designer Handbag - Coach",
    seller: "Luxury Finds",
    sellerLogo: "/placeholder.svg?height=64&width=64&text=LF",
    location: "New York, NY",
    category: "Apparel",
    price: "$120",
    condition: "Used - Fair",
    description: "Authentic Coach handbag, shows some wear but still in good functional condition. Great for everyday use.",
    postedAgo: "4 days ago",
    isSaved: true,
    deliveryOptions: ["Shipping"],
    activityScore: 40,
    createdAt: "2025-08-01T15:00:00Z",
    photos: ["/placeholder.svg?height=200&width=300"],
  },
]

export function OffersList({ currentTab, searchText = "", filters }: OffersListProps) {
  const getFilteredOffers = () => {
    let offers = [...allOffers]

    // Apply tab-based filtering first
    switch (currentTab) {
      case "trending":
        offers = offers.filter(offer => offer.isTrending)
        break
      case "featured":
        offers = offers.filter(offer => offer.isFeatured)
        break
      case "my-offers":
        offers = offers.filter(offer => offer.isMyOffer)
        break
      case "offers-made":
        offers = offers.filter(offer => offer.isMadeOffer)
        break
      case "saved":
        offers = offers.filter(offer => offer.isSaved)
        break
      default:
        // "discover" - show all offers
        break
    }

    // Apply search filter
    if (searchText) {
      offers = offers.filter(offer =>
        offer.title.toLowerCase().includes(searchText.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchText.toLowerCase()) ||
        offer.category.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    // Apply additional filters if provided
    if (filters) {
      if (filters.categories.length > 0) {
        offers = offers.filter(offer => filters.categories.includes(offer.category))
      }

      if (filters.conditions.length > 0) {
        offers = offers.filter(offer => filters.conditions.includes(offer.condition))
      }

      if (filters.location) {
        offers = offers.filter(offer =>
          offer.location.toLowerCase().includes(filters.location.toLowerCase())
        )
      }

      // Price range filter (convert string prices to numbers for comparison)
      const priceMin = filters.priceRange.min
      const priceMax = filters.priceRange.max
      if (priceMin > 0 || priceMax < 10000) {
        offers = offers.filter(offer => {
          const priceStr = offer.price.replace(/[$,]/g, '')
          const price = parseFloat(priceStr) || 0
          return price >= priceMin && price <= priceMax
        })
      }

      // Sort offers
      switch (filters.sortBy) {
        case "newest":
          offers.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime())
          break
        case "price_low":
          offers.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[$,]/g, '')) || 0
            const priceB = parseFloat(b.price.replace(/[$,]/g, '')) || 0
            return priceA - priceB
          })
          break
        case "price_high":
          offers.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[$,]/g, '')) || 0
            const priceB = parseFloat(b.price.replace(/[$,]/g, '')) || 0
            return priceB - priceA
          })
          break
        case "popular":
          offers.sort((a, b) => (b.activityScore || 0) - (a.activityScore || 0))
          break
      }
    } else {
      // Default sorting for tab-based views
      if (currentTab === "trending") {
        offers.sort((a, b) => (b.activityScore || 0) - (a.activityScore || 0))
      }
    }

    return offers
  }

  const filteredOffers = getFilteredOffers()

  const getEmptyStateMessage = () => {
    switch (currentTab) {
      case "trending":
        return {
          title: "No trending offers right now",
          description: "Check back later for popular offers!",
        }
      case "featured":
        return {
          title: "No featured offers available",
          description: "Stay tuned for exciting featured opportunities!",
        }
      case "my-offers":
        return {
          title: "You haven't created any offers yet",
          description: "Start by creating your first offer!",
        }
      case "offers-made":
        return {
          title: "You haven't made any offers yet",
          description: "Explore listings and make an offer on something you like!",
        }
      case "saved":
        return {
          title: "No saved offers found",
          description: "Save offers you're interested in to view them here!",
        }
      default:
        return {
          title: "No offers found",
          description: "Try adjusting your filters or search terms.",
        }
    }
  }

  if (filteredOffers.length === 0) {
    const emptyState = getEmptyStateMessage()
    return (
      <div className="text-center py-8 md:py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{emptyState.title}</h3>
          <p className="text-sm md:text-base text-gray-600 mb-4">{emptyState.description}</p>
          {currentTab === "my-offers" && <Button className="w-full sm:w-auto">Create a New Offer</Button>}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredOffers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
      <div className="col-span-full text-center mt-6">
        <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
          Load More Offers
        </Button>
      </div>
    </div>
  )
}
