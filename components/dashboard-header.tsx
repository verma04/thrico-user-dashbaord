"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Suspense, useState } from "react";
import { HeaderActions } from "./header-actions";
import { AccountSwitchSheet } from "./account-switch-sheet";

export function DashboardHeader() {
  const [showSwitchSheet, setShowSwitchSheet] = useState(false);

  const handleSwitch = (url: string) => {
    setShowSwitchSheet(false);
    window.location.href = url;
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="h-4 w-px bg-sidebar-border mx-2" />

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Suspense fallback={<div>Loading...</div>}>
              <Input
                placeholder="Search members, groups, events..."
                className="pl-10"
              />
            </Suspense>
          </div>
        </div>

        {/* Right side actions */}
        <HeaderActions onSwitchSheetOpen={() => setShowSwitchSheet(true)} />
      </header>

      {/* Bottom Sheet for Account Switch */}
      <AccountSwitchSheet
        open={showSwitchSheet}
        onClose={() => setShowSwitchSheet(false)}
        onSwitch={handleSwitch}
      />
    </>
  );
}
