"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

interface MakeOfferModalProps {
  isOpen: boolean
  onClose: () => void
  offerTitle: string
  sellerName: string
}

interface FormData {
  fullName: string
  email: string
  phone: string
  proposedPrice: string
  message: string
}

export function MakeOfferModal({ isOpen, onClose, offerTitle, sellerName }: MakeOfferModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    proposedPrice: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.proposedPrice.trim()) newErrors.proposedPrice = "Proposed price is required"
    else if (isNaN(Number.parseFloat(formData.proposedPrice))) newErrors.proposedPrice = "Please enter a valid number"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call for making an offer
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Log form data (in a real app, you'd send this to a backend)
      console.log(`Offer made for "${offerTitle}" to ${sellerName}:`, formData)

      // Reset form and close modal
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        proposedPrice: "",
        message: "",
      })
      setErrors({})
      onClose()

      // You would typically show a success message here
      alert("Offer submitted successfully!")
    } catch (error) {
      console.error("Error submitting offer:", error)
      alert("Failed to submit offer. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        proposedPrice: "",
        message: "",
      })
      setErrors({})
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Make an Offer for {offerTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-gray-600 mb-6">Fill in your details to make an offer to {sellerName}.</p>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(123) 456-7890"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              {/* Proposed Price */}
              <div className="space-y-2">
                <Label htmlFor="proposedPrice">
                  Proposed Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="proposedPrice"
                  type="text" // Use text to allow for currency symbols, but validate as number
                  value={formData.proposedPrice}
                  onChange={(e) => setFormData({ ...formData, proposedPrice: e.target.value })}
                  placeholder="e.g., $120.00"
                  className={errors.proposedPrice ? "border-red-500" : ""}
                />
                {errors.proposedPrice && <p className="text-sm text-red-500">{errors.proposedPrice}</p>}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">
                  Message to Seller <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell the seller why you're interested and any questions you have..."
                  className="min-h-[120px]"
                />
                {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[100px] w-full sm:w-auto">
              {isSubmitting ? "Submitting..." : "Submit Offer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
