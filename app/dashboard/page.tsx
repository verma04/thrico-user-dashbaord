"use client";
import { useGetUser } from "@/components/grapqhl/action";
import { useDrawerStore } from "@/store/drawer-store";
import DashboardHeader from "./home/home-header";
import RecentFeedActivity from "./recent-feed-activity";
import MyCommunitiesActivity from "./home/my-communities-activity";
import DiscussionForumActivity from "./home/discussion-forum-activity";
import MyCalendar from "./home/my-calendar";
import LatestNewsNotifications from "./home/latest-news-notifications";
import LatestOffers from "./home/latest-offers";
import PlatformOverview from "./platform-overview";

export default function DashboardPage() {
  const { data: { getUser } = {} } = useGetUser();
  const drawerStore = useDrawerStore();

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader getUser={getUser} drawerStore={drawerStore} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <RecentFeedActivity />
          <MyCommunitiesActivity />
          <DiscussionForumActivity />
        </div>
        <div className="space-y-6">
          <MyCalendar />
          <LatestNewsNotifications />
          <LatestOffers />
          <PlatformOverview />
        </div>
      </div>
    </div>
  );
}
