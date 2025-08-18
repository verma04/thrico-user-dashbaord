"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Clock, MapPin, Users, DollarSign, Plus, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface QuickEventForm {
  title: string
  description: string
  category: string
  date: string
  time: string
  location: string
  onlineLocation: string
  maxAttendees: string
  ticketPrice: string
  eventType: "in-person" | "online" | "hybrid"
  pricingType: "free" | "paid"
}

const eventCategories = [
  "Technology",
  "Business",
  "Design",
  "Marketing",
  "Education",
  "Health & Wellness",
  "Arts & Culture",
  "Sports & Fitness",
  "Food & Drink",
  "Networking",
  "Workshop",
  "Conference"
]

const getEventTypeDisplay = (eventType: string) => {
  switch (eventType) {
    case "in-person": return { icon: "📍", label: "In-Person" }
    case "online": return { icon: "💻", label: "Online" }
    case "hybrid": return { icon: "🌐", label: "Hybrid" }
    default: return { icon: "📅", label: "Event" }
  }
}

interface QuickEventCreationDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateEventsDrawer({isOpen, onClose}: QuickEventCreationDrawerProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<QuickEventForm>({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    onlineLocation: "",
    maxAttendees: "",
    ticketPrice: "",
    eventType: "in-person",
    pricingType: "free"
  })

  const handleInputChange = (field: keyof QuickEventForm, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePricingTypeChange = (pricingType: "free" | "paid") => {
    setFormData(prev => ({
      ...prev,
      pricingType,
      ticketPrice: pricingType === "free" ? "0" : prev.ticketPrice
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to create event
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate a random event ID for demo purposes
      const eventId = Math.floor(Math.random() * 1000) + 1
      
      // Close drawer and redirect to event management
      onClose()
      router.push(`/events/${eventId}`)
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: "",
        onlineLocation: "",
        maxAttendees: "",
        ticketPrice: "",
        eventType: "in-person",
        pricingType: "free"
      })
    } catch (error) {
      console.error("Error creating event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.title && 
    formData.category && 
    formData.date && 
    formData.time && 
    (formData.eventType === "online" ? formData.onlineLocation : 
     formData.eventType === "in-person" ? formData.location :
     formData.eventType === "hybrid" ? (formData.location && formData.onlineLocation) : false) &&
    (formData.pricingType === "free" || (formData.pricingType === "paid" && formData.ticketPrice && parseFloat(formData.ticketPrice) > 0))

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
   
 <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Create New Event
          </SheetTitle>
          <SheetDescription>
            Create in-person, online, or hybrid events. Quick setup with essential details - add more information later in the event management page.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CalendarDays className="h-4 w-4" />
              Basic Information
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="Enter event title..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your event..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                className="w-full resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Date & Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="h-4 w-4" />
              Date & Time
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Start Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4" />
              Event Type & Location
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={formData.eventType === "in-person" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("eventType", "in-person")}
                  className="flex-1 text-xs"
                >
                  📍 In-Person
                </Button>
                <Button
                  type="button"
                  variant={formData.eventType === "online" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("eventType", "online")}
                  className="flex-1 text-xs"
                >
                  💻 Online
                </Button>
                <Button
                  type="button"
                  variant={formData.eventType === "hybrid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("eventType", "hybrid")}
                  className="flex-1 text-xs"
                >
                  🌐 Hybrid
                </Button>
              </div>
              
              {formData.eventType === "hybrid" && (
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded-md">
                  💡 Hybrid events allow attendees to participate both in-person and online. Please provide both venue and online platform details.
                </div>
              )}
              
              {(formData.eventType === "in-person" || formData.eventType === "hybrid") && (
                <div className="space-y-2">
                  <Label htmlFor="location">Venue Address</Label>
                  <Input
                    id="location"
                    placeholder="Enter venue address..."
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
              )}
              
              {(formData.eventType === "online" || formData.eventType === "hybrid") && (
                <div className="space-y-2">
                  <Label htmlFor="onlineLocation">
                    {formData.eventType === "hybrid" ? "Online Platform/Link" : "Meeting Link/Platform"}
                  </Label>
                  <Input
                    id="onlineLocation"
                    placeholder="Zoom, Google Meet, YouTube Live, etc."
                    value={formData.onlineLocation}
                    onChange={(e) => handleInputChange("onlineLocation", e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Capacity & Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users className="h-4 w-4" />
              Capacity & Pricing
            </div>

            {/* Pricing Type Selection */}
            <div className="space-y-3">
              <Label>Event Pricing *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={formData.pricingType === "free" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePricingTypeChange("free")}
                  className="flex-1 text-xs"
                >
                  🆓 Free Event
                </Button>
                <Button
                  type="button"
                  variant={formData.pricingType === "paid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePricingTypeChange("paid")}
                  className="flex-1 text-xs"
                >
                  💰 Paid Event
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">
                  Max Attendees {formData.eventType === "hybrid" && "(Total)"}
                </Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  placeholder="100"
                  value={formData.maxAttendees}
                  onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
                  min="1"
                />
                {formData.eventType === "hybrid" && (
                  <p className="text-xs text-gray-500">
                    This includes both in-person and online attendees
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticketPrice">
                  {formData.pricingType === "free" ? "Ticket Price (Free)" : "Ticket Price ($) *"}
                </Label>
                <Input
                  id="ticketPrice"
                  type="number"
                  placeholder={formData.pricingType === "free" ? "0" : "25.00"}
                  value={formData.ticketPrice}
                  onChange={(e) => handleInputChange("ticketPrice", e.target.value)}
                  min="0"
                  step="0.01"
                  disabled={formData.pricingType === "free"}
                  className={formData.pricingType === "free" ? "bg-gray-100" : ""}
                />
                {formData.pricingType === "free" && (
                  <p className="text-xs text-gray-500">
                    This event is free for all attendees
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  {formData.pricingType === "free" ? (
                    "🎉 Free Event - No charge for attendees"
                  ) : (
                    formData.ticketPrice && parseFloat(formData.ticketPrice) > 0 ? (
                      `💳 $${parseFloat(formData.ticketPrice).toFixed(2)} per ticket`
                    ) : (
                      "💰 Paid Event - Set your ticket price"
                    )
                  )}
                </span>
                {formData.pricingType === "paid" && formData.maxAttendees && formData.ticketPrice && (
                  <div className="text-xs text-gray-500 mt-1">
                    Potential revenue: ${(parseFloat(formData.ticketPrice) * parseInt(formData.maxAttendees)).toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {formData.pricingType === "paid" && (
              <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md">
                💡 <strong>Pricing Tip:</strong> Consider your target audience and event value. Free events typically have higher attendance but lower commitment. Paid events often have more engaged attendees.
              </div>
            )}
          </div>

          <Separator />

          {/* Preview */}
          {formData.title && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700">Preview</div>
              <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{formData.title}</h3>
                  <div className="flex gap-1 flex-wrap">
                    {formData.category && (
                      <Badge variant="secondary">{formData.category}</Badge>
                    )}
                    {formData.eventType === "hybrid" && (
                      <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        🌐 Hybrid
                      </Badge>
                    )}
                    {formData.pricingType === "free" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        🆓 Free
                      </Badge>
                    ) : (
                      formData.ticketPrice && parseFloat(formData.ticketPrice) > 0 && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                          💰 ${parseFloat(formData.ticketPrice).toFixed(2)}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                
                {formData.description && (
                  <p className="text-sm text-gray-600 mb-3">{formData.description}</p>
                )}
                
                <div className="space-y-1 text-sm text-gray-600">
                  {formData.date && formData.time && (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(formData.date).toLocaleDateString()} at {formData.time}</span>
                    </div>
                  )}
                  
                  {(formData.location || formData.onlineLocation) && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        {formData.eventType === "hybrid" ? (
                          <div className="space-y-1">
                            {formData.location && (
                              <div className="flex items-center gap-2">
                                <span>{formData.location}</span>
                                <Badge variant="outline" className="text-xs">In-Person</Badge>
                              </div>
                            )}
                            {formData.onlineLocation && (
                              <div className="flex items-center gap-2">
                                <span>{formData.onlineLocation}</span>
                                <Badge variant="outline" className="text-xs">Online</Badge>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{formData.eventType === "online" ? formData.onlineLocation : formData.location}</span>
                            <Badge variant="outline" className="text-xs">
                              {formData.eventType === "online" ? "Online" : "In-Person"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {formData.maxAttendees && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        Max {formData.maxAttendees} attendees
                        {formData.pricingType === "paid" && formData.ticketPrice && (
                          <span className="text-green-600 ml-2">
                            (${(parseFloat(formData.ticketPrice) * parseInt(formData.maxAttendees)).toFixed(2)} max revenue)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create & Manage
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            After creation, you'll be redirected to the event management page to add more details.
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
