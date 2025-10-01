"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EducationAutocomplete } from "./education-autocomplete"
import { Education } from "../../types/education"
import { v4 as uuidv4 } from "uuid"

interface AddEducationFormProps {
  onAdd: (education: Education) => void;
  onCancel: () => void;
}

export function AddEducationForm({ onAdd, onCancel }: AddEducationFormProps) {
  const [formData, setFormData] = useState({
    school: { id: "", name: "", logo: "" },
    degree: "",
    grade: "",
    startDate: "",
    endDate: "",
    activities: "",
    description: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newEducation: Education = {
      id: uuidv4(),
      school: formData.school,
      degree: formData.degree,
      grade: formData.grade,
      duration: [formData.startDate, formData.endDate],
      activities: formData.activities,
      description: formData.description
    }

    onAdd(newEducation)
  }

  const isFormValid = formData.school.name && formData.degree && formData.grade && formData.startDate && formData.endDate && formData.activities

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Education</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school">School/Institute *</Label>
            <EducationAutocomplete
              onChange={(school) => setFormData({ ...formData, school })}
              placeholder="Search for a School/Institute"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">Degree *</Label>
            <Input
              id="degree"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g. Bachelor of Science"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grade *</Label>
            <Input
              id="grade"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              placeholder="e.g. 3.8 GPA, First Class"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
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
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">Activities and Societies *</Label>
            <Textarea
              id="activities"
              value={formData.activities}
              onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
              placeholder="Describe your activities, societies, and achievements"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details about your education"
              rows={3}
            />
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Add Education
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
