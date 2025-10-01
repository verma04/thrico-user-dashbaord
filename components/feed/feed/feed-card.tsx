import { Card } from "@/components/ui/card";
import FeedActions from "./feed-actions";
import FeedInfo from "./feed-details/feed-Info";
import FeedDropdown from "./feed-details/feed-dropdown";
import { checkValueLikes, checkValueWishList } from "@/hooks/feed";
import {
  GET_COMMUNITIES_FEED,
  GET_FEED,
  GET_JOB_FEED,
  GET_MARKETPLACE_FEED,
  GET_MY_FEED,
} from "@/components/grapqhl/queries/feed";
import { useApolloClient } from "@apollo/client/react";

interface FeedProps {
  item: any;
}

const Feed: React.FC<FeedProps> = ({ item }) => {
  const client = useApolloClient();

  const wishlistUpdate = async () => {
    try {
      const queries = [
        { query: GET_FEED, key: "getFeed" },
        { query: GET_JOB_FEED, key: "getJobFeed" },
        { query: GET_COMMUNITIES_FEED, key: "getCommunitiesFeed" },
        { query: GET_MARKETPLACE_FEED, key: "getMarketPlaceFeed" },
      ];

      for (const { query, key } of queries) {
        const data = client.readQuery({ query });
        if (data && data[key]) {
          const updated = await checkValueWishList(data[key], item);
          client.writeQuery({
            query,
            data: { [key]: updated },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likeUpdate = async () => {
    try {
      const feedVars = { input: { offset: 0, limit: 4 } };
      const myFeedVars = { input: { offset: 0, limit: 2 } };

      const { getFeed } =
        client.readQuery({ query: GET_FEED, variables: feedVars }) || {};
      const { getMyFeed } =
        client.readQuery({ query: GET_MY_FEED, variables: myFeedVars }) || {};

      console.log("getMyFeed", getMyFeed);

      const updatedFeed = await checkValueLikes(getFeed, item);

      const updatedMyFeed = await checkValueLikes(getMyFeed, item);

      client.writeQuery({
        query: GET_FEED,
        data: { getFeed: updatedFeed },
        variables: feedVars,
      });
      client.writeQuery({
        query: GET_MY_FEED,
        data: { getMyFeed: updatedMyFeed },
        variables: myFeedVars,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="relative w-full pt-0 pb-0">
      <div className="flex flex-col gap-2">
        <FeedInfo
          item={item}
          likeUpdate={likeUpdate}
          wishlistUpdate={wishlistUpdate}
        />
        <FeedActions
          item={item}
          likeUpdate={likeUpdate}
          wishlistUpdate={wishlistUpdate}
        />
      </div>
      <div className="absolute right-1 top-5 flex flex-row items-center">
        <FeedDropdown />
      </div>
    </Card>
  );
};

export default Feed;
