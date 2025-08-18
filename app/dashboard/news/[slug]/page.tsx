import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  User,
  Tag,
  Edit,
  MoreHorizontal,
} from "lucide-react"

// Mock data - in a real app, this would come from a database
const mockStories = [
  {
    id: 1,
    title: "From Bootcamp to Senior Developer: Sarah's Journey",
    slug: "from-bootcamp-to-senior-developer-sarahs-journey",
    excerpt:
      "How Sarah Chen transformed her career from marketing to becoming a senior developer at a top tech company through community support and mentorship.",
    content: `
      <h2>The Beginning</h2>
      <p>Three years ago, I was working in marketing at a small agency, feeling unfulfilled and looking for a change. I had always been interested in technology, but I never thought I could make a career out of it. That all changed when I discovered coding bootcamps and decided to take the leap.</p>
      
      <h2>The Challenge</h2>
      <p>Learning to code was one of the most challenging things I've ever done. The imposter syndrome was real, and there were many times I wanted to give up. But the Thrico community became my lifeline. The support, encouragement, and practical advice from other members kept me going.</p>
      
      <blockquote>
        <p>"The community here isn't just about networking - it's about genuine human connections that help you grow both personally and professionally."</p>
      </blockquote>
      
      <h2>The Breakthrough</h2>
      <p>After 6 months of intensive learning and building projects, I landed my first junior developer role. But that was just the beginning. With continued mentorship from senior developers in the community, I was able to accelerate my learning and take on more complex projects.</p>
      
      <h2>Paying It Forward</h2>
      <p>Now, as a senior developer, I spend time mentoring newcomers in the community. It's incredible to see how a supportive environment can transform careers and lives. If you're just starting out, remember that everyone was a beginner once, and the community is here to help you succeed.</p>
      
      <p>The journey from marketing to senior developer wasn't easy, but it was worth every challenge. The Thrico community made it possible, and I'm grateful to be part of this amazing network of professionals who support each other's growth.</p>
    `,
    author: "Sarah Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorBio: "Senior Software Developer at TechCorp. Passionate about mentoring and helping others transition into tech careers.",
    publishDate: "Dec 8, 2024",
    readTime: "8 min read",
    category: "Member Stories",
    image: "/placeholder.svg?height=400&width=800&text=Success Story",
    likes: 234,
    comments: 45,
    shares: 23,
    views: 1200,
    tags: ["Career Change", "Success Story", "Mentorship"],
  },
  {
    id: 2,
    title: "New Partnership with TechCorp: Exclusive Benefits for Members",
    slug: "new-partnership-with-techcorp-exclusive-benefits-for-members",
    excerpt:
      "We're excited to announce our partnership with TechCorp, bringing exclusive discounts, early access to products, and career opportunities to our community.",
    content: `
      <h2>Exciting Partnership Announcement</h2>
      <p>We're thrilled to announce our new partnership with TechCorp, one of the leading technology companies in the industry. This collaboration brings exclusive benefits and opportunities to our community members.</p>
      
      <h2>What This Means for You</h2>
      <ul>
        <li><strong>Exclusive Discounts:</strong> 20% off all TechCorp products and services</li>
        <li><strong>Early Access:</strong> Get first access to new product launches</li>
        <li><strong>Career Opportunities:</strong> Priority consideration for open positions</li>
        <li><strong>Technical Resources:</strong> Access to premium learning materials</li>
        <li><strong>Networking Events:</strong> Invitation-only meetups with TechCorp engineers</li>
      </ul>
      
      <h2>How to Access These Benefits</h2>
      <p>All verified community members will automatically have access to these benefits. Simply log into your account and visit the "Partners" section to claim your exclusive offers.</p>
      
      <p>This partnership represents our commitment to providing real value to our community members. We're constantly working to bring you opportunities that can advance your career and help you grow professionally.</p>
    `,
    author: "Community Team",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorBio: "The Thrico Community Team works tirelessly to bring you the best resources, connections, and opportunities.",
    publishDate: "Dec 7, 2024",
    readTime: "3 min read",
    category: "Announcements",
    image: "/placeholder.svg?height=400&width=800&text=Partnership News",
    likes: 156,
    comments: 28,
    shares: 67,
    views: 890,
    tags: ["Partnership", "Benefits", "Announcement"],
  },
]

interface StoryPageProps {
  params: {
    slug: string
  }
}

export default function StoryPage({ params }: StoryPageProps) {
  const story = mockStories.find(s => s.slug === params.slug)

  if (!story) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/dashboard/news">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Hero Image */}
          {story.image && (
            <div className="w-full h-64 md:h-96">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="outline">{story.category}</Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{story.readTime}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{story.publishDate}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{story.views} views</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {story.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {story.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {story.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={story.authorAvatar || "/placeholder.svg"} alt={story.author} />
                  <AvatarFallback>
                    {story.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{story.author}</p>
                  <p className="text-sm text-gray-600">{story.authorBio}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Follow
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />

            <Separator className="my-8" />

            {/* Engagement Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">{story.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{story.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">{story.shares}</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-6">Comments ({story.comments})</h3>
            
            {/* Comment Form */}
            <div className="mb-8">
              <div className="flex space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Your profile" />
                  <AvatarFallback>YN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your thoughts on this story..."
                    className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Post Comment</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-6">
              {[
                {
                  author: "John Doe",
                  avatar: "/placeholder.svg",
                  content: "This is such an inspiring story! Thanks for sharing your journey, Sarah. It gives me hope as someone who's also considering a career change.",
                  time: "2 hours ago",
                  likes: 12
                },
                {
                  author: "Emma Wilson",
                  avatar: "/placeholder.svg",
                  content: "The community support aspect is so important. I'm glad we have platforms like this where people can genuinely help each other grow.",
                  time: "5 hours ago",
                  likes: 8
                }
              ].map((comment, index) => (
                <div key={index} className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-medium text-sm">{comment.author}</p>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{comment.time}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <button className="text-sm text-gray-500 hover:text-red-500 flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-sm text-gray-500 hover:text-blue-500">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button variant="outline">Load More Comments</Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Stories */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-6">Related Stories</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {mockStories
                .filter(s => s.id !== story.id)
                .slice(0, 2)
                .map((relatedStory) => (
                  <Link key={relatedStory.id} href={`/dashboard/news/${relatedStory.slug}`}>
                    <div className="group cursor-pointer">
                      <div className="aspect-video mb-3 overflow-hidden rounded-lg">
                        <img
                          src={relatedStory.image}
                          alt={relatedStory.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <Badge variant="outline" className="mb-2">
                        {relatedStory.category}
                      </Badge>
                      <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                        {relatedStory.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {relatedStory.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
