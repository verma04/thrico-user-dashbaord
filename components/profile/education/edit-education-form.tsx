"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface EditEducationFormProps {
  educationData: any // Replace 'any' with a proper type for education
  onSave: (data: any) => void
  onCancel: () => void
}

export default function EditEducationForm({ educationData, onSave, onCancel }: EditEducationFormProps) {
  const [school, setSchool] = useState(educationData.school || "")
  const [degree, setDegree] = useState(educationData.degree || "")
  const [grade, setGrade] = useState(educationData.grade || "")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(
    educationData.period && educationData.period.includes(" - ")
      ? {
          from: new Date(educationData.period.split(" - ")[0]),
          to: new Date(educationData.period.split(" - ")[1]),
        }
      : undefined,
  )
  const [activities, setActivities] = useState(educationData.activities || "")
  const [description, setDescription] = useState(educationData.description || "")

  useEffect(() => {
    // Update state if educationData changes
    setSchool(educationData.school || "")
    setDegree(educationData.degree || "")
    setGrade(educationData.grade || "")
    setDateRange(
      educationData.period && educationData.period.includes(" - ")
        ? {
            from: new Date(educationData.period.split(" - ")[0]),
            to: new Date(educationData.period.split(" - ")[1]),
          }
        : undefined,
    )
    setActivities(educationData.activities || "")
    setDescription(educationData.description || "")
  }, [educationData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedData = {
      ...educationData, // Keep existing ID and other properties
      school,
      degree,
      grade,
      period:
        dateRange?.from && dateRange.to ? `${format(dateRange.from, "yyyy")} - ${format(dateRange.to, "yyyy")}` : "",
      activities,
      description,
    }
    onSave(updatedData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="school">School/Institute</Label>
            <Input id="school" value={school} onChange={(e) => setSchool(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="degree">Degree</Label>
            <Input id="degree" value={degree} onChange={(e) => setDegree(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="grade">Grade/GPA</Label>
            <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
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
            <Textarea id="activities" value={activities} onChange={(e) => setActivities(e.target.value)} rows={3} />
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
