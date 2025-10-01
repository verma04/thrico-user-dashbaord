"use client";

import { MarketplaceCard } from "./list-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Star,
  Bookmark,
  Eye,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Listing, useGetAllListings } from "../grapqhl/action/listing";
import { ResponsiveTabs, TabItem } from "@/components/ui/responsive-tabs";
import { TrendingUp, User, CheckCircle, Search } from "lucide-react";

export function MarketplaceList() {
  const [page, setPage] = useState(1);
  const { data, loading } = useGetAllListings(page);

  const pagination = data?.getAllListing?.pagination;

  return (
    <div>
   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {data?.getAllListing?.listings.map((item) => (
          <MarketplaceCard key={item.id} item={item} />
        ))}
      </div>
      {pagination && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            disabled={!pagination.hasPreviousPage || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            disabled={!pagination.hasNextPage || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
