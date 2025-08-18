"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "distance", label: "Nearest First" },
]

interface SortAndLocationProps {
  sortBy: string
  location: string
  onSortChange: (sort: string) => void
  onLocationChange: (location: string) => void
}

export function SortAndLocation({ 
  sortBy, 
  location, 
  onSortChange, 
  onLocationChange 
}: SortAndLocationProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="sort" className="text-lg font-medium">Sort By</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location" className="text-lg font-medium">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Enter city, state, or zip code"
          className="mt-2"
        />
        <p className="text-sm text-gray-500 mt-1">
          Leave empty to search everywhere
        </p>
      </div>
    </div>
  )
}
