import { ProfileAvatar } from "./profile-avatar"
import { ProfileCover } from "./profile-cover"

import { ProfileInfo } from "./profile-info"

export function ProfileHeader({
  coverImage,
  setCoverImage,
  profileImage,
  setProfileImage,
  connectionAvatars,
}: {
  coverImage: string
  setCoverImage: (img: string) => void
  profileImage: string
  setProfileImage: (img: string) => void
  connectionAvatars: string[]
}) {
  return (
    <div className="relative  mb-8">
      <ProfileCover coverImage={coverImage} setCoverImage={setCoverImage} />
      <div className="relative -mt-20 px-6 z-10">
        <div className="flex flex-col items-start">
          <ProfileAvatar profileImage={profileImage} setProfileImage={setProfileImage} />
          <ProfileInfo connectionAvatars={connectionAvatars} />
        </div>
      </div>
    </div>
  )
}