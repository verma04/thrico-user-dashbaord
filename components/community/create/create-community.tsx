"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { CommunityCreationForm } from "./community-creation-form";
import { toast } from "sonner";
import { useDrawerStore } from "@/store/drawer-store";
import { useIsMobile } from "@/hooks/use-mobile"; // You need to have this hook

interface FormValues {
  title: string;
  tagline: string;
  description: string;
  privacy: string;
  communityType: string;
  joiningTerms: string;
  requireAdminApprovalForPosts: boolean;
  allowMemberInvites: boolean;
  enableEvents: boolean;
  enableRatingsAndReviews: boolean;
}

export default function CreateCommunity() {
  const isDrawerOpen = useDrawerStore((s) => s.isCommunityDrawerOpen);
  const setDrawerOpen = useDrawerStore((s) => s.setCommunityDrawerOpen);
  const isMobile = useIsMobile();

  const [cover, setCover] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onCompleted = () => {
    setDrawerOpen(false);
    toast.success("Community created successfully!");
  };

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onCompleted();
    } catch (error) {
      toast.error("Failed to create community. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => setDrawerOpen(false);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetTrigger asChild>
       
      </SheetTrigger>
      <SheetContent
      side={isMobile ? "bottom" : "right"} // Dynamic side based on screen size
        className={`
          ${
            isMobile
              ? "h-[95vh] w-full rounded-t-lg" // Mobile: bottom drawer, almost full height
              : "w-full sm:max-w-4xl lg:max-w-6xl" // Desktop: right drawer, wider
          } 
          overflow-y-auto p-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sticky Header */}
          <div
            className={`
              flex items-center justify-between p-4 md:p-6 border-b bg-white sticky top-0 z-10
              ${isMobile ? "flex-col space-y-3" : "flex-row"}
            `}
          >
            <div className={isMobile ? "text-center" : ""}>
              <SheetTitle className="text-lg md:text-xl font-semibold">
                Create Community
              </SheetTitle>
              <SheetDescription>
                Build your community and connect with like-minded people
              </SheetDescription>
            </div>
            <div className={`flex items-center space-x-2 ${isMobile ? "w-full" : ""}`}>
              <Button
                onClick={() =>
                  document
                    .getElementById("community-form")
                    ?.dispatchEvent(new Event("submit", { bubbles: true }))
                }
                disabled={loading}
                size="sm"
                className={isMobile ? "flex-1" : ""}
              >
                {loading ? "Creating..." : "Create"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className={isMobile ? "flex-1" : ""}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* Form Content */}
          <div className="flex-1 p-4 md:p-6">
            <CommunityCreationForm
              initialValues={{
                requireAdminApprovalForPosts: false,
                allowMemberInvites: false,
                enableEvents: false,
                enableRatingsAndReviews: false,
              }}
              loading={loading}
              onFinish={onFinish}
              cover={cover}
              setCover={setCover}
              formId="community-form"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
