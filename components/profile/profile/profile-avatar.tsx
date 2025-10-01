import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfilePictureModal } from "@/components/profile/profile/edit-profile-picture-modal";
import { useGetUser } from "@/components/grapqhl/action";
import UserAvatar from "@/components/user-avatar";

export function ProfileAvatar({
  profileImage,
  setProfileImage,
}: {
  profileImage: string;
  setProfileImage: (img: string) => void;
}) {
  const { data: { getUser } = {}, error, loading } = useGetUser();
  return (
    <div className="relative">
      <UserAvatar src={getUser?.avatar} size={128} className="object-cover" />

      <EditProfilePictureModal
        currentImage={getUser?.avatar || profileImage}
        onSave={setProfileImage}
      />
    </div>
  );
}
