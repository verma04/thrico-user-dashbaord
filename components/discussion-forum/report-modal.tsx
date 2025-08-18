"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface ReportModalProps {
  discussionId: number
  discussionTitle: string
  isOpen: boolean
  onClose: () => void
}

const reportReasons = [
  { id: "spam", label: "Spam or promotional content" },
  { id: "harassment", label: "Harassment or bullying" },
  { id: "inappropriate", label: "Inappropriate content" },
  { id: "misinformation", label: "Misinformation" },
  { id: "copyright", label: "Copyright violation" },
  { id: "other", label: "Other (please specify)" },
]

export function ReportModal({ discussionId, discussionTitle, isOpen, onClose }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedReason) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Report submitted:", {
        discussionId,
        reason: selectedReason,
        additionalInfo,
      })

      // Reset form and close modal
      setSelectedReason("")
      setAdditionalInfo("")
      onClose()

      // You would typically show a success message here
    } catch (error) {
      console.error("Error submitting report:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setSelectedReason("")
      setAdditionalInfo("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-full sm:max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {" "}
        {/* Responsive max-width and padding */}
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-lg sm:text-xl">
            {" "}
            {/* Responsive text size */}
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Report Discussion</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {" "}
              {/* Added space-y for consistent spacing */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  You are reporting: <span className="font-medium">"{discussionTitle}"</span>
                </p>
              </div>
              {/* Report Reasons */}
              <div className="space-y-4">
                <Label className="text-sm">Why are you reporting this discussion?</Label> {/* Responsive text size */}
                <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                  {reportReasons.map((reason) => (
                    <div key={reason.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={reason.id} id={reason.id} />
                      <Label htmlFor={reason.id} className="text-sm font-normal cursor-pointer">
                        {reason.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {/* Additional Information */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="additional-info" className="text-sm">
                  Additional Information (Optional)
                </Label>{" "}
                {/* Responsive text size */}
                <Textarea
                  id="additional-info"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Please provide any additional context that might help us understand the issue..."
                  className="min-h-[80px]"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500">{additionalInfo.length}/500</p>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  Reports are reviewed by our moderation team. False reports may result in account restrictions.
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
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedReason || isSubmitting}
              className="min-w-[100px] w-full sm:w-auto bg-orange-600 hover:bg-orange-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
