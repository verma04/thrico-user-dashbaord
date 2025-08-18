"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditProfilePictureModal } from "@/components/profile/profile/edit-profile-picture-modal"
import { EditCoverModal } from "@/components/profile/profile/edit-cover-modal"
import { MapPin, Calendar, Users } from 'lucide-react'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [coverImage, setCoverImage] = useState("/placeholder.svg?height=192&width=1024")
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=128&width=128")

  // Placeholder data for gamification
  const connectionAvatars = [
    "/placeholder.svg?height=24&width=24",
    "/placeholder.svg?height=24&width=24",
    "/placeholder.svg?height=24&width=24",
  ]

  return (
    <div className="p-6">
      {/* Profile Header - This will be consistent across all profile pages */}
      <div className="relative mb-8">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg relative overflow-hidden">
          <img src={coverImage || "/placeholder.svg"} alt="Cover Photo" className="w-full h-full object-cover" />
          <EditCoverModal currentImage={coverImage} onSave={setCoverImage} />
        </div>

        {/* Profile Info */}
        <div className="relative -mt-20 px-6 z-10">
          <div className="flex flex-col items-start">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={profileImage || "/placeholder.svg"} alt="Sarah Chen" />
                <AvatarFallback className="text-2xl">SC</AvatarFallback>
              </Avatar>
              <EditProfilePictureModal currentImage={profileImage} onSave={setProfileImage} />
            </div>

            {/* Name, Designation, Location, Joined, Connections */}
            <div className="mt-4 w-full">
              <h1 className="text-3xl font-bold text-gray-900">Sarah Chen</h1>
              <p className="text-xl text-gray-600">Senior Product Designer</p>
              <div className="flex items-center space-x-4 mt-2 text-gray-500">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  San Francisco, CA
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined March 2023
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <div className="flex -space-x-2 overflow-hidden mr-1">
                    {connectionAvatars.map((src, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-white">
                        <AvatarImage src={src || "/placeholder.svg"} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  {'1,234 connections'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* This will render the page content (tabs, etc.) */}
      {children}
    </div>
  )
}
