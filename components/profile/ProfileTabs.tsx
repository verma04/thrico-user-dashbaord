import {
  Activity,
  Briefcase,
  Calendar,
  FolderOpen,
  Gift,
  Info,
  Network,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";

import { ResponsiveTabs, TabItem } from "../ui/responsive-tabs";

export function ProfileTabs() {
  const tabItems: TabItem[] = [
    {
      value: "about",
      label: "About",
      icon: Info,
      description: "",
    },
    {
      value: "posts",
      label: "Activities",
      icon: Activity,
      description: "",
    },
    {
      value: "jobs",
      label: "Jobs",
      icon: Briefcase,
      description: "",
    },
    {
      value: "listings",
      label: "Listings",
      icon: ShoppingBag,
      description: "",
    },
    {
      value: "offers",
      label: "Offers",
      icon: Gift,
      description: "",
    },
    {
      value: "portfolio",
      label: "Portfolio",
      icon: FolderOpen,
      description: "",
    },
    {
      value: "communities",
      label: "Communities",
      icon: Users,
      description: "",
    },
    {
      value: "events",
      label: "Events",
      icon: Calendar,
      description: "",
    },
    {
      value: "connections",
      label: "Connections",
      icon: Network,
      description: "",
    },
  ];
  return (
    <>
      <ResponsiveTabs
        tabs={tabItems}
        currentTab={"about"}
        baseUrl="/dashboard/profile"
      />
    </>
  );
}
