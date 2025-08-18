"use client";

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { CommunityCard } from "./community-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Community {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  memberCount: number;
  postCount: number;
  viewCount: number;
  members: Array<{ avatar: string; name: string }>;
  cover: string;
  category: string;
  isJoined: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isCreatedByMe?: boolean;
  privacy: "public" | "private";
  features: string[];
  location?: string;
}

interface CommunityGridProps {
  communities: Community[];
  title: string;
  emptyState?: React.ReactNode;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  loading?: boolean;
  enableInfiniteScroll?: boolean;
}

export function CommunityGrid({ 
  communities, 
  title, 
  emptyState,
  onLoadMore,
  hasMore = false,
  loading = false,
  enableInfiniteScroll = true
}: CommunityGridProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(async () => {
    if (!onLoadMore || isLoadingMore || loading) return;
    
    setIsLoadingMore(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Error loading more communities:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [onLoadMore, isLoadingMore, loading]);

  // Infinite scroll observer
  useEffect(() => {
    if (!enableInfiniteScroll || !hasMore || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && !loading) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [enableInfiniteScroll, hasMore, handleLoadMore, isLoadingMore, loading]);

  return (
    <div className="space-y-6" ref={containerRef}>
    
      {communities.length === 0 && emptyState ? (
        emptyState
      ) : (
        <>
          <div className="flex flex-wrap gap-6">
            {communities.map((community) => (
              <div className="flex-1 min-w-[320px] max-w-[400px]" key={community.id}>
                <CommunityCard community={community} />
              </div>
            ))}
          </div>

          {/* Loading state */}
          {(loading || isLoadingMore) && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-gray-600">Loading more communities...</span>
              </div>
            </div>
          )}

          {/* Load More Button (fallback for manual loading) */}
          {!enableInfiniteScroll && hasMore && onLoadMore && !loading && (
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                variant="outline"
                className="px-8 py-2"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Communities'
                )}
              </Button>
            </div>
          )}

          {/* Infinite scroll trigger */}
          {enableInfiniteScroll && hasMore && (
            <div ref={loadMoreRef} className="h-10" />
          )}

          {/* End of results message */}
          {!hasMore && communities.length > 0 && (
            <div className="flex justify-center py-8">
              <p className="text-gray-500 text-sm">You've reached the end of the communities</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
