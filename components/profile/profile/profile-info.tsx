import React, { useState } from "react"
import { useGetUser } from '@/components/grapqhl/action'

import { ProfileMeta } from "./profile-meta"
import { EditProfileModal } from "./edit-profile-modal"

export function ProfileInfo({
  connectionAvatars,
}: {
  connectionAvatars: string[]
}) {
  const { data: { getUser } = {}, error, loading } = useGetUser();

  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState(getUser?.firstName || "")
  const [lastName, setLastName] = useState(getUser?.lastName || "")
  const [headline, setHeadline] = useState(getUser?.about?.headline || "")

  React.useEffect(() => {
    setFirstName(getUser?.firstName || "")
    setLastName(getUser?.lastName || "")
    setHeadline(getUser?.about?.headline || "")
  }, [getUser])

  const handleSave = () => {
    // Call your update mutation here
    setOpen(false)
  }

  return (
    <div className="mt-4 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{firstName} {lastName}</h1>
          <p className="text-xl text-gray-600">{headline}</p>
        </div>
        <EditProfileModal
          open={open}
          setOpen={setOpen}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          headline={headline}
          setHeadline={setHeadline}
          onSave={handleSave}
        />
      </div>
      <ProfileMeta
        location={getUser?.location?.name}
        connectionAvatars={connectionAvatars}
      />
    </div>
  )
}