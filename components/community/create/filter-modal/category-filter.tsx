"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const CATEGORIES = [
  "Technology",
  "Design",
  "Business",
  "Photography",
  "Health",
  "Literature",
  "Music",
  "Gaming",
  "Travel",
  "Food",
]

interface CategoryFilterProps {
  selectedCategories: string[]
  onToggleCategory: (category: string) => void
}

export function CategoryFilter({ selectedCategories, onToggleCategory }: CategoryFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Categories</h3>
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onToggleCategory(category)}
            />
            <Label htmlFor={category} className="text-sm">
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
