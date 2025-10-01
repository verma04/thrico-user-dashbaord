"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

// Assuming this hook is available

import { CreateListingForm } from "./create-listing-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAddListing } from "../grapqhl/action/listing";
import { useToast } from "@/components/ui/use-toast";
import { useDrawerStore } from "@/store/drawer-store";

export function CreateListingDrawer() {
  const isDrawerOpen = useDrawerStore((s) => s.isListingDrawerOpen);
  const setDrawerOpen = useDrawerStore((s) => s.setListingDrawerOpen);

  const { toast } = useToast();

  const isMobile = useIsMobile(); // This hook determines if it's a mobile view

  const [add, { loading }] = useAddListing({
    onCompleted: (data) => {
      if (data?.addListing) {
        toast({
          title: "Success",
          description: "Listing created successfully!",
          variant: "success",
        });
        setDrawerOpen(false);
      }
    },
  });

  const handleSubmit = async (data: any) => {
    add(data);
    console.log("Form submitted with data:", data);
  };

  const handleCancel = async (data: any) => {
    setDrawerOpen(false);
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent
        side={isMobile ? "bottom" : "right"} // Dynamic side based on screen size
        className={`
          ${
            isMobile
              ? "h-[95vh] w-full rounded-t-lg" // Mobile: bottom drawer, almost full height
              : "w-full sm:max-w-4xl lg:max-w-5xl" // Desktop: right drawer, wider
          } 
          overflow-y-auto p-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header - Sticky and responsive layout */}
          <div
            className={`
            flex items-center justify-between p-4 sm:p-6 border-b bg-white sticky top-0 z-10
            ${isMobile ? "flex-col space-y-3" : "flex-row"}
          `}
          >
            <div className={isMobile ? "text-center" : ""}>
              <SheetTitle className="text-lg sm:text-xl font-semibold">
                Create New Listing
              </SheetTitle>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the details to create your marketplace listing
              </p>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                isMobile ? "w-full" : ""
              }`}
            >
              <Button
                type="button" // <-- Add this
                onClick={() =>
                  document
                    .getElementById("listing-form")
                    ?.dispatchEvent(new Event("submit", { bubbles: true }))
                }
                disabled={loading}
                size="sm"
                className={isMobile ? "flex-1" : ""}
              >
                {loading ? "Creating..." : "Create Listing"}
              </Button>
              <Button
                type="button" // <-- Add this
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className={isMobile ? "flex-1" : ""}
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Form Content - Takes remaining height */}
          <div className="flex-1 p-4 sm:p-6">
            <CreateListingForm
              onSubmit={handleSubmit}
              loading={loading}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
