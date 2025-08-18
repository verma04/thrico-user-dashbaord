"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateListingDrawer } from "./create-listing-drawer"


export function ListingHeader() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Listing Board</h1>
          <p className="text-sm md:text-base text-gray-600">Find your next opportunity or post a new listing</p>
        </div>
          <CreateListingDrawer isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      </div>

    
    </>
  )
}
