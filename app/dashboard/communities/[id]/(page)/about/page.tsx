"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MobileBottomNav, MobileHeader } from "@/components/community-page/mobile-nav"
import { ArrowLeft, Users, Globe, Lock, MapPin, Calendar, Star, Settings, Flag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface CommunityAboutPageProps {
  params: { id: string }
}

const communityInfo = {
  name: "Photography Enthusiasts",
  headline: "Capture the world through your lens",
  description:
    "A community for photographers of all levels to share their work, get feedback, and learn from each other. Whether you're just starting out or you're a seasoned professional, everyone is welcome here! Our community focuses on creativity, learning, and mutual support.",
  privacy: "Public",
  location: "Global",
  created: "January 15, 2024",
  categories: ["Arts & Photography", "Creative"],
  tags: ["photography", "camera", "editing", "portraits", "landscape", "street photography"],
  joinCondition: "Anyone can join",
  members: 12543,
  posts: 1234,
  rating: 4.8,
  rules: [
    {
      title: "Be respectful and constructive",
      description: "Always provide constructive feedback and maintain a respectful tone in all interactions."
    },
    {
      title: "Original content only",
      description: "Only post your own original work. Sharing others' work without permission is not allowed."
    },
    {
      title: "No spam or promotional content",
      description: "Avoid excessive self-promotion and keep content relevant to photography."
    },
    {
      title: "Keep discussions photography-related",
      description: "All posts and discussions should be related to photography, cameras, or the creative process."
    },
    {
      title: "No inappropriate content",
      description: "Content should be suitable for all audiences. NSFW content is not permitted."
    }
  ],
  admins: [
    { 
      id: 1, 
      name: "John Doe", 
      avatar: "/placeholder.svg?height=40&width=40", 
      role: "Admin",
      bio: "Professional photographer with 15+ years of experience. Specializes in portrait and wedding photography."
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      avatar: "/placeholder.svg?height=40&width=40", 
      role: "Co-Admin",
      bio: "Landscape photographer and photo editing expert. Runs photography workshops worldwide."
    },
  ],
  guidelines: [
    "Use descriptive titles for your posts",
    "Include camera settings when sharing photos",
    "Be open to feedback and learning",
    "Help newcomers feel welcome",
    "Participate in community challenges and events"
  ]
}

export default function CommunityAboutPage({ params }: CommunityAboutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader
        title="About Community"
        showBack={true}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20 md:pb-8">
     

        {/* Community Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{communityInfo.name}</CardTitle>
              <Badge variant={communityInfo.privacy === "Public" ? "default" : "secondary"}>
                {communityInfo.privacy === "Public" ? (
                  <Globe className="w-3 h-3 mr-1" />
                ) : (
                  <Lock className="w-3 h-3 mr-1" />
                )}
                {communityInfo.privacy}
              </Badge>
            </div>
            <p className="text-blue-600 font-medium">{communityInfo.headline}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{communityInfo.description}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 mr-1 text-gray-600" />
                  <span className="font-semibold">{communityInfo.members.toLocaleString()}</span>
                </div>
                <span className="text-sm text-gray-600">Members</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="font-semibold">{communityInfo.posts}</span>
                </div>
                <span className="text-sm text-gray-600">Posts</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                  <span className="font-semibold">{communityInfo.rating}</span>
                </div>
                <span className="text-sm text-gray-600">Rating</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Calendar className="w-4 h-4 mr-1 text-gray-600" />
                  <span className="font-semibold text-sm">Jan 2024</span>
                </div>
                <span className="text-sm text-gray-600">Created</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Community Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {communityInfo.location}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Join Condition</h4>
                <p className="text-gray-600">{communityInfo.joinCondition}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Created</h4>
                <p className="text-gray-600">{communityInfo.created}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Privacy</h4>
                <p className="text-gray-600">{communityInfo.privacy} community</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {communityInfo.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {communityInfo.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Rules */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Community Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityInfo.rules.map((rule, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold mb-1">{index + 1}. {rule.title}</h4>
                  <p className="text-gray-600 text-sm">{rule.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Guidelines */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {communityInfo.guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{guideline}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Community Admins */}
        <Card>
          <CardHeader>
            <CardTitle>Community Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityInfo.admins.map((admin) => (
                <div key={admin.id} className="flex gap-4 p-4 border rounded-lg">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={admin.avatar} />
                    <AvatarFallback>{admin.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{admin.name}</h4>
                      <Badge variant="outline">{admin.role}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{admin.bio}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
