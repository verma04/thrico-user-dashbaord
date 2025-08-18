"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Eye,
  SettingsIcon,
  XCircle,
  CheckCircle,
  Shield,
} from "lucide-react"
import { useEvents } from "@/hooks/use-community-management"

export default function EventsPage() {
  const {
    events,
    newEvent,
    setNewEvent,
    handleCreateEvent,
    handleDeleteEvent,
    handleApproveAttendance,
    handleRejectAttendance,
  } = useEvents()

  const handleEditEvent = (eventId: number) => {
    // In a real app, this would open an edit modal
    console.log("Edit event:", eventId)
  }

  return (
    <div className="space-y-6">
      {/* Create Event */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>Create events for your community members.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">Event Title *</Label>
              <Input
                id="eventTitle"
                placeholder="Enter event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select
                value={newEvent.type}
                onValueChange={(value) => setNewEvent((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online Event</SelectItem>
                  <SelectItem value="in-person">In-Person Event</SelectItem>
                  <SelectItem value="hybrid">Hybrid Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date *</Label>
              <Input
                id="eventDate"
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDuration">Duration (hours)</Label>
              <Input
                id="eventDuration"
                type="number"
                placeholder="2"
                value={newEvent.duration}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="eventLocation">Location</Label>
              <Input
                id="eventLocation"
                placeholder="Event location or online meeting link"
                value={newEvent.location}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="eventDescription">Description</Label>
              <Textarea
                id="eventDescription"
                placeholder="Describe your event..."
                value={newEvent.description}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input
                id="maxAttendees"
                type="number"
                placeholder="50"
                value={newEvent.maxAttendees}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, maxAttendees: e.target.value }))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireApproval"
                checked={newEvent.requireApproval}
                onCheckedChange={(checked) =>
                  setNewEvent((prev) => ({ ...prev, requireApproval: checked as boolean }))
                }
              />
              <Label htmlFor="requireApproval">Require approval to attend</Label>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleCreateEvent} disabled={!newEvent.title || !newEvent.date}>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle>Community Events ({events.length})</CardTitle>
          <CardDescription>Manage all events in your community.</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No events created yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{event.title}</h4>
                        <Badge
                          variant={
                            event.status === "upcoming"
                              ? "default"
                              : event.status === "ongoing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {event.status}
                        </Badge>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(event.date).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location || "TBD"}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {event.attendees}/{event.maxAttendees || "∞"}
                        </div>
                      </div>
                      {event.requireApproval && (
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Approval Required
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditEvent(event.id)}>
                        <SettingsIcon className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                        <XCircle className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Event Attendees Requests */}
                  {event.pendingRequests && event.pendingRequests.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="font-medium mb-2">
                        Pending Attendance Requests ({event.pendingRequests.length})
                      </h5>
                      <div className="space-y-2">
                        {event.pendingRequests.map((request) => (
                          <div
                            key={request.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={request.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{request.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{request.name}</span>
                              <span className="text-xs text-gray-500">requested {request.requestDate}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApproveAttendance(event.id, request.id)}
                              >
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectAttendance(event.id, request.id)}
                              >
                                <XCircle className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Event Analytics</CardTitle>
          <CardDescription>Track event performance and engagement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{events.length}</div>
              <p className="text-sm text-gray-600">Total Events</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {events.filter((e) => e.status === "upcoming").length}
              </div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {events.reduce((sum, e) => sum + e.attendees, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Attendees</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {events.reduce((sum, e) => sum + (e.pendingRequests?.length || 0), 0)}
              </div>
              <p className="text-sm text-gray-600">Pending Requests</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
