import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CalendarDays, User, Clock, ArrowRight, Search, TrendingUp, Award, Users, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NewsPage() {
  const featuredNews = {
    title: "Thrico Launches AI-Powered Networking Recommendations",
    excerpt: "Our new AI system helps members discover more relevant connections and opportunities based on their interests and career goals.",
    date: "August 5, 2025",
    author: "Sarah Johnson",
    category: "Product Updates",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "5 min read"
  }

  const newsCategories = [
    { name: "All", count: 24 },
    { name: "Product Updates", count: 8 },
    { name: "Community", count: 6 },
    { name: "Events", count: 5 },
    { name: "Industry", count: 3 },
    { name: "Company", count: 2 }
  ]

  const newsArticles = [
    {
      title: "Community Spotlight: How Sarah Built a 1000+ Member Design Group",
      excerpt: "Learn how community leader Sarah Chen grew her UX design group from 50 to over 1000 members in just 6 months.",
      date: "August 3, 2025",
      author: "Michael Chen",
      category: "Community",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "4 min read"
    },
    {
      title: "Q2 2025 Platform Updates: New Features and Improvements",
      excerpt: "Discover all the new features we've shipped this quarter, including enhanced event discovery and improved mobile experience.",
      date: "July 30, 2025",
      author: "Emily Rodriguez",
      category: "Product Updates",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "6 min read"
    },
    {
      title: "Summer Tech Summit 2025: Record Breaking Attendance",
      excerpt: "Our largest tech summit yet brought together 2,500+ professionals for three days of learning and networking.",
      date: "July 25, 2025",
      author: "David Park",
      category: "Events",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "3 min read"
    },
    {
      title: "The Future of Remote Work: Insights from Industry Leaders",
      excerpt: "Key takeaways from our recent panel discussion with CEOs and remote work experts about the evolving workplace.",
      date: "July 20, 2025",
      author: "Sarah Johnson",
      category: "Industry",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "7 min read"
    },
    {
      title: "Thrico Reaches 75,000 Active Members Milestone",
      excerpt: "Celebrating a major milestone as our community continues to grow and thrive across 50+ cities worldwide.",
      date: "July 15, 2025",
      author: "Michael Chen",
      category: "Company",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "2 min read"
    },
    {
      title: "New Partnership Program for Event Organizers",
      excerpt: "Introducing our new partnership program that provides resources and support for community leaders organizing events.",
      date: "July 10, 2025",
      author: "Emily Rodriguez",
      category: "Product Updates",
      image: "/placeholder.svg?height=200&width=300",
      readTime: "5 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <Link href="/" className="text-xl font-bold text-gray-900 nav-text">Thrico</Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#events" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Events
              </Link>
              <Link href="/#groups" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Groups
              </Link>
              <Link href="/#jobs" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Jobs
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 nav-text-small">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 nav-text-small">
                Contact
              </Link>
              <Link href="/news" className="text-blue-600 hover:text-blue-700 nav-text-small font-medium">
                News
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="button-text-small">Sign In</Button>
              <Button asChild className="button-text-small">
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-h1 md:text-6xl text-white mb-6">
              Thrico <span className="text-yellow-300">News</span>
            </h1>
            <p className="body-text text-blue-100 mb-8 text-lg">
              Stay updated with the latest news, product updates, community highlights, 
              and industry insights from the Thrico team and community.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search news articles..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {newsCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.name === "All" ? "default" : "outline"}
                  size="sm"
                  className="button-text-small"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="heading-h2 text-gray-900 mb-4">Featured Story</h2>
          </div>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <Image 
                  src={featuredNews.image} 
                  alt={featuredNews.title} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary" className="label-text-small">
                    {featuredNews.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 label-text-small">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredNews.readTime}
                  </div>
                </div>
                <h3 className="heading-h3 text-gray-900 mb-4">{featuredNews.title}</h3>
                <p className="body-text text-gray-600 mb-6">{featuredNews.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 label-text">
                    <User className="w-4 h-4 mr-1" />
                    {featuredNews.author}
                    <span className="mx-2">•</span>
                    <CalendarDays className="w-4 h-4 mr-1" />
                    {featuredNews.date}
                  </div>
                  <Button className="button-text">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">Latest News</h2>
            <p className="body-text text-gray-600">
              Catch up on the latest updates from our community and platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <Badge variant="outline" className="label-text-small">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 label-text-small">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="heading-h4 line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="body-text-small line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-gray-500 label-text-small">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="w-3 h-3 mr-1" />
                      {article.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="button-text">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="heading-h2 text-white mb-4">Stay in the Loop</h2>
              <p className="body-text text-blue-100 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter and never miss important updates, community highlights, 
                and exclusive insights from the Thrico team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email address" 
                  className="bg-white text-gray-900 border-0"
                />
                <Button variant="secondary" className="button-text whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="label-text-small text-blue-200 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-h2 text-gray-900 mb-4">Community Highlights</h2>
            <p className="body-text text-gray-600">
              See what's happening in our growing community
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                number: "25%",
                label: "Growth This Month",
                color: "text-green-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                number: "75K+",
                label: "Active Members",
                color: "text-blue-600"
              },
              {
                icon: <Award className="w-8 h-8" />,
                number: "150+",
                label: "Events This Month",
                color: "text-purple-600"
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                number: "500+",
                label: "Job Placements",
                color: "text-orange-600"
              }
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${stat.color} bg-opacity-10`}>
                    <div className={stat.color}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</p>
                  <p className="label-text text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold">Thrico</span>
              </div>
              <p className="text-gray-400 mb-4">
                Building meaningful professional communities, one connection at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#events" className="hover:text-white">Events</Link></li>
                <li><Link href="/#groups" className="hover:text-white">Groups</Link></li>
                <li><Link href="/#jobs" className="hover:text-white">Jobs</Link></li>
                <li><Link href="/#members" className="hover:text-white">Members</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/news" className="hover:text-white">News</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Thrico. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
