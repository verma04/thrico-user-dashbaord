import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GET_USER } from "./grapqhl/queries";
import { useGetUser } from "./grapqhl/action";

interface UserAvatarProps {
  src?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const UserCover: React.FC<UserAvatarProps> = ({
  src,
  size = 32,
  className,
  onClick,
}) => {
  const { data } = useGetUser();

  const coverImage = src
    ? `https://cdn.thrico.network/${src}`
    : `https://cdn.thrico.network/${data?.getUser?.cover}`;

  return (
    <img
      src={coverImage || "/placeholder.svg"}
      alt="Cover Photo"
      className="w-full h-full object-cover"
    />
  );
};

export default UserCover;
