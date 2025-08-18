"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { FeedModal } from "./feed-modal"

export function FeedHeader() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleNewPost = (postData: any) => {
    // This can be passed up to parent or handled via context/state management
    console.log("New post created:", postData)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Feed</h1>
          <p className="text-sm md:text-base text-gray-600">See the latest posts and updates from your communities</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      <FeedModal open={showCreateModal} onOpenChange={setShowCreateModal} onSubmit={handleNewPost} />
    </>
  )
}
