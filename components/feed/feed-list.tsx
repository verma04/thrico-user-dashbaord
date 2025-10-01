import React, { useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getFeed } from "../grapqhl/action/feed"; // Adjust path if needed
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  CheckCircle,
  Bookmark,
  Pencil,
  Trash2,
  Flag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Feed from "./feed/feed-card";

const LIMIT = 4;

interface FeedListProps {
  activeTab?: string;
}

const FeedList = ({ activeTab = "discover" }: FeedListProps) => {
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, fetchMore, refetch } = getFeed({
    variables: {
      input: {
        offset,
        limit: LIMIT,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  // Infinite scroll trigger
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Load more when inView
  React.useEffect(() => {
    if (inView && hasMore && !loading && data?.getFeed?.length >= LIMIT) {
      fetchMore({
        variables: {
          input: {
            offset: data.getFeed.length,
            limit: LIMIT,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.getFeed.length === 0) {
            setHasMore(false);
            return prev;
          }
          return {
            ...prev,
            getFeed: [...prev.getFeed, ...fetchMoreResult.getFeed],
          };
        },
      });
    }
  }, [inView, hasMore, loading, data, fetchMore]);

  // Refresh handler

  // Like, bookmark, delete, etc. handlers would use mutations here

  const posts = data?.getFeed || [];

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post: any) => {
    switch (activeTab) {
      case "communities":
        return post.category === "Community" || post.postType === "discussion";
      case "events":
        return post.category === "Event" || post.postType === "event";
      case "listings":
        return (
          post.category === "Marketplace" ||
          post.postType === "job" ||
          post.postType === "listing"
        );
      case "discover":
      default:
        return true;
    }
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-end mb-2"></div>
      {filteredPosts.length === 0 && !loading ? (
        <Card className="p-8 text-center">
          <CardContent>
            <div className="text-gray-500">
              <p className="text-lg font-medium mb-2">No posts found</p>
              <p className="text-sm">
                {activeTab === "discover" && "No posts available."}
                {activeTab === "communities" && "No community posts available."}
                {activeTab === "events" && "No event posts available."}
                {activeTab === "listings" && "No listing posts available."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        filteredPosts.map((post: any, idx: number) => (
          <Feed item={post} key={idx} />
        ))
      )}
      {!hasMore && filteredPosts.length > 0 && (
        <div className="text-center text-gray-400 py-4">No more content</div>
      )}
    </div>
  );
};

export default FeedList;
