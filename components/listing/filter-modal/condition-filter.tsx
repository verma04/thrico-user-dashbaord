"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const CONDITIONS = [
  "New",
  "Like New",
  "Used - Excellent",
  "Used - Good", 
  "Used - Fair",
  "Refurbished",
  "For Parts",
]

interface ConditionFilterProps {
  selectedConditions: string[]
  onToggleCondition: (condition: string) => void
}

export function ConditionFilter({ selectedConditions, onToggleCondition }: ConditionFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Condition</h3>
      <div className="grid grid-cols-1 gap-2">
        {CONDITIONS.map((condition) => (
          <div key={condition} className="flex items-center space-x-2">
            <Checkbox
              id={condition}
              checked={selectedConditions.includes(condition)}
              onCheckedChange={() => onToggleCondition(condition)}
            />
            <Label htmlFor={condition} className="text-sm">
              {condition}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
