"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ContactSellerModalProps {
  isOpen: boolean
  onClose: () => void
  itemTitle: string
  sellerName: string
}

export function ContactSellerModal({ isOpen, onClose, itemTitle, sellerName }: ContactSellerModalProps) {
  const [message, setMessage] = useState(`Hi ${sellerName}, I'm interested in your ${itemTitle}. Is it still available?`)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Contact seller:", { name, phone, message, itemTitle })
    onClose()
    // Reset form
    setName("")
    setPhone("")
    setMessage(`Hi ${sellerName}, I'm interested in your ${itemTitle}. Is it still available?`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
      
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
