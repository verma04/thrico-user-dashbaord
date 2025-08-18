"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

interface CreateJobDrawerProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  title: string
  company: string
  location: string
  type: string
  experience: string
  salary: string
  description: string
  applicationLink: string
  applicationDeadline: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  skills: string[]
  workplaceType: string
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Temporary", "Volunteer", "Other"]
const experienceLevels = ["Entry-level", "Mid-level", "Senior", "Lead", "Executive"]
const workplaceTypes = ["On-site", "Hybrid", "Remote"]

export function CreateJobDrawer({ isOpen, onClose }: CreateJobDrawerProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    company: "",
    location: "",
    type: "",
    experience: "",
    salary: "",
    description: "",
    applicationLink: "",
    applicationDeadline: "",
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
    skills: [""],
    workplaceType: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.type) newErrors.type = "Job type is required"
    if (!formData.experience) newErrors.experience = "Experience level is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"
    if (!formData.applicationLink.trim()) newErrors.applicationLink = "Application link is required"
    else if (!/^https?:\/\/\S+$/.test(formData.applicationLink)) newErrors.applicationLink = "Please enter a valid URL"
    if (!formData.workplaceType) newErrors.workplaceType = "Work arrangement is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleListChange = (listName: keyof FormData, index: number, value: string) => {
    const list = [...(formData[listName] as string[])]
    list[index] = value
    setFormData({ ...formData, [listName]: list })
  }

  const handleAddListItem = (listName: keyof FormData) => {
    setFormData({ ...formData, [listName]: [...(formData[listName] as string[]), ""] })
  }

  const handleRemoveListItem = (listName: keyof FormData, index: number) => {
    const list = [...(formData[listName] as string[])]
    list.splice(index, 1)
    setFormData({ ...formData, [listName]: list })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form and close drawer
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "",
        experience: "",
        salary: "",
        description: "",
        applicationLink: "",
        applicationDeadline: "",
        requirements: [""],
        responsibilities: [""],
        benefits: [""],
        skills: [""],
        workplaceType: "",
      })
      setErrors({})
      onClose()

      console.log("Job posted:", formData)
    } catch (error) {
      console.error("Error posting job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "",
        experience: "",
        salary: "",
        description: "",
        applicationLink: "",
        applicationDeadline: "",
        requirements: [""],
        responsibilities: [""],
        benefits: [""],
        skills: [""],
        workplaceType: "",
      })
      setErrors({})
      onClose()
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Post a New Job</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-gray-600 mb-6">Fill in the details for your job opening.</p>

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Senior Software Engineer"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="company">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g., Acme Corp."
                  className={errors.company ? "border-red-500" : ""}
                />
                {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Remote, New York, NY"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>

              {/* Job Type & Experience Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">
                    Job Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">
                    Experience Level <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger className={errors.experience ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
                </div>
              </div>

              {/* Workplace Type */}
              <div className="space-y-2">
                <Label htmlFor="workplaceType">
                  Work Arrangement <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.workplaceType}
                  onValueChange={(value) => setFormData({ ...formData, workplaceType: value })}
                >
                  <SelectTrigger className={errors.workplaceType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select arrangement" />
                  </SelectTrigger>
                  <SelectContent>
                    {workplaceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.workplaceType && <p className="text-sm text-red-500">{errors.workplaceType}</p>}
              </div>

              {/* Salary (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range (Optional)</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="e.g., $80,000 - $100,000"
                />
              </div>

              {/* Application Deadline */}
              <div className="space-y-2">
                <Label htmlFor="applicationDeadline">Application Deadline</Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                  min={new Date().toISOString().split("T")[0]} // Disable past dates
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Job Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a detailed description of the job responsibilities and requirements."
                  className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Dynamic List Fields */}
              {[
                { name: "requirements", label: "Requirements" },
                { name: "responsibilities", label: "Key Responsibilities" },
                { name: "benefits", label: "Benefits & Perks" },
                { name: "skills", label: "Required Skills" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label>{field.label}</Label>
                  {(formData[field.name as keyof FormData] as string[]).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={item}
                        onChange={(e) => handleListChange(field.name as keyof FormData, index, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase().slice(0, -1)}`}
                      />
                      {(formData[field.name as keyof FormData] as string[]).length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveListItem(field.name as keyof FormData, index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddListItem(field.name as keyof FormData)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add {field.label.slice(0, -1)}
                  </Button>
                </div>
              ))}

              {/* Application Link */}
              <div className="space-y-2">
                <Label htmlFor="applicationLink">
                  Application Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="applicationLink"
                  type="url"
                  value={formData.applicationLink}
                  onChange={(e) => setFormData({ ...formData, applicationLink: e.target.value })}
                  placeholder="e.g., https://yourcompany.com/careers/apply"
                  className={errors.applicationLink ? "border-red-500" : ""}
                />
                {errors.applicationLink && <p className="text-sm text-red-500">{errors.applicationLink}</p>}
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[100px] w-full sm:w-auto">
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
