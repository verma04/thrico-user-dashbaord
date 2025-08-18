"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { RatingComponent } from "@/components/community-page/rating-component"
import type { Admin, SuggestedCommunity } from "@/types/community"

interface Community {
  posts: number
  rating: number
  admins: Admin[]
}

interface CommunitySidebarProps {
  community: Community
  params: { id: string }
  onRatingSubmit: (rating: number, review?: string) => void
}

export function CommunitySidebar({ community, params, onRatingSubmit }: CommunitySidebarProps) {
  const suggestedCommunities: SuggestedCommunity[] = [
    { name: "Street Photography", members: "8.5K", rating: 4.7 },
    { name: "Portrait Masters", members: "12.1K", rating: 4.9 },
    { name: "Nature Photography", members: "15.3K", rating: 4.6 },
  ]

  return (
    <div className="space-y-6 hidden lg:block">
      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Community Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Posts</span>
              <span className="font-semibold">{community.posts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Posts Today</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Members</span>
              <span className="font-semibold">+23 this week</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Community Rating</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-semibold">{community.rating}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Rating */}
      <RatingComponent
        communityId={params.id}
        onRatingSubmit={onRatingSubmit}
        showReviews={false}
        compact={true}
      />

      {/* Admins */}
      <Card>
        <CardHeader>
          <CardTitle>Community Admins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {community.admins.map((admin) => (
              <div key={admin.id} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={admin.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{admin.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{admin.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {admin.role}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Communities */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Communities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestedCommunities.map((suggestedCommunity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">{suggestedCommunity.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-600">{suggestedCommunity.members} members</p>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600 ml-1">{suggestedCommunity.rating}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
