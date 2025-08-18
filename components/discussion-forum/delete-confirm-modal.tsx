"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmModalProps {
  discussionId: number
  discussionTitle: string
  isOpen: boolean
  onClose: () => void
}

export function DeleteConfirmModal({ discussionId, discussionTitle, isOpen, onClose }: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Discussion deleted:", discussionId)
      onClose()

      // You would typically show a success message and refresh the list here
    } catch (error) {
      console.error("Error deleting discussion:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {" "}
        {/* Responsive max-width and padding */}
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-lg sm:text-xl">
            {" "}
            {/* Responsive text size */}
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Delete Discussion</span>
          </DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {" "}
            {/* Added space-y for consistent spacing */}
            <p className="text-sm text-gray-600">Are you sure you want to delete this discussion?</p>
            <div className="p-3 bg-gray-50 border rounded-lg">
              <p className="font-medium text-sm">"{discussionTitle}"</p>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-800">
                <strong>Warning:</strong> This action cannot be undone. The discussion and all its replies will be
                permanently deleted.
              </p>
            </div>
          </CardContent>
        </Card>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
          {" "}
          {/* Responsive footer buttons */}
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="w-full sm:w-auto bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="min-w-[100px] w-full sm:w-auto bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete Discussion"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
