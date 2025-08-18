"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, MessageSquare } from "lucide-react"
import { useState } from "react"
import { CreateDiscussionModal } from "./create-discussion-modal"

export function QuickActions() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Start Discussion
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              My Discussions
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <MessageSquare className="w-4 h-4 mr-2" />
              Saved Posts
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateDiscussionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
  )
}
