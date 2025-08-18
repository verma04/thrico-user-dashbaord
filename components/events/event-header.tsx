"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateEventsDrawer } from "./create-event-drawer"


export function EventHeader() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Events Board</h1>
          <p className="text-sm md:text-base text-gray-600">Find your next event or post a new one</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Post an Event
        </Button>
      </div>

      <CreateEventsDrawer isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
  )
}
