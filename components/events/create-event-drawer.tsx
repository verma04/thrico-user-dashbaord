"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useDrawerStore } from "@/store/drawer-store";
import { useIsMobile } from "@/hooks/use-mobile";
import { CreateEventForm } from "./create-event-form";

export default function CreateEventsDrawer() {
  const isDrawerOpen = useDrawerStore((s) => s.isEventDrawerOpen);
  const setDrawerOpen = useDrawerStore((s) => s.setEventDrawerOpen);
  const isMobile = useIsMobile();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onCompleted = (eventId: number) => {
    setDrawerOpen(false);
    toast.success("Event created successfully!");
    router.push(`/events/${eventId}`);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const eventId = Math.floor(Math.random() * 1000) + 1;
      onCompleted(eventId);
    } catch (error) {
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => setDrawerOpen(false);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`
          ${isMobile ? "h-[95vh] w-full rounded-t-lg" : "w-full sm:max-w-2xl"}
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
              <SheetTitle className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Create New Event
              </SheetTitle>
              <SheetDescription>
                Create in-person, online, or hybrid events. Quick setup with
                essential details.
              </SheetDescription>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                isMobile ? "w-full" : ""
              }`}
            >
              <Button
                onClick={() =>
                  document
                    .getElementById("event-form")
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
            <CreateEventForm
              loading={loading}
              onFinish={onFinish}
              formId="event-form"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
