"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"
import type { Event } from "@/types/community"

interface EventCardProps {
  event: Event
  onToggleAttendance?: (eventId: number) => void
}

export function EventCard({ event, onToggleAttendance }: EventCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-sm md:text-base line-clamp-1">{event.title}</h4>
              <Badge variant="outline" className="text-xs">
                {event.type}
              </Badge>
            </div>
            <p className="text-xs md:text-sm text-gray-700 mb-2 line-clamp-2">{event.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(event.date).toLocaleTimeString()}
              </div>
              <div className="flex items-center col-span-2">
                <Users className="w-3 h-3 mr-1" />
                {event.attendees}/{event.maxAttendees || "∞"} attending
              </div>
            </div>
          </div>
          <Button 
            size="sm" 
            className="text-xs ml-2"
            onClick={() => onToggleAttendance?.(event.id)}
          >
            {event.userAttending ? "Leave" : "Join"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
