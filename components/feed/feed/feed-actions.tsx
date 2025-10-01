import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import ReactionButton from "./feed-details/reactions";
import { wishListFeed } from "@/components/grapqhl/action/feed";
import { useGetOrgDetails } from "@/components/grapqhl/action";
import ReShare from "./re-share";

const FeedActions = ({ item, wishlistUpdate, likeUpdate, type }: any) => {
  const { data } = useGetOrgDetails();
  const [value, setValue] = React.useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setValue(item);
  }, [item]);

  return (
    <div className=" w-full p-3">
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-row items-center gap-1">
          <Heart size={16} className="text-primary" />
          <span className="ml-2 text-muted-foreground">
            {value?.totalReactions}
          </span>
        </div>
        <span className="text-muted-foreground">
          {value?.totalComment} Comments • {value?.totalReShare} Reposts
        </span>
      </div>

      <Separator className="my-2" />

      <div className="flex flex-row justify-between ">
        <ReactionButton value={value} item={item} likeUpdate={likeUpdate} />
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-muted-foreground"
          onClick={() =>
            type !== "content" &&
            router.push(
              `/feed/view/${item?.id}?fullName=${
                item?.addedBy === "USER"
                  ? item?.user.firstName + item?.user.lastName
                  : data?.getOrgDetails?.name
              }&avatar=${
                item?.addedBy === "USER"
                  ? item?.user?.avatar
                  : data?.getOrgDetails?.log
              }`
            )
          }
        >
          <MessageCircle size={20} className="text-muted-foreground" />
          Comment
        </Button>
        {item?.source !== "rePost" && (
          <ReShare item={item} total={value?.totalReShare} />
        )}
      </div>
    </div>
  );
};

export default FeedActions;
