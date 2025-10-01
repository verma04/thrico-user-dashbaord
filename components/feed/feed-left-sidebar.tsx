"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MapPin, 
  Edit,
  Camera,
  Star,
  Award,
  Calendar,
  Users,
  MessageCircle,
  Eye,
  TrendingUp,
  User
} from "lucide-react"

// Import the user data
import { currentUser, feedStats } from "@/lib/user-data"
import { useGetUser } from "../grapqhl/action"
import UserAvatar from "../user-avatar"
import UserCover from "../user-cover"
import { get } from "http"

export function FeedLeftSidebar() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online'
      case 'away': return 'Away'
      case 'busy': return 'Busy'
      default: return 'Offline'
    }
  }

  // Quick profile stats
  const quickStats = [
    { label: "Posts", value: currentUser.posts, icon: MessageCircle },
    { label: "Views", value: `${(feedStats.viewsThisWeek / 1000).toFixed(1)}K`, icon: Eye },
    { label: "Growth", value: "+5.2%", icon: TrendingUp },
  ]
  const { data: { getUser } = {}, error, loading } = useGetUser();
  return (
    <div className="w-full h-fit sticky top-4">
      {/* User Profile Card */}
      <Card className="overflow-hidden pt-0">
        <CardContent className="p-0">
          {/* Cover Image */}
          <div className="relative h-24 bg-gradient-to-r from-blue-500 to-purple-600">
           <UserCover/>
          </div>
          
          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-12 mb-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <UserAvatar size={85} />
              </Avatar>
              
              {/* Status Indicator */}
              <div className={`absolute bottom-2 right-2 h-6 w-6 ${getStatusColor(currentUser.status)} rounded-full border-3 border-white shadow-sm`}>
                <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
              </div>
              
              {/* Verified Badge */}
              {currentUser.verified && (
                <div className="absolute -bottom-1 -right-1">
                  <Badge variant="secondary" className="h-6 w-6 p-0 rounded-full bg-blue-500 border-2 border-white">
                    <Star className="h-3 w-3 text-white" />
                  </Badge>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
                    {getUser?.firstName} {getUser?.lastName}
                  </h2>
                  <p className="text-sm text-gray-600">{getUser?.about?.headline}</p>
                </div>
               
              </div>
              
              <div className="space-y-1">
                <p className="text-base font-medium text-gray-900">{getUser?.about?.headline}</p>
                <p className="text-sm text-gray-600"></p>

                {/* Location and Status */}
                <div className="flex items-center gap-4 text-sm text-gray-500 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{getUser?.location?.name}</span>
                  </div>
              
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-600 pt-2 leading-relaxed">
                {getUser?.about?.headline}
              </p>

              {/* Achievements */}
              <div className="flex flex-wrap gap-2 pt-3">
                {currentUser.achievements.slice(0, 2).map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    <Award className="h-3 w-3 mr-1" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{currentUser.posts}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{currentUser.followers.toLocaleString()}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{currentUser.following}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Following</p>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Quick Stats */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">This Week</h3>
              {quickStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
                  </div>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="outline" size="sm" className="w-full">
                View Profile
              </Button>
              <Button size="sm" className="w-full">
                Edit Profile
              </Button>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-4">
              <Calendar className="h-3 w-3" />
              <span>Joined {currentUser.joinedDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
