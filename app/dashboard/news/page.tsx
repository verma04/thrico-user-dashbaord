import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

import Link from "next/link"
import {
  Search,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  TrendingUp,
  Edit,
  ExternalLink,
} from "lucide-react"
import { WriteStory } from "@/components/write-story"

export default function NewsPage() {
  // Function to generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News & Stories</h1>
          <p className="text-gray-600">Stay updated with community news and member stories</p>
        </div>
        <WriteStory>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Write Story
          </Button>
        </WriteStory>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search news and stories..." className="pl-10" />
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Community News
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Member Stories
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Industry News
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Announcements
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Story */}
          <Card className="overflow-hidden">
            <div className="relative h-64">
              <img
                src="/placeholder.svg?height=256&width=600&text=Featured Story"
                alt="Featured story"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-600">Featured</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <Badge variant="secondary" className="mb-2">
                  Community News
                </Badge>
                <Link href="/dashboard/news/thrico-community-reaches-10000-members-milestone">
                  <h2 className="text-2xl font-bold text-white mb-2 hover:text-blue-200 cursor-pointer">
                    Thrico Community Reaches 10,000 Members Milestone
                  </h2>
                </Link>
                <p className="text-gray-200 mb-3">
                  Our community has grown to 10,000 active members across 50 countries, fostering connections and
                  collaboration worldwide.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span>By Community Team</span>
                  <span>•</span>
                  <span>Dec 10, 2024</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </Card>

          {/* News Stories */}
          <div className="space-y-6">
            {[
              {
                id: 1,
                title: "From Bootcamp to Senior Developer: Sarah's Journey",
                excerpt:
                  "How Sarah Chen transformed her career from marketing to becoming a senior developer at a top tech company through community support and mentorship.",
                author: "Sarah Chen",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                publishDate: "Dec 8, 2024",
                readTime: "8 min read",
                category: "Member Stories",
                image: "/placeholder.svg?height=200&width=300&text=Success Story",
                likes: 234,
                comments: 45,
                shares: 23,
                views: 1200,
                tags: ["Career Change", "Success Story", "Mentorship"],
              },
              {
                id: 2,
                title: "New Partnership with TechCorp: Exclusive Benefits for Members",
                excerpt:
                  "We're excited to announce our partnership with TechCorp, bringing exclusive discounts, early access to products, and career opportunities to our community.",
                author: "Community Team",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                publishDate: "Dec 7, 2024",
                readTime: "3 min read",
                category: "Announcements",
                image: "/placeholder.svg?height=200&width=300&text=Partnership News",
                likes: 156,
                comments: 28,
                shares: 67,
                views: 890,
                tags: ["Partnership", "Benefits", "Announcement"],
              },
              {
                id: 3,
                title: "The Rise of AI in Remote Work: Industry Insights",
                excerpt:
                  "Exploring how artificial intelligence is transforming remote work practices and what it means for the future of distributed teams.",
                author: "Marcus Johnson",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                publishDate: "Dec 6, 2024",
                readTime: "12 min read",
                category: "Industry News",
                image: "/placeholder.svg?height=200&width=300&text=AI Remote Work",
                likes: 89,
                comments: 34,
                shares: 45,
                views: 567,
                tags: ["AI", "Remote Work", "Future of Work"],
              },
              {
                id: 4,
                title: "Community Spotlight: Elena's Open Source Contribution",
                excerpt:
                  "Meet Elena Rodriguez, whose open source project has gained 10k+ stars on GitHub and is now used by companies worldwide.",
                author: "Elena Rodriguez",
                authorAvatar: "/placeholder.svg?height=40&width=40",
                publishDate: "Dec 5, 2024",
                readTime: "6 min read",
                category: "Member Stories",
                image: "/placeholder.svg?height=200&width=300&text=Open Source",
                likes: 178,
                comments: 52,
                shares: 34,
                views: 923,
                tags: ["Open Source", "GitHub", "Community Spotlight"],
              },
            ].map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{story.category}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{story.readTime}</span>
                      </div>
                    </div>

                    <Link href={`/dashboard/news/${generateSlug(story.title)}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {story.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 mb-4 line-clamp-2">{story.excerpt}</p>

                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={story.authorAvatar || "/placeholder.svg"} alt={story.author} />
                        <AvatarFallback className="text-xs">
                          {story.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{story.author}</p>
                        <p className="text-xs text-gray-500">{story.publishDate}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-red-500">
                          <Heart className="w-4 h-4" />
                          <span>{story.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                          <MessageCircle className="w-4 h-4" />
                          <span>{story.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-500">
                          <Share2 className="w-4 h-4" />
                          <span>{story.shares}</span>
                        </button>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{story.views}</span>
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Stories
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My Stories */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">My Stories</CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "My Journey to Product Management",
                    status: "published",
                    views: 456,
                    likes: 23,
                    publishDate: "Nov 28, 2024",
                  },
                  {
                    title: "Building a Design System from Scratch",
                    status: "draft",
                    views: 0,
                    likes: 0,
                    publishDate: "Draft",
                  },
                ].map((story, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <h4 className="font-medium text-sm mb-1">{story.title}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Badge variant={story.status === "published" ? "default" : "outline"} className="text-xs">
                        {story.status}
                      </Badge>
                      <span>{story.publishDate}</span>
                    </div>
                    {story.status === "published" && (
                      <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                        <span>{story.views} views</span>
                        <span>{story.likes} likes</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <WriteStory>
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  Write New Story
                </Button>
              </WriteStory>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { topic: "Remote Work", posts: 45 },
                  { topic: "AI & Machine Learning", posts: 38 },
                  { topic: "Career Growth", posts: 32 },
                  { topic: "Startup Stories", posts: 28 },
                  { topic: "Tech Industry", posts: 24 },
                ].map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{trend.topic}</span>
                    <Badge variant="secondary" className="text-xs">
                      {trend.posts} posts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Authors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Authors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Marcus Johnson",
                    role: "Tech Lead",
                    stories: 12,
                    followers: 1234,
                    avatar: "/placeholder.svg?height=32&width=32",
                  },
                  {
                    name: "Elena Rodriguez",
                    role: "Data Scientist",
                    stories: 8,
                    followers: 890,
                    avatar: "/placeholder.svg?height=32&width=32",
                  },
                  {
                    name: "David Kim",
                    role: "Product Manager",
                    stories: 6,
                    followers: 567,
                    avatar: "/placeholder.svg?height=32&width=32",
                  },
                ].map((author, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                      <AvatarFallback className="text-xs">
                        {author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{author.name}</p>
                      <p className="text-xs text-gray-600">{author.role}</p>
                      <p className="text-xs text-gray-500">
                        {author.stories} stories • {author.followers} followers
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* External News */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Industry News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Tech Giants Announce New AI Initiatives",
                    source: "TechCrunch",
                    time: "2 hours ago",
                    url: "#",
                  },
                  {
                    title: "Remote Work Trends for 2024",
                    source: "Harvard Business Review",
                    time: "5 hours ago",
                    url: "#",
                  },
                  {
                    title: "Startup Funding Reaches New Heights",
                    source: "VentureBeat",
                    time: "1 day ago",
                    url: "#",
                  },
                ].map((news, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <h4 className="font-medium text-sm mb-1 hover:text-blue-600 cursor-pointer">{news.title}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{news.source}</span>
                      <div className="flex items-center space-x-2">
                        <span>{news.time}</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
