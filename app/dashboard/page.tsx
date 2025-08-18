import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Calendar,
  MessageSquare,
  Bell,
  Plus,
  MapPin,
  Clock,
  ShoppingBag,
  Briefcase,
  Heart,
  MessageCircle,
  Share2,
  ClipboardList,
  FileText,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Platform Overview Header with Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-blue-100 text-sm sm:text-base mb-3">Here's your complete community activity overview</p>
            <div className="flex items-center space-x-4 text-blue-100 text-sm">
              <span>🌟 You have 3 new notifications</span>
              <span>📅 2 events today</span>
              <span>💬 5 new comments</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline">Quick Actions</span>
                  <span className="xs:hidden">Create</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/feed/create" className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/events/create" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    New Event
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/discussions/create" className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Discussion
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/communities/create" className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Create Community
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/marketplace/create" className="flex items-center">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    List Item
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/jobs/create" className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Post Job
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/surveys/create" className="flex items-center">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Create Survey
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/forms/create" className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Form
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent flex-1 sm:flex-none"
            >
              <Bell className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Updates</span>
              <span className="xs:hidden">Updates</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Overview Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          
          {/* Recent Feed Comments & Activity */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-lg sm:text-xl">Recent Feed Activity</CardTitle>
                <Link href="/dashboard/feed">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  type: "comment",
                  author: "Alex Chen",
                  action: "commented on your post",
                  content: "Great insights on team collaboration! I've implemented similar strategies in my team.",
                  time: "15 minutes ago",
                  postTitle: "Remote Team Management Tips",
                  avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                  type: "like",
                  author: "Maria Garcia",
                  action: "liked your discussion",
                  content: "",
                  time: "1 hour ago",
                  postTitle: "AI in Healthcare: Future Prospects",
                  avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                  type: "comment",
                  author: "David Kim",
                  action: "replied to your comment",
                  content: "I agree! Have you tried the new project management tool I mentioned?",
                  time: "2 hours ago",
                  postTitle: "Best Tools for Productivity",
                  avatar: "/placeholder.svg?height=32&width=32",
                },
              ].map((activity, index) => (
                <div key={index} className="border rounded-lg p-3 sm:p-4 bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarImage src={activity.avatar} alt={activity.author} />
                      <AvatarFallback className="text-xs sm:text-sm">
                        {activity.author.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-sm sm:text-base">{activity.author}</h4>
                        <span className="text-xs sm:text-sm text-gray-500">{activity.action}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-600 mb-1">"{activity.postTitle}"</p>
                      {activity.content && (
                        <p className="text-gray-700 text-sm bg-white p-2 rounded border-l-2 border-blue-200">
                          {activity.content}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Communities & Activities */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-lg sm:text-xl">My Communities Activity</CardTitle>
                <Link href="/dashboard/communities">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Manage All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Full Stack Developers",
                    members: 1247,
                    activity: "12 new posts today",
                    lastActive: "2 minutes ago",
                    role: "Admin",
                    newCount: 5,
                    color: "bg-blue-500",
                  },
                  {
                    name: "UI/UX Designers Hub",
                    members: 856,
                    activity: "8 new discussions",
                    lastActive: "1 hour ago",
                    role: "Member",
                    newCount: 3,
                    color: "bg-purple-500",
                  },
                  {
                    name: "Startup Founders Network",
                    members: 432,
                    activity: "New event posted",
                    lastActive: "3 hours ago",
                    role: "Moderator",
                    newCount: 1,
                    color: "bg-green-500",
                  },
                ].map((community, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${community.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{community.name}</h3>
                          <Badge variant="outline" className="text-xs">{community.role}</Badge>
                          {community.newCount > 0 && (
                            <Badge variant="destructive" className="text-xs">{community.newCount}</Badge>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{community.members} members</p>
                        <p className="text-xs text-blue-600">{community.activity}</p>
                        <p className="text-xs text-gray-500">Last active: {community.lastActive}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Discussion Forum Comments */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-lg sm:text-xl">Discussion Forum Activity</CardTitle>
                <Link href="/dashboard/discussions">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    View Forums
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Best practices for remote work",
                  author: "Sarah Wilson",
                  replies: 23,
                  lastReply: "Just replied by John Doe",
                  time: "5 minutes ago",
                  category: "General",
                  isHot: true,
                },
                {
                  title: "AI tools for developers in 2025",
                  author: "Mike Johnson",
                  replies: 18,
                  lastReply: "New comment by Lisa Chen",
                  time: "15 minutes ago",
                  category: "Technology",
                  isHot: false,
                },
                {
                  title: "Career transition advice needed",
                  author: "Emily Davis",
                  replies: 31,
                  lastReply: "Helpful tip by Robert Kim",
                  time: "1 hour ago",
                  category: "Career",
                  isHot: true,
                },
              ].map((discussion, index) => (
                <div key={index} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-sm sm:text-base truncate">{discussion.title}</h4>
                        {discussion.isHot && <Badge variant="destructive" className="text-xs">Hot</Badge>}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">by {discussion.author}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs sm:text-sm">
                        <span className="text-blue-600">{discussion.replies} replies</span>
                        <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                      </div>
                      <p className="text-xs text-green-600 mt-1">{discussion.lastReply}</p>
                      <p className="text-xs text-gray-500">{discussion.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Overview & Quick Info */}
        <div className="space-y-6">
          
          {/* My Calendar - What's Next */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Calendar - What's Next</CardTitle>
              <CardDescription>Upcoming events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                 
                  {
                    title: "Tech Networking Event",
                    time: "Tomorrow, 6:00 PM",
                    type: "event",
                    priority: "low",
                    location: "San Francisco",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500' : 
                      item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.time}</p>
                      <p className="text-xs text-gray-500">{item.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/events">
                <Button size="sm" className="w-full mt-4">
                  View Full Calendar
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Notifications & Latest News */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Latest News & Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    type: "news",
                    title: "New Feature: AI Writing Assistant",
                    content: "We've launched an AI-powered writing assistant to help you create better posts.",
                    time: "2 hours ago",
                    isNew: true,
                  },
                  {
                    type: "notification",
                    title: "Community Guidelines Updated",
                    content: "Please review the updated community guidelines for better engagement.",
                    time: "1 day ago",
                    isNew: false,
                  },
                  {
                    type: "news",
                    title: "Platform Maintenance Scheduled",
                    content: "Scheduled maintenance on Aug 15, 2025 from 2:00 AM - 4:00 AM PST.",
                    time: "2 days ago",
                    isNew: false,
                  },
                ].map((notification, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          notification.type === 'news' ? 'bg-blue-500' : 'bg-orange-500'
                        }`}></div>
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                        {notification.isNew && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                    <p className="text-xs text-gray-600">{notification.content}</p>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/notifications">
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  View All Notifications
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Latest Offers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Latest Offers & Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    title: "Premium Membership Discount",
                    company: "TechLearn Academy",
                    discount: "50% OFF",
                    expires: "2 days",
                    originalPrice: "$99",
                    salePrice: "$49",
                    isHot: true,
                  },
                  {
                    title: "Free Consultation Session",
                    company: "Career Guidance Pro",
                    discount: "FREE",
                    expires: "1 week",
                    originalPrice: "$150",
                    salePrice: "Free",
                    isHot: false,
                  },
                  {
                    title: "Design Tools Bundle",
                    company: "CreativeSpace",
                    discount: "30% OFF",
                    expires: "5 days",
                    originalPrice: "$199",
                    salePrice: "$139",
                    isHot: true,
                  },
                ].map((offer, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive" className="text-xs">{offer.discount}</Badge>
                        {offer.isHot && (
                          <Badge variant="default" className="text-xs bg-orange-500">Hot</Badge>
                        )}
                      </div>
                      <span className="text-xs text-red-500 font-medium">
                        Expires in {offer.expires}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{offer.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{offer.company}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-green-600">{offer.salePrice}</span>
                        <span className="text-xs text-gray-500 line-through">{offer.originalPrice}</span>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                        Claim
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/offers">
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  View All Offers
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Platform Statistics Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platform Overview</CardTitle>
              <CardDescription>Your activity summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 border rounded">
                    <div className="text-lg font-bold text-blue-600">89%</div>
                    <div className="text-xs text-gray-600">Profile Complete</div>
                  </div>
                  <div className="text-center p-2 border rounded">
                    <div className="text-lg font-bold text-green-600">24</div>
                    <div className="text-xs text-gray-600">This Week Posts</div>
                  </div>
                  <div className="text-center p-2 border rounded">
                    <div className="text-lg font-bold text-purple-600">156</div>
                    <div className="text-xs text-gray-600">Total Connections</div>
                  </div>
                  <div className="text-center p-2 border rounded">
                    <div className="text-lg font-bold text-orange-600">7</div>
                    <div className="text-xs text-gray-600">Active Communities</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Activity</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>✅ Active in communities</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>✅ Engaged in discussions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>❌ Complete profile portfolio</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
