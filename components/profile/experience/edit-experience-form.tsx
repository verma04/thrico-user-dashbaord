"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface EditExperienceFormProps {
  experienceData: any // Replace 'any' with a proper type for experience
  onSave: (data: any) => void
  onCancel: () => void
}

export default function EditExperienceForm({ experienceData, onSave, onCancel }: EditExperienceFormProps) {
  const [title, setTitle] = useState(experienceData.title || "")
  const [company, setCompany] = useState(experienceData.company || "")
  const [employmentType, setEmploymentType] = useState(experienceData.employmentType || "full-time")
  const [location, setLocation] = useState(experienceData.location || "")
  const [currentlyWorking, setCurrentlyWorking] = useState(experienceData.currentlyWorking || false)
  const [startDate, setStartDate] = useState<Date | undefined>(
    experienceData.startDate ? new Date(experienceData.startDate) : undefined,
  )
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(
    experienceData.duration && experienceData.duration.length === 2
      ? { from: new Date(experienceData.duration[0]), to: new Date(experienceData.duration[1]) }
      : undefined,
  )
  const [locationType, setLocationType] = useState(experienceData.locationType || "on-site")
  const [description, setDescription] = useState(experienceData.description || "")

  useEffect(() => {
    // Update state if experienceData changes (e.g., when editing a different item)
    setTitle(experienceData.title || "")
    setCompany(experienceData.company || "")
    setEmploymentType(experienceData.employmentType || "full-time")
    setLocation(experienceData.location || "")
    setCurrentlyWorking(experienceData.currentlyWorking || false)
    setStartDate(experienceData.startDate ? new Date(experienceData.startDate) : undefined)
    setDateRange(
      experienceData.duration && experienceData.duration.length === 2
        ? { from: new Date(experienceData.duration[0]), to: new Date(experienceData.duration[1]) }
        : undefined,
    )
    setLocationType(experienceData.locationType || "on-site")
    setDescription(experienceData.description || "")
  }, [experienceData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedData = {
      ...experienceData, // Keep existing ID and other properties
      title,
      company,
      employmentType,
      location,
      currentlyWorking,
      startDate: currentlyWorking ? startDate?.toISOString() : undefined,
      duration:
        !currentlyWorking && dateRange?.from && dateRange.to
          ? [dateRange.from.toISOString(), dateRange.to.toISOString()]
          : undefined,
      locationType,
      description,
    }
    onSave(updatedData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="employmentType">Employment Type</Label>
            <Select value={employmentType} onValueChange={setEmploymentType}>
              <SelectTrigger id="employmentType">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="self-employed">Self Employed</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="trainee">Trainee</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="currentlyWorking"
              checked={currentlyWorking}
              onCheckedChange={(checked) => setCurrentlyWorking(checked as boolean)}
            />
            <Label htmlFor="currentlyWorking">I am currently working in this role</Label>
          </div>

          {currentlyWorking ? (
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="duration"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange?.from && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="locationType">Location Type</Label>
            <Select value={locationType} onValueChange={setLocationType}>
              <SelectTrigger id="locationType">
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on-site">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
