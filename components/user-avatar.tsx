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

const UserAvatar: React.FC<UserAvatarProps> = ({ src, size = 32, className, onClick }) => {
  const { data } = useGetUser()

  const avatar = src
    ? `https://cdn.thrico.network/${src}`
    : `https://cdn.thrico.network/${data?.getUser?.avatar}`;

  return (
    <Avatar
      className={className}
      style={{ width: size, height: size, cursor: onClick ? "pointer" : undefined }}
      onClick={onClick}
    >
      <AvatarImage src={avatar} alt="User avatar" />
      <AvatarFallback>
        {data?.getUser?.firstName?.[0]?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
