import React, { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

import MarketPlace from "./market-place";
import Repost from "./re-post";
import Polls from "./poll";
import Story from "./story";
import Event from "./event";
import Description from "./description";
import Offer from "./offer";
import Job from "./job";

import { BadgeCheck, Earth } from "lucide-react";
import { useGetOrgDetails } from "@/components/grapqhl/action";
import UserAvatar from "@/components/user-avatar";
import Media from "../media";
import Celebration from "./celebration";
import Forum from "./forum";

interface User {
  firstName: string;
  lastName: string;
  avatar: string;
  isOnline: boolean;
  id: string;
  about: {
    currentPosition: string;
    headline?: string;
  };
}

interface Item {
  addedBy: "ENTITY" | "USER";
  user: User;
  source: string;
  job?: any;
  story?: any;
  event?: any;
  repostId?: string;
  marketPlace?: any;
  group?: {
    cover: string;
    title: string;
  };
  description?: string;
  media?: any;
  createdAt: string;
  privacy: string;
  id: string;
  poll: {
    id: string;
    title: string;
  };
  offer?: {
    id: string;
  };
  celebration?: any;
  forum?: any;
}

interface FeedInfoProps {
  item: Item;
  type: string;
}

const FeedInfo: React.FC<FeedInfoProps> = ({ item, type }) => {
  const { data } = useGetOrgDetails();
  const router = useRouter();

  const fullName = useMemo(
    () => `${item?.user?.firstName} ${item?.user?.lastName}`,
    [item?.user]
  );

  const viewUserProfile = useCallback(() => {
    router.push(
      `/profile/${item?.user?.id}?firstName=${item?.user?.firstName}&lastName=${
        item?.user?.lastName
      }&avatar=${item?.user?.avatar}&currentPosition=${
        item?.user?.about?.headline
      }&isOnline=${item?.user?.isOnline ? "true" : "false"}`
    );
  }, [item?.user, router]);

  const GroupHeader: React.FC = () => (
    <div className="flex flex-row w-[90%] p-2 gap-5 mt-2 items-start">
      <div className="relative">
        <UserAvatar
          size={50}
          url={item?.group?.cover || ""}
          user={item?.user}
          isOnline={item?.user?.isOnline}
        />
        <img
          className="absolute right-[-10px] top-[30px] rounded-full border-2 border-white"
          width={30}
          height={30}
          src={
            item?.user?.avatar
              ? `https://cdn.thrico.network/${item?.user?.avatar}`
              : undefined
          }
          alt="User"
        />
      </div>
      <div className="flex-1">
        {item?.group?.title && (
          <div className="font-bold truncate">{item.group.title}</div>
        )}
        <button
          type="button"
          className="text-muted-foreground hover:underline truncate"
          onClick={viewUserProfile}
        >
          {fullName}
        </button>
        <div className="flex flex-row items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground font-sans">
            {moment(item?.createdAt).fromNow()}
          </span>
          <Earth className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );

  const UserDetailsHeader: React.FC = () => (
    <div className="flex flex-row w-full p-3 gap-5 items-start">
      <UserAvatar
        user={item?.user}
        url={
          item?.addedBy === "USER"
            ? item?.user?.avatar
            : data?.getOrgDetails?.logo
        }
        isOnline={item?.user?.isOnline}
        size={50}
      />
      <div className="flex-1">
        <button
          type="button"
          className="flex flex-row items-center gap-2 font-bold truncate hover:underline"
          onClick={viewUserProfile}
        >
          {item?.addedBy === "USER" ? fullName : data?.getOrgDetails?.name}
          {item?.addedBy !== "USER" && (
            <BadgeCheck className="w-4 h-4 text-primary" />
          )}
        </button>
        <div className="text-muted-foreground truncate">
          {item?.addedBy === "USER" ? item?.user?.about?.headline : "Admin"}
        </div>
        <div className="flex flex-row items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground font-sans">
            {moment(item?.createdAt).fromNow()}
          </span>
          <Earth className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );

  const renderHeader = () => {
    switch (item?.source) {
      case "group":
        return <GroupHeader />;
      case "dashboard":
      case "poll":
      case "forum":
      case "celebration":
        return <UserDetailsHeader />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (item?.source) {
      case "jobs":
        return <Job type={type} data={item?.job} user={item?.user} />;
      case "story":
        return <Story type={type} data={item?.story} user={item?.user} />;
      case "event":
        return <Event type={type} data={item?.event} user={item?.user} />;
      case "rePost":
        return (
          <Repost
            id={item?.repostId ?? ""}
            details={{ description: item?.description ?? "" }}
            user={item?.user}
          />
        );
      case "celebration":
        return <Celebration celebration={item?.celebration} />;
      case "forum":
        return <Forum forum={item?.forum} />;
      case "marketPlace":
        return (
          <MarketPlace type={type} data={item?.marketPlace} user={item?.user} />
        );
      case "dashboard":
      case "group":
        return (
          <>
            <div className="flex p-3 flex-row justify-between items-center gap-2 cursor-pointer">
              <Description text={item?.description} />
            </div>
            <Media media={item?.media} />
          </>
        );
      case "poll":
        return <Polls id={item?.poll?.id} />;
      case "offer":
        return <Offer id={item?.offer?.id} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};

export default FeedInfo;
