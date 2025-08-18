"use client"

import type React from "react"

import { useState } from "react"
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

interface AddExperienceFormProps {
  onSave: (data: any) => void
  onCancel: () => void
}

export default function AddExperienceForm({ onSave, onCancel }: AddExperienceFormProps) {
  const [currentlyWorking, setCurrentlyWorking] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd collect form data here
    const formData = {
      title: (document.getElementById("title") as HTMLInputElement).value,
      company: (document.getElementById("company") as HTMLInputElement).value,
      employmentType: (document.getElementById("employmentType") as HTMLSelectElement).value,
      location: (document.getElementById("location") as HTMLInputElement).value,
      currentlyWorking,
      startDate: currentlyWorking ? startDate?.toISOString() : undefined,
      duration:
        !currentlyWorking && dateRange?.from && dateRange.to
          ? [dateRange.from.toISOString(), dateRange.to.toISOString()]
          : undefined,
      locationType: (document.getElementById("locationType") as HTMLSelectElement).value,
      description: (document.getElementById("description") as HTMLTextAreaElement).value,
    }
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" placeholder="e.g., Product Designer" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" placeholder="e.g., Vercel" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="employmentType">Employment Type</Label>
            <Select defaultValue="full-time">
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
            <Input id="location" placeholder="e.g., Remote" required />
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
            <Select defaultValue="on-site">
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
            <Textarea id="description" placeholder="Describe your responsibilities and achievements" rows={5} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Experience</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
