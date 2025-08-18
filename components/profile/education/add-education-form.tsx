"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface AddEducationFormProps {
  onSave: (data: any) => void
  onCancel: () => void
}

export default function AddEducationForm({ onSave, onCancel }: AddEducationFormProps) {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd collect form data here
    const formData = {
      school: (document.getElementById("school") as HTMLInputElement).value,
      degree: (document.getElementById("degree") as HTMLInputElement).value,
      grade: (document.getElementById("grade") as HTMLInputElement).value,
      period:
        dateRange?.from && dateRange.to ? `${format(dateRange.from, "yyyy")} - ${format(dateRange.to, "yyyy")}` : "",
      activities: (document.getElementById("activities") as HTMLTextAreaElement).value,
      description: (document.getElementById("description") as HTMLTextAreaElement).value,
    }
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="school">School/Institute</Label>
            <Input id="school" placeholder="e.g., University of Example" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="degree">Degree</Label>
            <Input id="degree" placeholder="e.g., Bachelor of Science" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="grade">Grade/GPA</Label>
            <Input id="grade" placeholder="e.g., 3.8" required />
          </div>
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
          <div className="grid gap-2">
            <Label htmlFor="activities">Activities</Label>
            <Textarea id="activities" placeholder="e.g., Dean's List, Student Council" rows={3} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="e.g., Relevant coursework, projects" rows={5} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Education</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
