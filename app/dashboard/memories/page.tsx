import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Plus, Heart, Calendar, Cake, Trophy, MessageCircle, Users, Bell } from "lucide-react"
import Link from "next/link"

export default function MemoriesPage() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Memories & Celebrations</h1>
          <p className="text-gray-600">
            Celebrate birthdays, anniversaries, achievements, and remember special moments
          </p>
        </div>
        <Link href="/dashboard/memories/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Memory
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search memories..." className="pl-10" />
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Birthdays
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Anniversaries
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Achievements
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Memories
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Celebrations */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <Cake className="w-5 h-5 mr-2" />
                Today's Celebrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "birthday",
                    person: "Marcus Johnson",
                    avatar: "/placeholder.svg?height=40&width=40",
                    age: 28,
                    message: "Wishing you a fantastic birthday! 🎉",
                    wishes: 23,
                  },
                  {
                    type: "work_anniversary",
                    person: "Elena Rodriguez",
                    avatar: "/placeholder.svg?height=40&width=40",
                    years: 3,
                    company: "Netflix",
                    message: "Congratulations on 3 years at Netflix! 🎊",
                    wishes: 15,
                  },
                ].map((celebration, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={celebration.avatar || "/placeholder.svg"} alt={celebration.person} />
                      <AvatarFallback>
                        {celebration.person
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{celebration.person}</h4>
                        {celebration.type === "birthday" && (
                          <Badge className="bg-pink-500 text-white">
                            <Cake className="w-3 h-3 mr-1" />
                            {celebration.age}th Birthday
                          </Badge>
                        )}
                        {celebration.type === "work_anniversary" && (
                          <Badge className="bg-blue-500 text-white">
                            <Trophy className="w-3 h-3 mr-1" />
                            {celebration.years} Years at {celebration.company}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{celebration.message}</p>
                      <div className="flex items-center space-x-4">
                        <Button size="sm">
                          <Heart className="w-4 h-4 mr-2" />
                          Send Wishes
                        </Button>
                        <span className="text-sm text-gray-500">{celebration.wishes} wishes sent</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Memories */}
          <div className="space-y-6">
            {[
              {
                id: 1,
                type: "achievement",
                title: "Sarah's Promotion to Senior Designer",
                person: "Sarah Chen",
                avatar: "/placeholder.svg?height=40&width=40",
                date: "Dec 8, 2024",
                description:
                  "Congratulations to Sarah on her well-deserved promotion to Senior Product Designer at Figma! Her dedication and creativity have been inspiring to watch.",
                image: "/placeholder.svg?height=200&width=400&text=Promotion Celebration",
                reactions: {
                  hearts: 45,
                  congratulations: 23,
                  celebrations: 12,
                },
                comments: 18,
                category: "Career Milestone",
                celebratedBy: "Team Lead",
              },
              {
                id: 2,
                type: "memorial",
                title: "Remembering John Smith - 5 Years",
                person: "John Smith",
                avatar: "/placeholder.svg?height=40&width=40",
                date: "Dec 7, 2024",
                description:
                  "Today marks 5 years since we lost our beloved community member John Smith. His contributions to open source and mentorship of new developers continue to inspire us all.",
                image: "/placeholder.svg?height=200&width=400&text=Memory",
                reactions: {
                  hearts: 89,
                  remembrance: 34,
                  support: 23,
                },
                comments: 45,
                category: "In Memory",
                celebratedBy: "Community",
              },
              {
                id: 3,
                type: "anniversary",
                title: "David & Maria's 10th Wedding Anniversary",
                person: "David Kim & Maria Santos",
                avatar: "/placeholder.svg?height=40&width=40",
                date: "Dec 6, 2024",
                description:
                  "Celebrating 10 beautiful years of marriage! Thank you for being such an inspiring couple in our community.",
                image: "/placeholder.svg?height=200&width=400&text=Anniversary",
                reactions: {
                  hearts: 67,
                  congratulations: 28,
                  celebrations: 15,
                },
                comments: 32,
                category: "Personal Milestone",
                celebratedBy: "Friends & Family",
              },
              {
                id: 4,
                type: "achievement",
                title: "Elena's PhD Graduation",
                person: "Elena Rodriguez",
                avatar: "/placeholder.svg?height=40&width=40",
                date: "Dec 5, 2024",
                description:
                  "Dr. Elena Rodriguez has officially graduated with her PhD in Data Science! Her research on machine learning applications in healthcare will make a real difference.",
                image: "/placeholder.svg?height=200&width=400&text=PhD Graduation",
                reactions: {
                  hearts: 123,
                  congratulations: 56,
                  celebrations: 34,
                },
                comments: 67,
                category: "Educational Achievement",
                celebratedBy: "Academic Community",
              },
            ].map((memorial) => (
              <Card key={memorial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={memorial.avatar || "/placeholder.svg"} alt={memorial.person} />
                      <AvatarFallback>
                        {memorial.person
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{memorial.title}</h3>
                        <Badge
                          variant={
                            memorial.type === "achievement"
                              ? "default"
                              : memorial.type === "memorial"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {memorial.category}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
                        <span>Celebrated by {memorial.celebratedBy}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {memorial.date}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">{memorial.description}</p>

                      {memorial.image && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img
                            src={memorial.image || "/placeholder.svg"}
                            alt="Memory content"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm font-medium">{memorial.reactions.hearts}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{memorial.comments}</span>
                          </button>
                          <div className="flex items-center space-x-1">
                            {memorial.type === "achievement" && (
                              <span className="text-sm text-gray-500">🎉 {memorial.reactions.celebrations}</span>
                            )}
                            {memorial.type === "memorial" && (
                              <span className="text-sm text-gray-500">🕯️ {memorial.reactions.remembrance}</span>
                            )}
                            {memorial.reactions.congratulations && (
                              <span className="text-sm text-gray-500">👏 {memorial.reactions.congratulations}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Upcoming Celebrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "birthday",
                    person: "Jennifer Walsh",
                    date: "Dec 12, 2024",
                    daysLeft: 2,
                    avatar: "/placeholder.svg?height=32&width=32",
                  },
                  {
                    type: "work_anniversary",
                    person: "Alex Thompson",
                    date: "Dec 15, 2024",
                    daysLeft: 5,
                    years: 2,
                    company: "Airbnb",
                    avatar: "/placeholder.svg?height=32&width=32",
                  },
                  {
                    type: "anniversary",
                    person: "Mike & Lisa Johnson",
                    date: "Dec 18, 2024",
                    daysLeft: 8,
                    years: 5,
                    avatar: "/placeholder.svg?height=32&width=32",
                  },
                ].map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={event.avatar || "/placeholder.svg"} alt={event.person} />
                      <AvatarFallback>
                        {event.person
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.person}</p>
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        {event.type === "birthday" && <Cake className="w-3 h-3" />}
                        {event.type === "work_anniversary" && <Trophy className="w-3 h-3" />}
                        {event.type === "anniversary" && <Heart className="w-3 h-3" />}
                        <span>
                          {event.type === "birthday" && "Birthday"}
                          {event.type === "work_anniversary" && `${event.years} years at ${event.company}`}
                          {event.type === "anniversary" && `${event.years} year anniversary`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.daysLeft} days
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Memory Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Birthdays", count: 45, icon: "🎂", color: "bg-pink-100 text-pink-700" },
                  { name: "Work Anniversaries", count: 23, icon: "🏆", color: "bg-blue-100 text-blue-700" },
                  { name: "Personal Milestones", count: 18, icon: "⭐", color: "bg-yellow-100 text-yellow-700" },
                  { name: "Achievements", count: 34, icon: "🎉", color: "bg-green-100 text-green-700" },
                  { name: "In Memory", count: 12, icon: "🕯️", color: "bg-gray-100 text-gray-700" },
                ].map((category, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow ${category.color}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "sent birthday wishes to Marcus Johnson",
                    user: "Sarah Chen",
                    time: "2 hours ago",
                    avatar: "/placeholder.svg?height=24&width=24",
                  },
                  {
                    action: "created memory for John Smith",
                    user: "Community Team",
                    time: "1 day ago",
                    avatar: "/placeholder.svg?height=24&width=24",
                  },
                  {
                    action: "congratulated Elena on PhD graduation",
                    user: "David Kim",
                    time: "2 days ago",
                    avatar: "/placeholder.svg?height=24&width=24",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/dashboard/memories/create">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Memory
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bell className="w-4 h-4 mr-2" />
                  Set Reminders
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Community Memories
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
