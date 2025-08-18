"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, Eye, Globe, Heart, MessageSquare, MoreHorizontal, Star, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Community {
  id: string
  title: string
  description: string
  creator: {
    name: string
    avatar: string
  }
  createdAt: string
  memberCount: number
  postCount: number
  viewCount: number
  members: Array<{ avatar: string; name: string }>
  cover: string
  category: string
  isJoined: boolean
  isTrending?: boolean
  isFeatured?: boolean
  isCreatedByMe?: boolean
  privacy: "public" | "private"
  features: string[]
  location?: string
}

interface CommunityCardProps {
  community: Community
}

export function CommunityCard({ community }: CommunityCardProps) {
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <Card className="w-full min-w-[300px] max-w-md rounded-xl overflow-hidden shadow transition-transform transform hover:scale-105 hover:shadow-xl">
      <CardHeader className="relative h-48"> {/* Reduced height */}
        <Link href={`/dashboard/communities/${community.id}`}>
          <Image
            src={"https://cdn.thrico.network/defaultEventCover.png"}
            alt={community.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
            quality={100}
          />
        </Link>
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          {community.privacy === "public" && (
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-gray-700" />
            </Button>
          )}
          {community.isFeatured && (
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <Star className="w-4 h-4 text-gray-700" />
            </Button>
          )}
          {community.isTrending && (
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-gray-700" />
            </Button>
          )}
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
            <MoreHorizontal className="w-4 h-4 text-gray-700" />
          </Button>
        </div>

            <div className="absolute top-3 left-3 flex items-center space-x-2">
         <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-gray-700" />
          </Button>
            </div>
      </CardHeader>

      <CardContent className="p-4 space-y-2"> {/* Reduced padding & spacing */}
        <Link href={`/dashboard/communities/${community.id}`}>
          <h2 className="text-xl font-bold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer truncate">
            {community.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{community.description}</p>

  <p className="text-gray-500 text-sm   italic tracking-wide">{community.category}</p>

        <div className="space-y-1.5"> {/* Reduced vertical spacing */}
          <div className="flex items-center space-x-2">
            <Avatar className="w-7 h-7">
              <AvatarImage src={community.creator.avatar || "/placeholder.svg"} alt={community.creator.name} />
              <AvatarFallback>
                {community.creator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <p className="text-xs text-gray-700">
              Created by <span className="text-blue-600 font-medium">{community.creator.name}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <p className="text-xs text-gray-700">Created on {community.createdAt}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2"> {/* Tighter spacing */}
          <div className="flex -space-x-2 overflow-hidden">
            {community.members.slice(0, 4).map((member, index) => (
              <Avatar key={index} className="w-9 h-9 border-2 border-white">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={`Member ${index + 1}`} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            {community.memberCount > 4 && (
              <div className="w-9 h-9 bg-blue-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white z-10">
                +{formatCount(community.memberCount - 4)}
              </div>
            )}
          </div>
          <Button
            className={`px-4 py-2 text-sm font-semibold rounded-md shadow-md ${
              community.isJoined
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={(e) => {
              e.preventDefault()
              // Handle join/leave logic here
            }}
          >
            {community.isJoined ? "View" : "Join"}
          </Button>
        </div>
      </CardContent>

      <CardFooter className="p-0 border-t border-gray-200 divide-x divide-gray-200">
        <div className="flex-1 flex items-center justify-center py-2 space-x-1.5">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-800">{formatCount(community.memberCount)}</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-2 space-x-1.5">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-800">{formatCount(community.postCount)}</span>
        </div>
        <div className="flex-1 flex items-center justify-center py-2 space-x-1.5">
          <Eye className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-800">{formatCount(community.viewCount)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
