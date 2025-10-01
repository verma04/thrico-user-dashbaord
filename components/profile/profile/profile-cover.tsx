import { useGetUser } from "@/components/grapqhl/action";
import { EditCoverModal } from "@/components/profile/profile/edit-cover-modal"
import UserCover from "@/components/user-cover";
import { User } from "lucide-react";

export function ProfileCover({
  coverImage,
  setCoverImage,
}: {
  coverImage: string
  setCoverImage: (img: string) => void
}) {
  const { data: { getUser } = {}, error, loading } = useGetUser();
    
  return (
    <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg relative overflow-hidden">
      <UserCover className="w-full h-full object-cover" src={getUser?.cover}   />
      <EditCoverModal currentImage={coverImage} onSave={setCoverImage} />
    </div>
  )
}