"use client";
import { FeedModal } from "./feed-modal";
import { useDrawerStore } from "@/store/drawer-store";

export function FeedHeader() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0 px-4 sm:px-0 w-full">
        <div className="w-full sm:w-auto">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Feed
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            See the latest posts and updates from your communities
          </p>
        </div>
      </div>
    </>
  );
}
