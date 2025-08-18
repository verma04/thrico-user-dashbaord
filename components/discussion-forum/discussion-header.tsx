"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateDiscussionModal } from "./create-discussion-modal"

export function DiscussionHeader() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        {" "}
        {/* Flex-col on small, row on sm+ */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Discussions</h1> {/* Responsive text size */}
          <p className="text-sm md:text-base text-gray-600">
            Join conversations and share knowledge with the community
          </p>{" "}
          {/* Responsive text size */}
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto">
          {" "}
          {/* Full width on small, auto on sm+ */}
          <Plus className="w-4 h-4 mr-2" />
          Start Discussion
        </Button>
      </div>

      <CreateDiscussionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
  )
}
