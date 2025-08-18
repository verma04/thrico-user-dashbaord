"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JoinRequestModal } from "./join-request-modal"

import { Globe, Lock, UserPlus, Share2, Users, MapPin, Star, MoreVertical, Heart, Flag, Shield, Share, Bookmark } from "lucide-react"
import Link from "next/link"
import type { Community } from "@/types/community"

interface CommunityHeaderProps {
  community: Community
  onJoinCommunity: (message?: string) => void
  canManageCommunity: boolean
  formattedMemberCount: string
  params: { id: string }
  isSaved?: boolean
  onToggleSave?: () => void
  onReport?: () => void
  onBlock?: () => void
  onShare?: () => void
  isJoining?: boolean
}

export function CommunityHeader({
  community,
  onJoinCommunity,
  canManageCommunity,
  formattedMemberCount,
  params,
  isSaved = false,
  onToggleSave,
  onReport,
  onBlock,
  onShare,
  isJoining = false,
}: CommunityHeaderProps) {
  const [showJoinModal, setShowJoinModal] = useState(false)

  const handleJoinClick = () => {
    if (community.isJoined) {
      // If already joined, just leave the community
      onJoinCommunity()
    } else {
      // If not joined, show the modal
      setShowJoinModal(true)
    }
  }

  const handleJoinSubmit = (message: string) => {
    onJoinCommunity(message)
    setShowJoinModal(false)
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border -mt-8 md:-mt-16 relative z-10 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 md:gap-4 mb-2">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 line-clamp-1">{community.name}</h1>
            <Badge variant={community.privacy === "Public" ? "default" : "secondary"} className="text-xs">
              {community.privacy === "Public" ? (
                <Globe className="w-2 h-2 md:w-3 md:h-3 mr-1" />
              ) : (
                <Lock className="w-2 h-2 md:w-3 md:h-3 mr-1" />
              )}
              {community.privacy}
            </Badge>
            <Link href={`/communities/${params.id}/ratings`}>
              <Badge variant="outline" className="flex items-center text-xs hover:bg-gray-100 cursor-pointer">
                <Star className="w-2 h-2 md:w-3 md:h-3 mr-1 fill-yellow-400 text-yellow-400" />
                {community.rating} ({community.totalRatings})
              </Badge>
            </Link>
          </div>

          <p className="text-sm md:text-lg text-blue-600 font-medium mb-2 hidden md:block">{community.headline}</p>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
            {community.description}
          </p>

          <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
            <span className="flex items-center">
              <Users className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {formattedMemberCount} members
            </span>
            <span className="hidden md:inline">{community.posts} posts</span>
            {community.location && (
              <span className="flex items-center">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                <span className="truncate max-w-32 md:max-w-none">{community.location}</span>
              </span>
            )}
          </div>

          {/* Member Avatars */}
          <div className="flex items-center">
            <div className="flex -space-x-1 md:-space-x-2">
              {community.memberAvatars.slice(0, 5).map((avatar, index) => (
                <Avatar key={index} className="w-6 h-6 md:w-8 md:h-8 border-2 border-white">
                  <AvatarImage src={avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">M</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="ml-2 text-xs md:text-sm text-gray-600">
              +{formattedMemberCount} members
            </span>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex gap-2 md:gap-3">
          {!community.isJoined ? (
            <Button 
              onClick={handleJoinClick} 
              size="sm" 
              className="flex-1 md:flex-none text-xs md:text-sm"
              disabled={isJoining}
            >
              {isJoining ? (
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1 md:mr-2" />
              ) : (
                <UserPlus className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              )}
              {community.joinCondition === "Admin approval required" ? "Request" : "Join"}
            </Button>
          ) : (
            <Button
              onClick={handleJoinClick}
              variant="secondary"
              size="sm"
              className="flex-1 md:flex-none text-xs md:text-sm"
              disabled={isJoining}
            >
              {isJoining ? "Leaving..." : "Joined"}
            </Button>
          )}
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Join Request Modal */}
      <JoinRequestModal
        open={showJoinModal}
        onOpenChange={setShowJoinModal}
        communityName={community.name}
        joinCondition={community.joinCondition}
        onSubmit={handleJoinSubmit}
        isLoading={isJoining}
      />
    </div>
  )
}
