"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const LISTING_TYPES = [
  "For Sale",
  "For Rent", 
  "Exchange",
  "Free",
  "Wanted",
  "Service Offered",
  "Service Wanted",
]

interface ListingTypeFilterProps {
  selectedTypes: string[]
  onToggleType: (type: string) => void
}

export function ListingTypeFilter({ selectedTypes, onToggleType }: ListingTypeFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Listing Type</h3>
      <div className="grid grid-cols-1 gap-2">
        {LISTING_TYPES.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={type}
              checked={selectedTypes.includes(type)}
              onCheckedChange={() => onToggleType(type)}
            />
            <Label htmlFor={type} className="text-sm">
              {type}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
