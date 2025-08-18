"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  TrendingUp,
  Filter,
  Globe,
  Lock,
  Sparkles,
  Calendar,
  MessageSquare
} from "lucide-react"

interface DiscoveryCommunity {
  id: string
  name: string
  description: string
  category: string
  members: number
  posts: number
  rating: number
  location: string
  privacy: "public" | "private"
  tags: string[]
  isNew: boolean
  isTrending: boolean
  isFeatured: boolean
  avatar: string
  cover: string
  lastActivity: string
  growthRate: string
}

export default function CommunityDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const discoveryCommunities: DiscoveryCommunity[] = [
    {
      id: "1",
      name: "AI & Machine Learning Hub",
      description: "Explore the latest in artificial intelligence and machine learning. Share research, discuss trends, and collaborate on projects.",
      category: "Technology",
      members: 15420,
      posts: 2340,
      rating: 4.8,
      location: "Global",
      privacy: "public",
      tags: ["AI", "ML", "Python", "Research"],
      isNew: false,
      isTrending: true,
      isFeatured: true,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      lastActivity: "2 hours ago",
      growthRate: "+25%"
    },
    {
      id: "2",
      name: "Digital Nomads Network",
      description: "Connect with location-independent professionals. Share tips, find co-working spaces, and build a global network.",
      category: "Lifestyle",
      members: 8920,
      posts: 1850,
      rating: 4.6,
      location: "Worldwide",
      privacy: "public",
      tags: ["Remote Work", "Travel", "Networking", "Productivity"],
      isNew: true,
      isTrending: true,
      isFeatured: false,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      lastActivity: "1 hour ago",
      growthRate: "+40%"
    },
    {
      id: "3",
      name: "Sustainable Living Collective",
      description: "Making eco-friendly choices easier. Share sustainable practices, green products, and environmental solutions.",
      category: "Environment",
      members: 6780,
      posts: 980,
      rating: 4.7,
      location: "Global",
      privacy: "public",
      tags: ["Sustainability", "Environment", "Green Living", "Climate"],
      isNew: false,
      isTrending: false,
      isFeatured: true,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      lastActivity: "4 hours ago",
      growthRate: "+18%"
    },
    {
      id: "4",
      name: "Indie Game Developers",
      description: "A supportive community for independent game developers. Share your projects, get feedback, and find collaborators.",
      category: "Gaming",
      members: 12350,
      posts: 3200,
      rating: 4.9,
      location: "Global",
      privacy: "public",
      tags: ["Game Dev", "Indie", "Unity", "Pixel Art"],
      isNew: false,
      isTrending: true,
      isFeatured: false,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      lastActivity: "30 minutes ago",
      growthRate: "+32%"
    },
    {
      id: "5",
      name: "Personal Finance Masters",
      description: "Take control of your financial future. Learn about investing, budgeting, and building wealth.",
      category: "Finance",
      members: 18740,
      posts: 4500,
      rating: 4.5,
      location: "Global",
      privacy: "private",
      tags: ["Investing", "Budgeting", "FIRE", "Crypto"],
      isNew: false,
      isTrending: false,
      isFeatured: true,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      lastActivity: "1 hour ago",
      growthRate: "+15%"
    },
    {
      id: "6",
      name: "Creative Writing Circle",
      description: "A space for writers to share their work, get constructive feedback, and improve their craft together.",
      category: "Arts & Writing",
      members: 5420,
      posts: 1200,
      rating: 4.8,
      location: "Global",
      privacy: "public",
      tags: ["Writing", "Fiction", "Poetry", "Feedback"],
      isNew: true,
      isTrending: false,
      isFeatured: false,
      avatar: "/placeholder.svg",
      cover: "/placeholder.svg",
      lastActivity: "3 hours ago",
      growthRate: "+45%"
    }
  ]

  const categories = [
    "all",
    "Technology",
    "Lifestyle",
    "Environment",
    "Gaming",
    "Finance",
    "Arts & Writing",
    "Health & Fitness",
    "Education",
    "Business"
  ]

  const filteredCommunities = useMemo(() => {
    return discoveryCommunities.filter(community => {
      const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === "all" || community.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const trendingCommunities = discoveryCommunities.filter(c => c.isTrending)
  const newCommunities = discoveryCommunities.filter(c => c.isNew)
  const featuredCommunities = discoveryCommunities.filter(c => c.isFeatured)

  const CommunityCard = ({ community }: { community: DiscoveryCommunity }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <img 
          src={community.cover} 
          alt={community.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {community.isNew && (
            <Badge className="bg-green-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              New
            </Badge>
          )}
          {community.isTrending && (
            <Badge className="bg-orange-500 text-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
          {community.isFeatured && (
            <Badge className="bg-yellow-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          {community.privacy === "private" ? (
            <Lock className="w-4 h-4 text-white" />
          ) : (
            <Globe className="w-4 h-4 text-white" />
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-12 h-12 border-2 border-white -mt-6 relative z-10">
            <AvatarImage src={community.avatar} />
            <AvatarFallback>{community.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 pt-2">
            <h3 className="font-semibold text-lg mb-1">{community.name}</h3>
            <Badge variant="outline" className="text-xs">
              {community.category}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{community.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {community.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {community.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{community.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {community.members.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {community.posts}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{community.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {community.location}
            </div>
            <div className="mt-1">Growth: {community.growthRate}</div>
          </div>
          <Button size="sm">
            {community.privacy === "private" ? "Request to Join" : "Join Community"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex gap-6 p-4 sm:p-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Discover Communities</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Find your tribe and explore new interests</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search communities, tags, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-start gap-1 p-1 mb-6">
            <TabsTrigger value="all">All Communities</TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              New
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Featured
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
            {filteredCommunities.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-2">No communities found</div>
                <div className="text-sm text-gray-400">Try adjusting your search or filters</div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="w-80 shrink-0 hidden lg:block">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.slice(1, 6).map((category) => {
                  const count = discoveryCommunities.filter(c => c.category === category).length
                  return (
                    <div key={category} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <span className="text-sm">{category}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["AI", "Remote Work", "Sustainability", "Game Dev", "Investing", "Writing", "Python", "Travel"].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discovery Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Join communities that align with your interests and career goals.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    🎯 <strong>Goal:</strong> Start with 3-5 communities to avoid overwhelming your feed.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    🚀 <strong>Pro:</strong> Engage actively in discussions to build meaningful connections.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Communities</span>
                  <span className="font-semibold">{discoveryCommunities.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold">
                    {discoveryCommunities.reduce((sum, c) => sum + c.members, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Today</span>
                  <span className="font-semibold text-green-600">
                    {discoveryCommunities.filter(c => c.lastActivity.includes("hour") || c.lastActivity.includes("minute")).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
