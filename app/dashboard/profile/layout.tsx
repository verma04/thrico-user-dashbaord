"use client";

import { useState } from "react";
import { ProfileHeader } from "@/components/profile/profile/profile-header";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileTabs } from "@/components/profile/ProfileTabs";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coverImage, setCoverImage] = useState(
    "/placeholder.svg?height=192&width=1024"
  );
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=128&width=128"
  );

  // Placeholder data for gamification
  const connectionAvatars = [
    "/placeholder.svg?height=24&width=24",
    "/placeholder.svg?height=24&width=24",
    "/placeholder.svg?height=24&width=24",
  ];

  const userRank = "Diamond III";

  return (
    <div className="">
      <ProfileHeader
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        connectionAvatars={connectionAvatars}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileTabs />
          {children}
        </div>
        <ProfileSidebar userRank={userRank} />
      </div>
    </div>
  );
}
