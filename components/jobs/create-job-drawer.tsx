"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import { useFormik } from "formik"
import { useIsMobile } from "@/hooks/use-mobile"
import { useDrawerStore } from "@/store/drawer-store"

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

const jobTypeOptions = [
  { value: "FULL_TIME", title: "Full-time" },
  { value: "PART_TIME", title: "Part-time" },
  { value: "CONTRACT", title: "Contract" },
  { value: "INTERNSHIP", title: "Internship" },
  { value: "TEMPORARY", title: "Temporary" },
  { value: "VOLUNTEER", title: "Volunteer" },
  { value: "OTHER", title: "Other" },
]
const experienceLevelOptions = [
  { value: "ENTRY_LEVEL", title: "Entry-level" },
  { value: "MID_LEVEL", title: "Mid-level" },
  { value: "SENIOR", title: "Senior" },
  { value: "LEAD", title: "Lead" },
  { value: "EXECUTIVE", title: "Executive" },
]
const workplaceTypeOptions = [
  { value: "ON_SITE", title: "On-site" },
  { value: "HYBRID", title: "Hybrid" },
  { value: "REMOTE", title: "Remote" },
]

const initialValues: FormData = {
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
}

function validate(values: FormData) {
  const errors: Partial<FormData> = {}
  if (!values.title.trim()) errors.title = "Job title is required"
  if (!values.company.trim()) errors.company = "Company name is required"
  if (!values.location.trim()) errors.location = "Location is required"
  if (!values.type) errors.type = "Job type is required"
  if (!values.experience) errors.experience = "Experience level is required"
  if (!values.description.trim()) errors.description = "Job description is required"
  if (!values.applicationLink.trim()) errors.applicationLink = "Application link is required"
  else if (!/^https?:\/\/\S+$/.test(values.applicationLink)) errors.applicationLink = "Please enter a valid URL"
  if (!values.workplaceType) errors.workplaceType = "Work arrangement is required"
  return errors
}

export function CreateJobDrawer() {
  const isDrawerOpen = useDrawerStore((s) => s.isDrawerOpen)
  const setDrawerOpen = useDrawerStore((s) => s.setDrawerOpen)
  const isMobile = useIsMobile()

  const formik = useFormik<FormData>({
    initialValues,
    validate,
    onSubmit: async (values, { resetForm }) => {
      // Simulate API call

      console.log(values)
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // resetForm()
      // setDrawerOpen(false)
      // console.log("Job posted:", values)
    },
  })

  // Dynamic list handlers
  const handleListChange = (listName: keyof FormData, index: number, value: string) => {
    const list = [...(formik.values[listName] as string[])]
    list[index] = value
    formik.setFieldValue(listName, list)
  }

  const handleAddListItem = (listName: keyof FormData) => {
    formik.setFieldValue(listName, [...(formik.values[listName] as string[]), ""])
  }

  const handleRemoveListItem = (listName: keyof FormData, index: number) => {
    const list = [...(formik.values[listName] as string[])]
    list.splice(index, 1)
    formik.setFieldValue(listName, list)
  }

  const handleCancel = () => {
    if (!formik.isSubmitting) {
      formik.resetForm()
      setDrawerOpen(false)
    }
  }

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        style={{width: isMobile ? "100%" : undefined}}
        className={`
          ${isMobile ? "h-[95vh] w-full rounded-t-lg" : "w-full sm:max-w-4xl lg:max-w-6xl"}
          overflow-y-auto p-0 w-full
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sticky Header */}
          <div
            className={`
              flex items-center justify-between p-4 sm:p-6 border-b bg-white sticky top-0 z-10
              ${isMobile ? "flex-col space-y-3" : "flex-row"}
            `}
          >
            <div className={isMobile ? "text-center" : ""}>
              <SheetTitle className="text-lg sm:text-xl font-semibold">
                Post a New Job
              </SheetTitle>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the details for your job opening.
              </p>
            </div>
            <div className={`flex items-center space-x-2 ${isMobile ? "w-full" : ""}`}>
              <Button
                onClick={() =>
                  document
                    .getElementById("job-form")
                    ?.dispatchEvent(new Event("submit", { bubbles: true }))
                }
                disabled={formik.isSubmitting}
                size="sm"
                className={isMobile ? "flex-1" : ""}
              >
                {formik.isSubmitting ? "Posting..." : "Post Job"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className={isMobile ? "flex-1" : ""}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* Form Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <form id="job-form" onSubmit={formik.handleSubmit} className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g., Senior Software Engineer"
                      className={formik.touched.title && formik.errors.title ? "border-red-500" : ""}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-sm text-red-500">{formik.errors.title}</p>
                    )}
                  </div>
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formik.values.company}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g., Acme Corp."
                      className={formik.touched.company && formik.errors.company ? "border-red-500" : ""}
                    />
                    {formik.touched.company && formik.errors.company && (
                      <p className="text-sm text-red-500">{formik.errors.company}</p>
                    )}
                  </div>
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g., Remote, New York, NY"
                      className={formik.touched.location && formik.errors.location ? "border-red-500" : ""}
                    />
                    {formik.touched.location && formik.errors.location && (
                      <p className="text-sm text-red-500">{formik.errors.location}</p>
                    )}
                  </div>
                  {/* Job Type & Experience Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">
                        Job Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formik.values.type}
                        onValueChange={(value) => formik.setFieldValue("type", value)}
                      >
                        <SelectTrigger className={formik.touched.type && formik.errors.type ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formik.touched.type && formik.errors.type && (
                        <p className="text-sm text-red-500">{formik.errors.type}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">
                        Experience Level <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formik.values.experience}
                        onValueChange={(value) => formik.setFieldValue("experience", value)}
                      >
                        <SelectTrigger className={formik.touched.experience && formik.errors.experience ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevelOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formik.touched.experience && formik.errors.experience && (
                        <p className="text-sm text-red-500">{formik.errors.experience}</p>
                      )}
                    </div>
                  </div>
                  {/* Workplace Type */}
                  <div className="space-y-2">
                    <Label htmlFor="workplaceType">
                      Work Arrangement <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formik.values.workplaceType}
                      onValueChange={(value) => formik.setFieldValue("workplaceType", value)}
                    >
                      <SelectTrigger className={formik.touched.workplaceType && formik.errors.workplaceType ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select arrangement" />
                      </SelectTrigger>
                      <SelectContent>
                        {workplaceTypeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formik.touched.workplaceType && formik.errors.workplaceType && (
                      <p className="text-sm text-red-500">{formik.errors.workplaceType}</p>
                    )}
                  </div>
                  {/* Salary (Optional) */}
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range (Optional)</Label>
                    <Input
                      id="salary"
                      name="salary"
                      value={formik.values.salary}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g., $80,000 - $100,000"
                    />
                  </div>
                  {/* Application Deadline */}
                  <div className="space-y-2">
                    <Label htmlFor="applicationDeadline">Application Deadline</Label>
                    <Input
                      id="applicationDeadline"
                      name="applicationDeadline"
                      type="date"
                      value={formik.values.applicationDeadline}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  {/* Job Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Job Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Provide a detailed description of the job responsibilities and requirements."
                      className={`min-h-[150px] ${formik.touched.description && formik.errors.description ? "border-red-500" : ""}`}
                    />
                    {formik.touched.description && formik.errors.description && (
                      <p className="text-sm text-red-500">{formik.errors.description}</p>
                    )}
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
                      {(formik.values[field.name as keyof FormData] as string[]).map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={item}
                            onChange={(e) => handleListChange(field.name as keyof FormData, index, e.target.value)}
                            placeholder={`Enter ${field.label.toLowerCase().slice(0, -1)}`}
                          />
                          {(formik.values[field.name as keyof FormData] as string[]).length > 1 && (
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
                      name="applicationLink"
                      type="url"
                      value={formik.values.applicationLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g., https://yourcompany.com/careers/apply"
                      className={formik.touched.applicationLink && formik.errors.applicationLink ? "border-red-500" : ""}
                    />
                    {formik.touched.applicationLink && formik.errors.applicationLink && (
                      <p className="text-sm text-red-500">{formik.errors.applicationLink}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
