import * as React from "react";

 // adjust imports as needed
import { useRouter } from "next/navigation"; // or your router
import UserAvatar from "@/components/user-avatar";
import { Separator } from "@radix-ui/react-select";


interface EventProps {
  data: any;
  type: string;
  user: any;
}

const Event = ({ data, type, user }: EventProps) => {
  const router = useRouter();

  const viewGroup = () => {
    router.push(`/events/details/${data?.id}`); // adjust path as needed
  };

  return (
    <div className="flex flex-col w-full p-3 gap-5 justify-center">
      {type !== "repost" && (
        <>
          <div className="flex flex-row items-center gap-2 h-9">
            <UserAvatar size={30} src={user?.avatar} />
            <span>
              <span className="font-bold">{user?.firstName} </span>
              posted this event
            </span>
          </div>
          <Separator />
        </>
      )}
      {/* <button
        className="flex flex-row items-center justify-center w-full gap-5 hover:bg-muted rounded transition"
        onClick={viewGroup}
        type="button"
      >
        <Details details={data} isFeatured={data?.isFeatured} item={data} />
      </button> */}
    </div>
  );
};

export default Event;
