"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Briefcase, Clock, MapPin, DollarSign, Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface JobFilterState {
  searchText: string
  jobTypes: string[]
  experienceLevels: string[]
  categories: string[]
  salaryRange: { min: number; max: number }
  locations: string[]
  features: string[]
  sortBy: "newest" | "salary" | "relevance" | "company"
  remote: boolean
}

interface JobFilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: JobFilterState
  onFiltersChange: (filters: JobFilterState) => void
  resultCount: number
}

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
]

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead/Principal" },
  { value: "executive", label: "Executive" },
]

const JOB_CATEGORIES = [
  { value: "software-dev", label: "Software Development" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "operations", label: "Operations" },
  { value: "data", label: "Data Science" },
  { value: "product", label: "Product Management" },
  { value: "customer-service", label: "Customer Service" },
]

const JOB_FEATURES = [
  { value: "remote", label: "Remote Work" },
  { value: "flexible-hours", label: "Flexible Hours" },
  { value: "health-insurance", label: "Health Insurance" },
  { value: "equity", label: "Equity/Stock Options" },
  { value: "visa-sponsorship", label: "Visa Sponsorship" },
  { value: "401k", label: "401(k) Matching" },
  { value: "unlimited-pto", label: "Unlimited PTO" },
  { value: "learning-budget", label: "Learning Budget" },
]

const POPULAR_LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "Chicago, IL",
  "Los Angeles, CA",
  "Denver, CO",
]

export function JobFilterModal({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  resultCount,
}: JobFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<JobFilterState>(filters)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    jobType: true,
    experience: true,
    category: true,
    salary: true,
    location: true,
    features: false,
  })

  const updateLocalFilters = (updates: Partial<JobFilterState>) => {
    setLocalFilters((prev) => ({ ...prev, ...updates }))
  }

  const toggleArrayFilter = (filterKey: keyof JobFilterState, value: string) => {
    const currentArray = localFilters[filterKey] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateLocalFilters({ [filterKey]: newArray })
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    onOpenChange(false)
  }

  const handleClear = () => {
    const clearedFilters: JobFilterState = {
      searchText: "",
      jobTypes: [],
      experienceLevels: [],
      categories: [],
      salaryRange: { min: 30000, max: 300000 },
      locations: [],
      features: [],
      sortBy: "newest",
      remote: false,
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full max-w-full sm:max-w-2xl sm:max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Job Filters</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Job Type */}
          <Collapsible open={expandedSections.jobType} onOpenChange={() => toggleSection("jobType")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Job Type
              </h3>
              {expandedSections.jobType ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {JOB_TYPES.map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={value}
                      checked={localFilters.jobTypes.includes(value)}
                      onCheckedChange={() => toggleArrayFilter("jobTypes", value)}
                    />
                    <label htmlFor={value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Experience Level */}
          <Collapsible open={expandedSections.experience} onOpenChange={() => toggleSection("experience")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Experience Level
              </h3>
              {expandedSections.experience ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-3">
                {EXPERIENCE_LEVELS.map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={value}
                      checked={localFilters.experienceLevels.includes(value)}
                      onCheckedChange={() => toggleArrayFilter("experienceLevels", value)}
                    />
                    <label htmlFor={value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Category */}
          <Collapsible open={expandedSections.category} onOpenChange={() => toggleSection("category")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Star className="w-4 h-4" />
                Category
              </h3>
              {expandedSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 gap-3">
                {JOB_CATEGORIES.map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={value}
                      checked={localFilters.categories.includes(value)}
                      onCheckedChange={() => toggleArrayFilter("categories", value)}
                    />
                    <label htmlFor={value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Salary Range */}
          <Collapsible open={expandedSections.salary} onOpenChange={() => toggleSection("salary")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Salary Range
              </h3>
              {expandedSections.salary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-4">
                <div className="px-2">
                  <Slider
                    value={[localFilters.salaryRange.min, localFilters.salaryRange.max]}
                    onValueChange={([min, max]) => updateLocalFilters({ salaryRange: { min, max } })}
                    max={300000}
                    min={30000}
                    step={5000}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${localFilters.salaryRange.min.toLocaleString()}</span>
                  <span>${localFilters.salaryRange.max.toLocaleString()}</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Location */}
          <Collapsible open={expandedSections.location} onOpenChange={() => toggleSection("location")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </h3>
              {expandedSections.location ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={localFilters.remote}
                    onCheckedChange={(checked) => updateLocalFilters({ remote: checked as boolean })}
                  />
                  <label htmlFor="remote" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remote Jobs Only
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {POPULAR_LOCATIONS.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={localFilters.locations.includes(location)}
                        onCheckedChange={() => toggleArrayFilter("locations", location)}
                      />
                      <label htmlFor={location} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Features & Benefits */}
          <Collapsible open={expandedSections.features} onOpenChange={() => toggleSection("features")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-lg font-medium">Features & Benefits</h3>
              {expandedSections.features ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 gap-3">
                {JOB_FEATURES.map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={value}
                      checked={localFilters.features.includes(value)}
                      onCheckedChange={() => toggleArrayFilter("features", value)}
                    />
                    <label htmlFor={value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Sort By */}
          <div>
            <h3 className="text-lg font-medium mb-4">Sort By</h3>
            <Select value={localFilters.sortBy} onValueChange={(value) => updateLocalFilters({ sortBy: value as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="company">Company Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t gap-2 sm:gap-0">
          <Button variant="ghost" onClick={handleClear} className="w-full sm:w-auto">
            Clear all
          </Button>
          <Button onClick={handleApply} className="min-w-[150px] w-full sm:w-auto">
            Show {resultCount} jobs
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export type { JobFilterState }
