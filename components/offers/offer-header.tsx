"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateOfferDrawer } from "./create-offer-drawer"

export function OfferHeader() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Marketplace Offers</h1>
          <p className="text-sm md:text-base text-gray-600">Discover great deals or create your own offers</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Offer
        </Button>
      </div>

      <CreateOfferDrawer isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
  )
}
