import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/store/drawer-store";
import {
  Plus,
  Calendar,
  MessageSquare,
  Users,
  ShoppingBag,
  Briefcase,
  ClipboardList,
  FileText,
  MessageCircle,
  Bell,
  UsersRound,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import FeedModal from "./feed/feed-modal";
import CreateEventsDrawer from "./events/create-event-drawer";
import { CreateListingDrawer } from "./listing/create-listing-drawer";
import { CreateJobDrawer } from "./jobs/create-job-drawer";

interface HeaderActionsProps {
  onSwitchSheetOpen: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  onSwitchSheetOpen,
}) => {
  const drawerStore = useDrawerStore();

  return (
    <>
      <div className="flex items-center gap-2 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <button
                className="flex items-center w-full"
                onClick={() => drawerStore.setFeedDrawerOpen(true)}
                type="button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                className="flex items-center w-full"
                onClick={() => drawerStore.setEventDrawerOpen(true)}
                type="button"
              >
                <Calendar className="w-4 h-4 mr-2" />
                New Event
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                className="flex items-center w-full"
                onClick={() => drawerStore.setForumDrawerOpen(true)}
                type="button"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Discussion
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                className="flex items-center w-full"
                onClick={() => drawerStore.setCommunityDrawerOpen(true)}
                type="button"
              >
                <Users className="w-4 h-4 mr-2" />
                Create Community
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                className="flex items-center w-full"
                onClick={() => drawerStore.setListingDrawerOpen(true)}
                type="button"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                List Item
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                className="flex items-center w-full"
                onClick={() => drawerStore.setDrawerOpen(true)}
                type="button"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Post Job
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/surveys/create"
                className="flex items-center"
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                Create Survey
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/forms/create"
                className="flex items-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Form
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button asChild variant="ghost" size="icon">
          <a href="/dashboard/chat">
            <MessageCircle className="w-4 h-4" />
            <span className="sr-only">Chat</span>
          </a>
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onSwitchSheetOpen}
        >
          <UsersRound className="w-4 h-4" />
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <FeedModal />

      <CreateEventsDrawer />
      <CreateListingDrawer />
      <CreateJobDrawer />
    </>
  );
};
