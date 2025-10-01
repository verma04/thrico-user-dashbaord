import React from "react";
import moment from "moment";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { useGetOrgDetails } from "@/components/grapqhl/action";
import UserAvatar from "@/components/user-avatar";


interface JobProps {
  data: any;
  user: any;
  type: string;
  addedBy: "ENTITY" | "USER";
}

const Job = ({ data, user, type, addedBy }: JobProps) => {
  const { data: org } = useGetOrgDetails();
  const router = useRouter();

  return (
    <div className="flex flex-col w-full p-3 gap-5 justify-center">
      {type !== "repost" && (
        <>
          <div className="flex flex-row items-center gap-2 h-9">
            <UserAvatar
              src={addedBy === "USER" ? user?.avatar : org?.getOrgDetails?.logo}
              isOnline={user?.isOnline}
              size={50}
            />
            <span>
              <span className="font-bold">
                {addedBy === "USER"
                  ? user?.firstName
                  : org?.getOrgDetails?.name}{" "}
              </span>
              posted this job
            </span>
          </div>
          <Separator />
        </>
      )}

      <div
        className="flex flex-row items-center w-full gap-5 hover:bg-muted rounded transition cursor-pointer"
        onClick={() => router.push("/(jobs)")}
      >
        <UserAvatar src={data?.company?.logo} size={50} />
        <div className="w-[90%]">
          <div className="font-bold w-full">{data?.title}</div>
          <div className="text-muted-foreground w-full">{data?.company?.name}</div>
          <div className="text-muted-foreground w-full">
            {data?.location?.name}, {data?.location?.state}, ({data?.workplaceType})
          </div>
          <div className="flex flex-row items-center">
            <span className="text-green-600 text-sm">
              {moment(data?.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
