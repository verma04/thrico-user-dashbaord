"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompanyAutocomplete } from "./company-autocomplete"
import { LocationInput } from "./location-input"
import { Experience } from "../../types/experience"
import { v4 as uuidv4 } from "uuid"

interface AddExperienceFormProps {
  onAdd: (experience: Experience) => void;
  onCancel: () => void;
}

export function AddExperienceForm({ onAdd, onCancel }: AddExperienceFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: { id: "", name: "", logo: "" },
    employmentType: "" as Experience['employmentType'],
    location: { name: "" },
    locationType: "" as Experience['locationType'],
    currentlyWorking: false,
    startDate: "",
    endDate: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newExperience: Experience = {
      id: uuidv4(),
      title: formData.title,
      company: formData.company,
      employmentType: formData.employmentType,
      location: formData.location,
      locationType: formData.locationType,
      currentlyWorking: formData.currentlyWorking,
      ...(formData.currentlyWorking 
        ? { startDate: formData.startDate }
        : { duration: [formData.startDate, formData.endDate] }
      )
    }

    onAdd(newExperience)
  }

  const isFormValid = formData.title && formData.company.name && formData.employmentType && 
    formData.location.name && formData.locationType && formData.startDate && 
    (formData.currentlyWorking || formData.endDate)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <CompanyAutocomplete
              onChange={(company) => setFormData({ ...formData, company })}
              placeholder="Search for a company"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment Type *</Label>
            <Select value={formData.employmentType} onValueChange={(value: Experience['employmentType']) => setFormData({ ...formData, employmentType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full Time">Full Time</SelectItem>
                <SelectItem value="Part Time">Part Time</SelectItem>
                <SelectItem value="Self Employed">Self Employed</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Trainee">Trainee</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <LocationInput
              onChange={(location) => setFormData({ ...formData, location })}
              placeholder="Enter location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationType">Location Type *</Label>
            <Select value={formData.locationType} onValueChange={(value: Experience['locationType']) => setFormData({ ...formData, locationType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="On-site">On-site</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="currentlyWorking"
              checked={formData.currentlyWorking}
              onCheckedChange={(checked) => setFormData({ ...formData, currentlyWorking: checked as boolean })}
            />
            <Label htmlFor="currentlyWorking" className="text-sm">
              I am currently working in this role
            </Label>
          </div>

          {formData.currentlyWorking ? (
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                max={new Date().toISOString().slice(0, 7)}
                required
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  max={new Date().toISOString().slice(0, 7)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  max={new Date().toISOString().slice(0, 7)}
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Add Experience
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
