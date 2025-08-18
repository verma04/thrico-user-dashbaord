"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { X } from 'lucide-react'
import { Formik, type FormikProps } from "formik"
import * as Yup from "yup"
import { v4 as uuidv4 } from "uuid"

import { TagInput } from "./tag-input"

// Skill categories for the select dropdown
const skillCategories = [
  { value: "technical", label: "Technical" },
  { value: "soft", label: "Soft" },
  { value: "management", label: "Management" },
  { value: "creative", label: "Creative" },
  { value: "other", label: "Other" },
]

// Define the Skill type
export interface Skill {
  id: string
  name: string
  category: string
  level: string
  tags: string[]
  yearsOfExperience?: number | null
  description?: string
  isOwner?: boolean
  canEdit?: boolean
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter skill name"),
  category: Yup.string().required("Please select a category"),
  level: Yup.string().required("Please select skill level"),
  tags: Yup.array().of(Yup.string()).min(1, "Please add at least one tag"),
  yearsOfExperience: Yup.number().min(0, "Years cannot be negative").max(50, "Years cannot exceed 50").nullable(),
  description: Yup.string().nullable(),
})

interface AddEditSkillFormProps {
  onClose: () => void
  onAdd?: (skill: Skill) => void
  onEdit?: (skill: Skill) => void
  editData?: Skill | null
  mode?: "add" | "edit"
}

export const AddEditSkillForm: React.FC<AddEditSkillFormProps> = ({
  onClose,
  onAdd,
  onEdit,
  editData = null,
  mode = "add",
}) => {
  const isEditMode = mode === "edit" && editData !== null

  const getInitialValues = () => {
    if (isEditMode && editData) {
      return {
        name: editData.name,
        category: editData.category,
        level: editData.level,
        tags: editData.tags,
        yearsOfExperience: editData.yearsOfExperience || 0,
        description: editData.description || "",
      }
    }
    return {
      name: "",
      category: "",
      level: "",
      tags: [] as string[],
      yearsOfExperience: 0,
      description: "",
    }
  }

  const handleSubmit = (values: any, { resetForm }: any) => {
    const skill: Skill = {
      id: isEditMode && editData ? editData.id : uuidv4(),
      name: values.name,
      category: values.category,
      level: values.level,
      tags: values.tags,
      yearsOfExperience: values.yearsOfExperience,
      description: values.description,
      // Preserve existing permissions if editing
      ...(isEditMode &&
        editData && {
          isOwner: editData.isOwner,
          canEdit: editData.canEdit,
        }),
    }
    if (isEditMode && onEdit) {
      onEdit(skill)
    } else if (!isEditMode && onAdd) {
      onAdd(skill)
    }
    resetForm()
    onClose()
  }

  const getTitle = () => {
    return isEditMode ? "Edit Skill" : "Add Skill"
  }

  const getSubmitButtonText = () => {
    return isEditMode ? "Update" : "Add"
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
            <CardTitle className="text-xl font-bold">{getTitle()}</CardTitle>
          </div>
          <Button
            type="submit"
            onClick={() => {
              // Formik's handleSubmit is called via the form's onSubmit
              // This button triggers the form submission
              if (document.getElementById("skill-form")) {
                ;(document.getElementById("skill-form") as HTMLFormElement).requestSubmit()
              }
            }}
            disabled={false} // Formik's isValid will control actual submission
          >
            {getSubmitButtonText()}
          </Button>
        </div>
        <Separator className="mt-4" />
      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-auto pr-4">
        <Formik initialValues={getInitialValues()} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
          {(formik: FormikProps<any>) => (
            <form id="skill-form" onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Skill Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Skill Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g., JavaScript, Project Management"
                  required
                  className={formik.touched.name && formik.errors.name ? "border-red-500" : ""}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              {/* Category */}
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formik.values.category}
                  onValueChange={(value) => {
                    formik.setFieldValue("category", value)
                    formik.setFieldValue("tags", []) // Clear tags when category changes
                  }}
                >
                  <SelectTrigger
                    id="category"
                    className={formik.touched.category && formik.errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-sm text-red-500">{formik.errors.category}</p>
                )}
              </div>

              {/* Skill Level */}
              <div className="grid gap-2">
                <Label htmlFor="level">Skill Level *</Label>
                <Select
                  value={formik.values.level}
                  onValueChange={(value) => formik.setFieldValue("level", value)}
                >
                  <SelectTrigger
                    id="level"
                    className={formik.touched.level && formik.errors.level ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.level && formik.errors.level && (
                  <p className="text-sm text-red-500">{formik.errors.level}</p>
                )}
              </div>

              {/* Tags */}
              <TagInput
                label="Tags *"
                tags={formik.values.tags}
                onChange={(tags) => formik.setFieldValue("tags", tags)}
                category={formik.values.category}
                placeholder="Add tags to describe this skill"
                error={formik.touched.tags && !!formik.errors.tags}
              />
              {formik.touched.tags && formik.errors.tags && (
                <p className="text-sm text-red-500">{formik.errors.tags}</p>
              )}

              {/* Years of Experience */}
              <div className="grid gap-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  value={formik.values.yearsOfExperience?.toString()}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="0"
                  className={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience ? "border-red-500" : ""}
                />
                {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                  <p className="text-sm text-red-500">{formik.errors.yearsOfExperience}</p>
                )}
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Describe your experience with this skill"
                  rows={4}
                />
              </div>

              {/* Form Tips */}
              <div className="rounded-lg bg-gray-50 p-4 mt-4">
                <p className="mb-2 font-semibold text-gray-700">
                  💡 Tips for {isEditMode ? "updating" : "adding"} skills:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Be specific about your skill level and experience</li>
                  <li>Add relevant tags to help categorize your skills</li>
                  <li>Include context in the description if helpful</li>
                </ul>
              </div>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}
