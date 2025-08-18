"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus, X } from 'lucide-react'


// Assuming this hook is available
import { allItems } from "./listing-list"
import { CreateListingForm } from "./create-listing-form"
import { useIsMobile } from "@/hooks/use-mobile"

export function CreateListingDrawer() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const isMobile = useIsMobile() // This hook determines if it's a mobile view

  const handleSubmit = async (data: CreateListingFormData) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create new listing
    const newListing = {
      id: allItems.length + 1,
      title: data.title,
      price: data.price,
      currency: "₹",
      seller: "You",
      sellerAvatar: "/placeholder.svg?height=40&width=40&text=You",
      location: data.location,
      condition: data.condition,
      category: data.category,
      description: data.description,
      postedAgo: "Just now",
      images: data.images.map(file => URL.createObjectURL(file)),
      isMyListing: true,
      isSaved: false,
      activityScore: 0,
      createdAt: new Date().toISOString()
    }

    // In a real app, you would add this to your state management or API
    console.log("New listing created:", newListing)
    
    setLoading(false)
    setOpen(false)
    
    // Show success message
    alert("Listing created successfully!")
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Listing
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isMobile ? "bottom" : "right"} // Dynamic side based on screen size
        className={`
          ${isMobile 
            ? "h-[95vh] w-full rounded-t-lg" // Mobile: bottom drawer, almost full height
            : "w-full sm:max-w-4xl lg:max-w-6xl" // Desktop: right drawer, wider
          } 
          overflow-y-auto p-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header - Sticky and responsive layout */}
          <div className={`
            flex items-center justify-between p-4 sm:p-6 border-b bg-white sticky top-0 z-10
            ${isMobile ? "flex-col space-y-3" : "flex-row"}
          `}>
            <div className={isMobile ? "text-center" : ""}>
              <SheetTitle className="text-lg sm:text-xl font-semibold">
                Create New Listing
              </SheetTitle>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the details to create your marketplace listing
              </p>
            </div>
            <div className={`flex items-center space-x-2 ${isMobile ? "w-full" : ""}`}>
              <Button
                onClick={() => document.getElementById('listing-form')?.dispatchEvent(new Event('submit', { bubbles: true }))}
                disabled={loading}
                size="sm"
                className={isMobile ? "flex-1" : ""}
              >
                {loading ? "Creating..." : "Create Listing"}
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
  )
}
