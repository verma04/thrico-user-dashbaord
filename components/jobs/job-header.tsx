"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateJobDrawer } from "./create-job-drawer";
import { useDrawerStore } from "@/store/drawer-store";

export function JobHeader() {
  const isDrawerOpen = useDrawerStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useDrawerStore((s) => s.setDrawerOpen);
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0  sm:px-0">
        <div>
          <h1 className="text-lg xs:text-xl md:text-2xl font-bold text-gray-900">
            Job Board
          </h1>
          <p className="text-xs xs:text-sm md:text-base text-gray-600">
            Find your next opportunity or post a new opening
          </p>
        </div>
        <Button
          onClick={() => setDrawerOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden xs:inline">Post a Job</span>
          <span className="inline xs:hidden">Post</span>
        </Button>
      </div>
    </>
  );
}
