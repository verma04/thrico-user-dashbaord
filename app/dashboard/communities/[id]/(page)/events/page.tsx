"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MobileBottomNav, MobileHeader } from "@/components/community-page/mobile-nav"
import { ArrowLeft, Calendar, Clock, Users, MapPin, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Event } from "@/types/community"

interface CommunityEventsPageProps {
  params: { id: string }
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Photography Workshop: Portrait Lighting",
    description: "Learn advanced portrait lighting techniques with professional photographers. This comprehensive workshop will cover studio lighting, natural light portraits, and creative lighting setups.",
    date: "2024-02-15T14:00",
    duration: "3",
    location: "Community Center, Main St",
    type: "in-person",
    maxAttendees: 25,
    attendees: 18,
    status: "upcoming",
    requireApproval: true,
    userAttending: false,
  },
  {
    id: 2,
    title: "Virtual Photo Critique Session",
    description: "Share your photos and get constructive feedback from the community. Bring your best work and learn from others.",
    date: "2024-02-20T19:00",
    duration: "2",
    location: "https://zoom.us/j/123456789",
    type: "online",
    maxAttendees: 50,
    attendees: 32,
    status: "upcoming",
    requireApproval: false,
    userAttending: true,
  },
  {
    id: 3,
    title: "Street Photography Meetup",
    description: "Join fellow photographers for a street photography walk around downtown. Perfect for beginners and experienced photographers alike.",
    date: "2024-02-25T10:00",
    duration: "4",
    location: "Downtown Plaza",
    type: "in-person",
    maxAttendees: 15,
    attendees: 12,
    status: "upcoming",
    requireApproval: false,
    userAttending: false,
  },
  // Add more mock events...
]

export default function CommunityEventsPage({ params }: CommunityEventsPageProps) {
  const [filter, setFilter] = useState<"all" | "upcoming" | "attending">("all")
  
  const filteredEvents = mockEvents.filter(event => {
    if (filter === "upcoming") return event.status === "upcoming"
    if (filter === "attending") return event.userAttending
    return true
  })

  const handleToggleAttendance = (eventId: number) => {
    // In a real app, this would update the backend
    console.log("Toggle attendance for event:", eventId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader
        title="Community Events"
        showBack={true}
        actions={
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Create
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20 md:pb-8">
        {/* Desktop Header */}
      

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All Events
          </Button>
          <Button
            variant={filter === "upcoming" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === "attending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("attending")}
          >
            Attending
          </Button>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          {event.userAttending && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              Attending
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3 line-clamp-2">{event.description}</p>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{event.attendees}/{event.maxAttendees || "∞"}</span>
                      </div>
                      <div className="flex items-center col-span-2 md:col-span-1">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Duration: {event.duration} hours</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col gap-2">
                    <Button 
                      size="sm" 
                      variant={event.userAttending ? "outline" : "default"}
                      onClick={() => handleToggleAttendance(event.id)}
                      className="w-full md:w-auto"
                    >
                      {event.userAttending ? "Leave" : "Join"}
                    </Button>
                    {event.requireApproval && !event.userAttending && (
                      <span className="text-xs text-gray-500 text-center">
                        Requires approval
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">
              {filter === "attending" 
                ? "You're not attending any events yet." 
                : "No events match your current filter."}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
