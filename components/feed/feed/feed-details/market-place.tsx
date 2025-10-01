import React from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/user-avatar";

import { Separator } from "@/components/ui/separator";


interface MarketPlaceProps {
  data: any;
  user: any;
  type: any;
}

const MarketPlace = ({ data, user, type }: MarketPlaceProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full p-3 gap-5 justify-center">
      {type !== "repost" && (
        <>
          <div className="flex flex-row items-center gap-2 h-9">
            <UserAvatar size={30} src={user?.avatar} />
            <span>
              <span className="font-bold">{user?.firstName} </span>
              posted this listing
            </span>
          </div>
          <Separator />
        </>
      )}
      <div className="flex flex-row items-center justify-center w-full gap-5">
        <button
          type="button"
          onClick={() => router.push("/(listing)")}
          className="w-[90%] text-left"
        >
          <img
            src={`https://thrico.blr1.cdn.digitaloceanspaces.com/${data?.media[0]}`}
            alt={data?.title}
            className="h-32 w-full object-cover mb-2 rounded"
            style={{ maxHeight: 200 }}
          />

          <h2 className="font-bold " >{data?.title}</h2>
          <h4>{data?.description}</h4>
       
          <div className="text-muted-foreground w-full">
            {data?.location}, {data?.location?.state} ({data?.category})
          </div>
          <div className="flex flex-row items-center">
            <span className="text-green-600 text-sm">
              {moment(data?.createdAt).fromNow()}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MarketPlace;


