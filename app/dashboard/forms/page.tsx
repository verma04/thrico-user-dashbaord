import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Plus, FileText, Users, Edit, Eye, Download, Share2, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function FormsPage() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600">Create and manage registration forms, applications, and data collection</p>
        </div>
        <Link href="/dashboard/forms/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Form
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search forms..." className="pl-10" />
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Active
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Draft
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Closed
          </Badge>
        </div>
      </div>

      {/* My Forms */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">My Forms</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Event Registration Form",
              description: "Registration for Tech Networking Mixer 2024",
              status: "active",
              submissions: 89,
              views: 234,
              createdDate: "Dec 1, 2024",
              deadline: "Dec 20, 2024",
              fields: 8,
              category: "Event Registration",
              isRequired: true,
            },
            {
              title: "Mentorship Application",
              description: "Application form for our mentorship program",
              status: "active",
              submissions: 45,
              views: 156,
              createdDate: "Nov 15, 2024",
              deadline: "Jan 15, 2025",
              fields: 12,
              category: "Application",
              isRequired: false,
            },
            {
              title: "Community Feedback Form",
              description: "Collect feedback on community improvements",
              status: "closed",
              submissions: 123,
              views: 345,
              createdDate: "Oct 1, 2024",
              deadline: "Nov 30, 2024",
              fields: 6,
              category: "Feedback",
              isRequired: false,
            },
          ].map((form, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{form.title}</CardTitle>
                      <Badge
                        variant={
                          form.status === "active" ? "default" : form.status === "closed" ? "secondary" : "outline"
                        }
                      >
                        {form.status}
                      </Badge>
                      {form.isRequired && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{form.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{form.submissions}</div>
                      <div className="text-sm text-blue-600">Submissions</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{form.views}</div>
                      <div className="text-sm text-green-600">Views</div>
                    </div>
                  </div>

                  {/* Form Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Fields:</span>
                      <span>{form.fields}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Created:</span>
                      <span>{form.createdDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deadline:</span>
                      <span>{form.deadline}</span>
                    </div>
                  </div>

                  <Badge variant="outline">{form.category}</Badge>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Forms */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Available Forms</h2>
        <div className="space-y-4">
          {[
            {
              title: "Speaker Application - Tech Conference 2024",
              author: "Community Team",
              authorAvatar: "/placeholder.svg?height=32&width=32",
              description: "Apply to speak at our annual tech conference",
              deadline: "Jan 31, 2025",
              submissions: 67,
              estimatedTime: "10 minutes",
              category: "Application",
              priority: "high",
              requirements: ["Portfolio", "Speaking experience", "Topic proposal"],
            },
            {
              title: "Volunteer Registration",
              author: "Elena Rodriguez",
              authorAvatar: "/placeholder.svg?height=32&width=32",
              description: "Sign up to volunteer at community events",
              deadline: "Ongoing",
              submissions: 234,
              estimatedTime: "5 minutes",
              category: "Registration",
              priority: "medium",
              requirements: ["Background check", "Availability"],
            },
            {
              title: "Startup Pitch Competition Entry",
              author: "Marcus Johnson",
              authorAvatar: "/placeholder.svg?height=32&width=32",
              description: "Submit your startup for our pitch competition",
              deadline: "Dec 25, 2024",
              submissions: 23,
              estimatedTime: "15 minutes",
              category: "Competition",
              priority: "high",
              requirements: ["Business plan", "Pitch deck", "Team info"],
            },
          ].map((form, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={form.authorAvatar || "/placeholder.svg"} alt={form.author} />
                    <AvatarFallback>
                      {form.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{form.title}</h3>
                          {form.priority === "high" && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              High Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">by {form.author}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{form.category}</Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {form.deadline}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{form.description}</p>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {form.requirements.map((req, reqIndex) => (
                          <Badge key={reqIndex} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Form Info */}
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />~{form.estimatedTime}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {form.submissions} submissions
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {form.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button>Fill Form</Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Form Templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Form Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Event Registration",
              description: "Standard event registration form",
              icon: "🎪",
              fields: 8,
              category: "Events",
            },
            {
              name: "Job Application",
              description: "Complete job application form",
              icon: "💼",
              fields: 15,
              category: "HR",
            },
            {
              name: "Feedback Survey",
              description: "Collect user feedback",
              icon: "📝",
              fields: 6,
              category: "Feedback",
            },
            {
              name: "Contact Form",
              description: "Simple contact information form",
              icon: "📞",
              fields: 4,
              category: "Contact",
            },
            {
              name: "Membership Application",
              description: "Community membership form",
              icon: "👥",
              fields: 10,
              category: "Membership",
            },
            {
              name: "Workshop Registration",
              description: "Workshop and training signup",
              icon: "🎓",
              fields: 7,
              category: "Education",
            },
            {
              name: "Vendor Application",
              description: "Vendor partnership form",
              icon: "🤝",
              fields: 12,
              category: "Business",
            },
            {
              name: "Bug Report",
              description: "Technical issue reporting",
              icon: "🐛",
              fields: 9,
              category: "Support",
            },
          ].map((template, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="text-3xl mb-3">{template.icon}</div>
                <h3 className="font-semibold text-sm mb-2">{template.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {template.fields} fields
                  </Badge>
                  <Badge variant="secondary" className="text-xs block">
                    {template.category}
                  </Badge>
                </div>
                <Button size="sm" className="w-full mt-3">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
